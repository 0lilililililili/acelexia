/** Whole-star thresholds: no reward below 50%, then 1/2/3 at 50/70/90%. */
export function arcadeStars(correct: number, total: number): number {
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) return 0;
  const accuracy = Math.max(0, Math.min(correct, total)) / total;
  return accuracy >= 0.9 ? 3 : accuracy >= 0.7 ? 2 : accuracy >= 0.5 ? 1 : 0;
}