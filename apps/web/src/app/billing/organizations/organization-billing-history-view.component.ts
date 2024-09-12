import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { concatMap, Subject, takeUntil } from "rxjs";

import { OrganizationBillingApiServiceAbstraction } from "@bitwarden/common/billing/abstractions/organizations/organization-billing-api.service.abstraction";
import {
  BillingInvoiceResponse,
  BillingTransactionResponse,
} from "@bitwarden/common/billing/models/response/billing.response";

@Component({
  templateUrl: "organization-billing-history-view.component.html",
})
export class OrgBillingHistoryViewComponent implements OnInit, OnDestroy {
  loading = false;
  firstLoaded = false;
  openInvoices: BillingInvoiceResponse[] = [];
  paidInvoices: BillingInvoiceResponse[] = [];
  transactions: BillingTransactionResponse[] = [];
  organizationId: string;
  hasAdditionalHistory: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private organizationBillingApiService: OrganizationBillingApiServiceAbstraction,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    this.route.params
      .pipe(
        concatMap(async (params) => {
          this.organizationId = params.organizationId;
          await this.load();
          this.firstLoaded = true;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async load() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.openInvoices = [];
    this.paidInvoices = [];
    this.transactions = [];
    this.hasAdditionalHistory = false;

    this.loading = false;
  }
}
