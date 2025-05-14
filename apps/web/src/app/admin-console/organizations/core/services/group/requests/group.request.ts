import { SelectionReadOnlyRequest } from "@bitwarden/common/admin-console/models/request/selection-read-only.request";

export class GroupRequest {
  readonly name: string;
  readonly externalId?: string;
  readonly collections: SelectionReadOnlyRequest[];
  readonly users: string[];

  constructor(c: { name: string; collections?: SelectionReadOnlyRequest[]; users?: string[], externalId?: string }) {
    this.name = c.name;
    this.collections = c.collections ?? [];
    this.users = c.users ?? [];
    this.externalId = c.externalId;
  }
}
