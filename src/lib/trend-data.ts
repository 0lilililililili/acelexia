import type { DailyStat } from "./store";
export const SUBJECT_COLORS: Record<string, string> = { chi: "var(--color-chart-1)", eng: "var(--color-chart-3)", math: "var(--color-chart-2)" };
export function trendRows(daily: Record<string, DailyStat>, subject?: string) {
  const rows: Record<string, Record<string, string | number>> = {};
  const entities = new Set<string>();
  for (const [key, stat] of Object.entries(daily)) {
    const [s, day, topic] = key.split("|");
    if (!day || !stat.t) continue;
    if (subject ? s !== subject || !topic : !!topic) continue;
    const entity = subject ? decodeURIComponent(topic) : s;
    entities.add(entity);
    const row = rows[day] ??= { day };
    row[`${entity}:accuracy`] = Math.round(stat.c / stat.t * 1000) / 10;
    row[`${entity}:latency`] = Math.round(stat.ms / stat.t / 100) / 10;
  }
  return { rows: Object.keys(rows).sort().map(day => rows[day]), entities: [...entities].sort() };
}