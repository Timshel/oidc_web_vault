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
    npm ci
    npm audit fix || true
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
git apply ./scripts/oidc_override.patch

cd apps/web
npm run dist:oss:selfhost
printf '{"version": "oidc_override-%s"}' $TAG_CURRENT > build/vw-version.json
mv build web-vault
tar -czvf ../../"oidc_override_web_vault.tar.gz" web-vault --owner=0 --group=0
rm -rf web-vault
cd ../..
