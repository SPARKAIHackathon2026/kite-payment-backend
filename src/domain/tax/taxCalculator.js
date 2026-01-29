export function calculateTax(transactions, taxRate) {
  const taxableProfit = transactions
    .filter(tx => tx.profit > 0)
    .reduce((sum, tx) => sum + tx.profit, 0);

  return taxableProfit * taxRate;
}
