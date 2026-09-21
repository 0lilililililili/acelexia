// Hong Kong seasonal festival windows that gate the limited event worlds.
// Fixed-date festivals repeat every year; lunar / movable ones are listed per year.
import type { Lang } from "./i18n";

export type FestivalWindow = {
  worldId: string;
  name: Record<Lang, string>;
  // Inclusive [month, day] pairs. `year` pins a movable date to one year.
  ranges: Array<{ year?: number; from: [number, number]; to: [number, number] }>;
};

export const FESTIVALS: FestivalWindow[] = [
  {
    worldId: "festival",
    name: { en: "Lunar New Year", "zh-TW": "農曆新年", "zh-CN": "农历新年" },
    ranges: [
      { year: 2025, from: [1, 28], to: [2, 2] },
      { year: 2026, from: [2, 16], to: [2, 21] },
      { year: 2027, from: [2, 5], to: [2, 10] },
      { year: 2028, from: [1, 25], to: [1, 30] },
    ],
  },
  {
    worldId: "easter",
    name: { en: "Easter", "zh-TW": "復活節", "zh-CN": "复活节" },
    ranges: [
      { year: 2026, from: [4, 3], to: [4, 6] },
      { year: 2027, from: [3, 26], to: [3, 29] },
      { year: 2028, from: [4, 14], to: [4, 17] },
    ],
  },
  {
    worldId: "olympus",
    name: { en: "Summer Holiday", "zh-TW": "暑假特別活動", "zh-CN": "暑假特别活动" },
    ranges: [{ from: [7, 1], to: [8, 31] }],
  },
  {
    worldId: "midautumn",
    name: { en: "Mid-Autumn Festival", "zh-TW": "中秋節", "zh-CN": "中秋节" },
    ranges: [
      { year: 2026, from: [9, 23], to: [9, 27] },
      { year: 2027, from: [9, 13], to: [9, 17] },
      { year: 2028, from: [10, 1], to: [10, 5] },
    ],
  },
  {
    worldId: "halloween",
    name: { en: "Halloween", "zh-TW": "萬聖節", "zh-CN": "万圣节" },
    ranges: [{ from: [10, 25], to: [11, 1] }],
  },
  {
    worldId: "winter",
    name: { en: "Christmas", "zh-TW": "聖誕節", "zh-CN": "圣诞节" },
    ranges: [{ from: [12, 18], to: [1, 1] }],
  },
];

export const EVENT_WORLDS = FESTIVALS.map((f) => f.worldId);

function inRange(now: Date, from: [number, number], to: [number, number]) {
  const cur = (now.getMonth() + 1) * 100 + now.getDate();
  const a = from[0] * 100 + from[1];
  const b = to[0] * 100 + to[1];
  // Wrap-around windows (e.g. 18 Dec → 1 Jan)
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

export function festivalName(worldId: string, lang: Lang): string | null {
  return festivalFor(worldId)?.name[lang] ?? null;
}

export function nextOpening(worldId: string, now: Date = new Date()): Date | null {
  const f = festivalFor(worldId);
  if (!f) return null;
  const candidates: Date[] = [];
  for (const r of f.ranges) {
    if (r.year != null) {
      const start = new Date(r.year, r.from[0] - 1, r.from[1]);
      if (start >= now) candidates.push(start);
      continue;
    }
    for (const y of [now.getFullYear(), now.getFullYear() + 1]) {
      const start = new Date(y, r.from[0] - 1, r.from[1]);
      if (start >= now) candidates.push(start);
    }
  }
  candidates.sort((a, b) => a.getTime() - b.getTime());
  return candidates[0] ?? null;
}

/** Soonest upcoming event across every limited world. */
export function nextEventOpening(now: Date = new Date()): Date | null {
  const all = EVENT_WORLDS.map((id) => nextOpening(id, now)).filter(Boolean) as Date[];
  all.sort((a, b) => a.getTime() - b.getTime());
  return all[0] ?? null;
}
