# Web Vault OIDC builds for OIDCWarden

**This project is not associated with the [Bitwarden](https://bitwarden.com/) project nor Bitwarden, Inc.**

---

#### :warning: Branch will be rebased and forced-pushed when updated. :warning:

This is a repository to build custom versions of the [Bitwarden web vault](https://github.com/bitwarden/clients/tree/master/apps/web) patched to work with [Timshel/OIDCWarden](https://github.com/Timshel/OIDCWarden).
This integrates modifications from [vaultwarden/vw_web_builds](https://github.com/vaultwarden/vw_web_builds).

Since `v2025.9.1-1` the clients build should be compatible with [Vaultwarden](https://github.com/dani-garcia/vaultwarden).

This generate two different versions :

- `button` default version with no change to the login flow [vw_web_builds](https://github.com/vaultwarden/vw_web_builds))
- `override` add additionally :
  - set `#sso` as the default redirect url
  - Fix remember device when using 2FA (this won't work when using multiple account in the same session).
  - remove some unnecessary logic ([patch](oidc_override.patch))

## `override` client limitations

### Remember device 2FA

The feature will not work when using multiple accounts on the same device.
/
When activating remember device a token is generated server side, associated with the device and user and sent to the client.
On the client side this token is stored but only associated with the device since when used the user is not yet known.
/
This means that when logging in with a second user the stored token will be overriden and the remember device only work with this new session.

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
