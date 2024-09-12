import { ReplaySubject } from "rxjs";

import { AccountService } from "@bitwarden/common/auth/abstractions/account.service";
import {
  Environment,
  Region,
  RegionConfig,
  Urls,
} from "@bitwarden/common/platform/abstractions/environment.service";
import { Utils } from "@bitwarden/common/platform/misc/utils";
import {
  CloudEnvironment,
  DefaultEnvironmentService,
  SelfHostedEnvironment,
} from "@bitwarden/common/platform/services/default-environment.service";
import { StateProvider } from "@bitwarden/common/platform/state";

/**
 * Web specific environment service. Ensures that the urls are set from the window location.
 */
export class WebEnvironmentService extends DefaultEnvironmentService {
  constructor(
    private win: Window,
    stateProvider: StateProvider,
    accountService: AccountService,
  ) {
    super(stateProvider, accountService);

    // The web vault always uses the current location as the base url
    // If the base URL is `https://vault.example.com/base/path/`,
    // `window.location.href` should have one of the following forms:
    //
    // - `https://vault.example.com/base/path/`
    // - `https://vault.example.com/base/path/#/some/route[?queryParam=...]`
    // - `https://vault.example.com/base/path/?queryParam=...`
    //
    // We want to get to just `https://vault.example.com/base/path`.
    let baseUrl = this.win.location.href;
    baseUrl = baseUrl.replace(/(\/+|\/*#.*|\/*\?.*)$/, ""); // Strip off trailing `/`, `#`, `?` and everything after.
    const urls = { base: baseUrl };

    // Find the region
    const domain = Utils.getDomain(this.win.location.href);
    const region = this.availableRegions().find((r) => Utils.getDomain(r.urls.webVault) === domain);

    let environment: Environment;
    if (region) {
      environment = new WebCloudEnvironment(region, urls);
    } else {
      environment = new SelfHostedEnvironment(urls);
    }

    // Override the environment observable with a replay subject
    const subject = new ReplaySubject<Environment>(1);
    subject.next(environment);
    this.environment$ = subject.asObservable();
  }

  // Web cannot set environment
  async setEnvironment(region: Region, urls?: Urls): Promise<Urls> {
    return;
  }
}

class WebCloudEnvironment extends CloudEnvironment {
  constructor(config: RegionConfig, urls: Urls) {
    super(config);
    // We override the urls to avoid CORS issues
    this.urls = urls;
  }
}
