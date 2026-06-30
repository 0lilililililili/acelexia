// HK official festival windows that gate limited-event worlds on the map.
// Dates follow the Hong Kong public-holiday calendar (Gregorian dates given
// for lunar festivals from the HK Government Gazette).

export type FestivalWindow = {
  worldId: string;
  name: string;
  // Inclusive [start, end] month/day pairs. Year is matched against `year`
  // when given (for lunar dates that shift each year); otherwise any year.
  ranges: Array<{ year?: number; from: [number, number]; to: [number, number] }>;
};

// Lunar/variable dates are listed per year from the HK gov calendar.
// Add new years as they're published.
export const FESTIVALS: FestivalWindow[] = [
  {
    worldId: "winter",
    name: "Santa's Workshop (Christmas)",
    // Christmas season: 20 Dec – 28 Dec every year
    ranges: [{ from: [12, 20], to: [12, 28] }],
  },
  {
    worldId: "festival",
    name: "Lunar Festival (Chinese New Year)",
    // HK Gazetted CNY windows (eve + 3 days, padded a little)
    ranges: [
      { year: 2025, from: [1, 28], to: [2, 2] },
      { year: 2026, from: [2, 16], to: [2, 21] },
      { year: 2027, from: [2, 5],  to: [2, 10] },
    ],
  },
  {
    worldId: "olympus",
    name: "Mount Olympus (Summer Games)",
    // Hidden summer quest: 1 Jul – 31 Aug
    ranges: [{ from: [7, 1], to: [8, 31] }],
  },
];

function inRange(now: Date, from: [number, number], to: [number, number]) {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const cur = m * 100 + d;
  const a = from[0] * 100 + from[1];
  const b = to[0] * 100 + to[1];
  // Handle wrap-around (e.g. Dec → Jan) just in case
  return a <= b ? cur >= a && cur <= b : cur >= a || cur <= b;
}

export function isFestivalOpen(worldId: string, now: Date = new Date()): boolean {
  const f = FESTIVALS.find((x) => x.worldId === worldId);
  if (!f) return true; // non-limited world: always open
  const year = now.getFullYear();
  return f.ranges.some((r) => {
    if (r.year != null && r.year !== year) return false;
    return inRange(now, r.from, r.to);
  });
}

export function festivalFor(worldId: string): FestivalWindow | undefined {
  return FESTIVALS.find((x) => x.worldId === worldId);
}

export function nextOpening(worldId: string, now: Date = new Date()): Date | null {
  const f = festivalFor(worldId);
  if (!f) return null;
  const candidates: Date[] = [];
  for (const r of f.ranges) {
    const year = r.year ?? now.getFullYear();
    const start = new Date(year, r.from[0] - 1, r.from[1]);
    if (start >= now) candidates.push(start);
    if (r.year == null) {
      const nextYear = new Date(year + 1, r.from[0] - 1, r.from[1]);
      if (nextYear >= now) candidates.push(nextYear);
    }
  }
  candidates.sort((a, b) => a.getTime() - b.getTime());
  return candidates[0] ?? null;
}
