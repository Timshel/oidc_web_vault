# Web Vault OIDC builds for OIDCWarden

**This project is not associated with the [Bitwarden](https://bitwarden.com/) project nor Bitwarden, Inc.**

---

#### :warning: Branch will be rebased and forced-pushed when updated. :warning:

#### :warning: web-vault builds for [timshel/OIDCWarden](https://github.com/timshel/OIDCWarden). For [timshel/vaultwarden](https://github.com/Timshel/OIDCWarden) go to [oidc_web_builds](https://github.com/Timshel/oidc_web_builds)

This is a repository to build custom versions of the [Bitwarden web vault](https://github.com/bitwarden/clients/tree/master/apps/web) patched to work with [Timshel/OIDCWarden](https://github.com/Timshel/OIDCWarden).
This integrates modifications from [vaultwarden/vw_web_builds](https://github.com/vaultwarden/vw_web_builds).

This generate two different versions :

- `button` default version with no change to the login flow [vw_web_builds](https://github.com/vaultwarden/vw_web_builds))
- `override` add additionally :
  - set `#sso` as the default redirect url
  - remove some unnecessary logic ([patch](oidc_override.patch))

## Building the web-vault

To build the web-vault you need node `20` cf [.nvmrc](.nvmrc) and npm installed.

### Using node and npm

For a quick and easy local build you can run:

```bash
./scripts/build_webvault.sh
```

This will :

- Build the web vault application
- Package it as `oidc_button_web_vault.tar.gz`.
- Apply the override [patch](patches/oidc_override.patch) to improve SSO flow
- Build the web vault application
- Package it as `oidc_override_web_vault.tar.gz`.
