import { TAX_CONFIG } from "../../config/tax.js";

export function resolveTaxAuthority(kyc) {
  const authority = TAX_CONFIG.taxAuthorities[kyc.taxResidency];

  if (!authority) {
    throw new Error("No tax authority found for residency");
  }

  return authority;
}
