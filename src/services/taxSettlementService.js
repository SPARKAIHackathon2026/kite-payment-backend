import { getUserKYC } from "../domain/kyc/kycRepo.js";
import { getTransactions } from "../domain/transaction/transactionRepo.js";
import { calculateTax } from "../domain/tax/taxCalculator.js";
import { resolveTaxAuthority } from "../domain/tax/taxResolver.js";
import { checkPaymentPermission } from "../agent/permission.js";
import { sendPayment } from "../agent/paymentAA.js";

export async function settleTax(agent, userAddress) {
  const kyc = getUserKYC(userAddress);
  const transactions = getTransactions(userAddress);

  const authority = resolveTaxAuthority(kyc);
  const taxAmount = calculateTax(transactions, authority.taxRate);

  checkPaymentPermission({
    amount: taxAmount,
    to: authority.address
  });

  const txHash = await sendPayment(agent, {
    to: authority.address,
    amount: taxAmount
  });

  return {
    taxAmount,
    authority: authority.address,
    txHash
  };
}
