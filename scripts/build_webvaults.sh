# !/bin/bash

set -x
set -e

NO_SETUP=false
if [[ "$@" == *"--only-build"* ]] ; then
  NO_SETUP=true
fi

ONLY_OVERRIDE=false
if [[ "$@" == *"--only-override"* ]] ; then
  ONLY_OVERRIDE=true
fi

rm -f oidc_button_web_vault.tar.gz oidc_override_web_vault.tar.gz

# Prepare build
if [ "$NO_SETUP" = false ] ; then
    npm ci --ignore-scripts --allow-git=none --allow-remote=none
    npm audit fix --ignore-scripts --allow-git=none --allow-remote=none || true
fi

### Build button version ###
if [ "$ONLY_OVERRIDE" = false ] ; then
    cd apps/web
    npm run dist:oss:selfhost
    printf '{"version": "oidc_button-%s"}' $TAG_CURRENT > build/vw-version.json
    mv build web-vault
    tar -czvf ../../"oidc_button_web_vault.tar.gz" web-vault --owner=0 --group=0
    rm -rf web-vault
    cd ../..
fi

### Build Override version ###
git apply ./patches/oidc_override.patch

cd apps/web
npm run dist:oss:selfhost
printf '{"version": "oidc_override-%s"}' $TAG_CURRENT > build/vw-version.json
mv build web-vault
tar -czvf ../../"oidc_override_web_vault.tar.gz" web-vault --owner=0 --group=0
rm -rf web-vault
cd ../..

### Build Firefox extension ###
cd apps/browser
npm run dist:firefox
mv dist/dist-firefox.zip ../../oidc_firefox_amo.xpi

contents="$(jq '.short_name = "OIDCWarden"
  | .browser_specific_settings.gecko.id = "{130bfcb0-ded6-4af8-a39b-d07d411396b9}"
  | .browser_specific_settings.gecko.update_url = "https://github.com/Timshel/oidc_web_vault/releases/latest/download/firefox_update_manifest_unsigned.json"
  ' build/manifest.json \
)" && echo -E "${contents}" > build/manifest.json
./scripts/compress.sh ../../../oidc_firefox.xpi

cat <<EOF > ../../firefox_update_manifest_unsigned.json
{
  "addons": {
    "{130bfcb0-ded6-4af8-a39b-d07d411396b9}": {
      "updates": [
        {
          "version": "$(echo $TAG_CURRENT | tr -d 'v')",
          "update_link": "https://github.com/Timshel/oidc_web_vault/releases/download/$TAG_CURRENT/oidc_firefox.xpi",
          "update_hash": "sha256:$(sha256sum ../../oidc_firefox.xpi | awk '{ print $1 }')"
        }
      ]
    }
  }
}
EOF

contents="$(jq '.browser_specific_settings.gecko.update_url = "https://github.com/Timshel/oidc_web_vault/releases/latest/download/firefox_update_manifest_signed.json"' build/manifest.json)" && echo -E "${contents}" > build/manifest.json
./scripts/compress.sh ../../../oidc_firefox_tosign.xpi

cat <<EOF > ../../firefox_update_manifest_signed.json
{
  "addons": {
    "{130bfcb0-ded6-4af8-a39b-d07d411396b9}": {
      "updates": [
        {
          "version": "$(echo $TAG_CURRENT | tr -d 'v')",
          "update_link": "https://github.com/Timshel/oidc_web_vault/releases/download/$TAG_CURRENT/oidc_firefox_signed.xpi"
        }
      ]
    }
  }
}
EOF

cd ../..

### Build Chrome extension ###
cd apps/browser
npm run dist:chrome
mv dist/dist-chrome.zip ../../oidc_chrome.zip
cd ../..
