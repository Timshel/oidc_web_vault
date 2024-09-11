export class ServerSettings {
  disableUserRegistration: boolean;
  suppressOnboardingInterstitials: boolean;
  disableEmailVerification: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;
  ssoOrgExternalId: boolean;
  ssoOrgGroupExternalId: boolean;

  constructor(data?: Partial<ServerSettings>) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.suppressOnboardingInterstitials = data?.suppressOnboardingInterstitials ?? true;
    this.disableEmailVerification = data?.disableEmailVerification ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? true;
    this.ssoOnly = data?.ssoOnly ?? false;
    this.ssoOrgExternalId = data?.ssoOrgExternalId ?? false;
    this.ssoOrgGroupExternalId = data?.ssoOrgGroupExternalId ?? false;
  }
}
