export class ServerSettings {
  disableUserRegistration: boolean;
  suppressOnboardingInterstitials: boolean;
  disableEmailVerification: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;

  constructor(data?: Partial<ServerSettings>) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.suppressOnboardingInterstitials = data?.suppressOnboardingInterstitials ?? false;
    this.disableEmailVerification = data?.disableEmailVerification ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? true;
    this.ssoOnly = data?.ssoOnly ?? false;
  }
}
