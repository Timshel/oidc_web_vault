import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, inject } from "@angular/core";
import { RouterLinkActive, RouterLink } from "@angular/router";

import { BitSvg } from "@bitwarden/assets/svg";

import { SideNavService } from "./side-nav.service";

@Component({
  selector: "bit-nav-logo",
  templateUrl: "./nav-logo.component.html",
  imports: [CommonModule, RouterLinkActive, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLogoComponent {
  protected readonly sideNavService = inject(SideNavService);

  /** Icon that is displayed when the side nav is closed */
  readonly closedIcon = input.required<string>();

  /**
   * Icon that is displayed when the side nav is open
   */
  readonly openIcon = input.required<BitSvg>();

  /**
   * Route to be passed to internal `routerLink`
   */
  readonly route = input.required<string | any[]>();

  /**
   * Passed to `attr.aria-label` and `attr.title`
   */
  readonly label = input.required<string>();
}
