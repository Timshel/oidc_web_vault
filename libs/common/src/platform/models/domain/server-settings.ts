export class ServerSettings {
  disableUserRegistration: boolean;
  suppressOnboardingInterstitials: boolean;
  disableEmailVerification: boolean;
  disableOpenInviteLinkEmailVerification: boolean;
  ssoEnabled: boolean;
  ssoOnly: boolean;

  constructor(data?: Partial<ServerSettings>) {
    this.disableUserRegistration = data?.disableUserRegistration ?? false;
    this.suppressOnboardingInterstitials = data?.suppressOnboardingInterstitials ?? false;
    this.disableEmailVerification = data?.disableEmailVerification ?? false;
    this.disableOpenInviteLinkEmailVerification =
      data?.disableOpenInviteLinkEmailVerification ?? false;
    this.ssoEnabled = data?.ssoEnabled ?? true;
    this.ssoOnly = data?.ssoOnly ?? false;
  }
}
