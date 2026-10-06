/**
 * Formats integer paise for display: 30000 → "₹300", 30050 → "₹300.50",
 * 10000000 → "₹1,00,000" (Indian digit grouping).
 */
export function formatRupees(amountPaise: number): string {
  const hasPaise = amountPaise % 100 !== 0;
  const rupees = (amountPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `₹${rupees}`;
}
