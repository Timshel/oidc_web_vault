export class ServerSettings {
  disableUserRegistration: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;

  constructor(data?: ServerSettings) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? true;
    this.ssoOnly = data?.ssoOnly ?? false;
  }
}
