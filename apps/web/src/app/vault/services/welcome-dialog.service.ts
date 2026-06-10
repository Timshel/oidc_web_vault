import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class WelcomeDialogService {
  /**
   * Conditionally shows the welcome dialog to new users.
   *
   * @returns true if the dialog was shown, false otherwise
   */
  async conditionallyShowWelcomeDialog() {
    return;
  }
}
