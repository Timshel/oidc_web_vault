import { Unassigned } from "@bitwarden/admin-console/common";
import { CipherType } from "@bitwarden/common/vault/enums";
import { CipherView } from "@bitwarden/common/vault/models/view/cipher.view";
import { RestrictedCipherType } from "@bitwarden/vault";

import { All, RoutedVaultFilterModel } from "./routed-vault-filter.model";

export type FilterFunction = (cipher: CipherView) => boolean;

export function createFilterFunction(
  filter: RoutedVaultFilterModel,
  restrictedTypes?: RestrictedCipherType[],
): FilterFunction {
  return (cipher) => {
    if (filter.type === "favorites" && !cipher.favorite) {
      return false;
    }
    if (filter.type === "card" && cipher.type !== CipherType.Card) {
      return false;
    }
    if (filter.type === "identity" && cipher.type !== CipherType.Identity) {
      return false;
    }
    if (filter.type === "login" && cipher.type !== CipherType.Login) {
      return false;
    }
    if (filter.type === "note" && cipher.type !== CipherType.SecureNote) {
      return false;
    }
    if (filter.type === "sshKey" && cipher.type !== CipherType.SshKey) {
      return false;
    }
    if (filter.type === "trash" && !cipher.isDeleted) {
      return false;
    }
    // Hide trash unless explicitly selected
    if (filter.type !== "trash" && cipher.isDeleted) {
      return false;
    }
    // No folder
    if (filter.folderId === Unassigned && cipher.folderId !== null) {
      return false;
    }
    // Folder
    if (
      filter.folderId !== undefined &&
      filter.folderId !== All &&
      filter.folderId !== Unassigned &&
      cipher.folderId !== filter.folderId
    ) {
      return false;
    }
    // All collections (top level)
    if (filter.collectionId === All) {
      return false;
    }
    // Unassigned
    if (
      filter.collectionId === Unassigned &&
      (cipher.organizationId == null ||
        (cipher.collectionIds != null && cipher.collectionIds.length > 0))
    ) {
      return false;
    }
    // Collection
    if (
      filter.collectionId !== undefined &&
      filter.collectionId !== All &&
      filter.collectionId !== Unassigned &&
      (cipher.collectionIds == null || !cipher.collectionIds.includes(filter.collectionId))
    ) {
      return false;
    }
    // My Vault
    if (filter.organizationId === Unassigned && cipher.organizationId != null) {
      return false;
    }
    // Organization
    else if (
      filter.organizationId !== undefined &&
      filter.organizationId !== Unassigned &&
      cipher.organizationId !== filter.organizationId
    ) {
      return false;
    }

    // Restricted types
    if (restrictedTypes && restrictedTypes.length > 0) {
      // Filter the cipher if that type is restricted unless
      // - The cipher belongs to an organization and that organization allows viewing the cipher type
      // OR
      // - The cipher belongs to the user's personal vault and at least one other organization does not restrict that type
      if (
        restrictedTypes.some(
          (restrictedType) =>
            restrictedType.cipherType === cipher.type &&
            (cipher.organizationId
              ? !restrictedType.allowViewOrgIds.includes(cipher.organizationId)
              : restrictedType.allowViewOrgIds.length === 0),
        )
      ) {
        return false;
      }
    }
    return true;
  };
}
