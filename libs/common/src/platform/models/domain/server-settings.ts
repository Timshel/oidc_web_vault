export class ServerSettings {
  disableUserRegistration: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;
  ssoOrgExternalId: boolean;
  ssoOrgGroupExternalId: boolean;

  constructor(data?: ServerSettings) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? false;
    this.ssoOnly = data?.ssoOnly ?? false;
    this.ssoOrgExternalId = data?.ssoOrgExternalId ?? false;
    this.ssoOrgGroupExternalId = data?.ssoOrgGroupExternalId ?? false;
  }
}
