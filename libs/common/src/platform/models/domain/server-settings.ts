export class ServerSettings {
  disableUserRegistration: boolean;
  suppressOnboardingInterstitials: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;

  constructor(data?: Partial<ServerSettings>) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.suppressOnboardingInterstitials = data?.suppressOnboardingInterstitials ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? true;
    this.ssoOnly = data?.ssoOnly ?? false;
  }
}
