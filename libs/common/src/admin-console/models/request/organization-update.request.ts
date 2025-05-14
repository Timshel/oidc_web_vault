import { OrganizationKeysRequest } from "./organization-keys.request";

export interface OrganizationUpdateRequest {
  name?: string;
  billingEmail?: string;
  externalId?: string;
  keys?: OrganizationKeysRequest;
}
