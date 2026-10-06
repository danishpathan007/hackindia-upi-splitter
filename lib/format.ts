/**
 * Formats integer paise for display: 30000 → "₹300", 30050 → "₹300.50",
 * 10000000 → "₹1,00,000" (Indian digit grouping), -5050 → "-₹50.50".
 */
export function formatRupees(amountPaise: number): string {
  const sign = amountPaise < 0 ? "-" : "";
  const absolutePaise = Math.abs(amountPaise);
  const hasPaise = absolutePaise % 100 !== 0;
  const rupees = (absolutePaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `${sign}₹${rupees}`;
}
