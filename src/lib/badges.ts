// Badge definitions, daily streak and daily practice logic.
import { ITEMS } from "./avatar";
import { playerLv } from "./leveling";
import { getState, setState, type DailyTask, type State } from "./store";

export type BadgeTab = "chi" | "eng" | "math" | "others";
export type Badge = { id: string; tab: BadgeTab; icon: "flame" | "tower" | "crown" | "calendar" | "star" | "sword" | "hat" | "shirt"; goal: { en: string; zh: string }; check: (s: State) => boolean };

const SUBJ = ["chi", "eng", "math"] as const;
const RUNS = [5, 10, 20];
const TOWER_LV = [10, 30, 50, 80, 100, 200, 500];
const LVS = [10, 20, 50, 100];
const STREAKS: { d: number; en: string; zh: string }[] = [
  { d: 7, en: "1 week", zh: "1星期" }, { d: 14, en: "2 weeks", zh: "2星期" },
  { d: 30, en: "1 month", zh: "1個月" }, { d: 60, en: "2 months", zh: "2個月" }, { d: 90, en: "3 months", zh: "3個月" },
  { d: 100, en: "100 days", zh: "100日" }, { d: 120, en: "4 months", zh: "4個月" }, { d: 150, en: "5 months", zh: "5個月" },
  { d: 180, en: "6 months", zh: "6個月" }, { d: 200, en: "200 days", zh: "200日" }, { d: 300, en: "300 days", zh: "300日" },
  { d: 365, en: "1 year", zh: "1年" },
];

function maxTower(s: State, subject: string) {
  let m = 0;
  for (const [k, v] of Object.entries(s.towers)) if (k.endsWith(`:${subject}`)) m = Math.max(m, v);
  return m;
}
const ownsAll = (s: State, slot: string) => ITEMS.filter((i) => i.slot === slot).every((i) => s.avatar.owned.includes(i.id));

export const BADGES: Badge[] = [
  ...SUBJ.flatMap((sub) => [
    ...RUNS.map((n): Badge => ({
      id: `${sub}.run${n}`, tab: sub, icon: "flame",
      goal: { en: `${n} right in a row`, zh: `連續答對${n}題` },
      check: (s) => (s.badges.bestRun[sub] ?? 0) >= n,
    })),
    ...TOWER_LV.map((n): Badge => ({
      id: `${sub}.tower${n}`, tab: sub, icon: "tower",
      goal: { en: `Clear tower LV ${n}`, zh: `通過塔 LV ${n}` },
      check: (s) => maxTower(s, sub) >= n,
    })),
  ]),
  ...LVS.map((n): Badge => ({ id: `lv${n}`, tab: "others", icon: "crown", goal: { en: `Reach LV ${n}`, zh: `達到 LV ${n}` }, check: (s) => playerLv(s.wallet.exp) >= n })),
  ...STREAKS.map((x): Badge => ({ id: `streak${x.d}`, tab: "others", icon: "calendar", goal: { en: `${x.en} daily streak`, zh: `連續登入${x.zh}` }, check: (s) => s.streak.best >= x.d })),
  { id: "hoard50", tab: "others", icon: "star", goal: { en: "Save 50 stars of one colour", zh: "同一顏色星星儲滿50粒" }, check: (s) => Object.values(s.wallet.stars).some((n) => n >= 50) },
  { id: "allweapons", tab: "others", icon: "sword", goal: { en: "Collect every weapon", zh: "收集所有武器" }, check: (s) => ownsAll(s, "weapon") },
  { id: "allhats", tab: "others", icon: "hat", goal: { en: "Collect every hat", zh: "收集所有帽子" }, check: (s) => ownsAll(s, "hat") },
  {
    id: "outfit", tab: "others", icon: "shirt", goal: { en: "Wear a full bought outfit", zh: "穿上全套購買服裝" },
    check: (s) => ["shirt", "bottom", "shoes", "hat", "belt"].every((slot) => s.avatar.owned.includes(s.avatar.equipped[slot] ?? "")),
  },
];

export const STREAK_MILESTONES = STREAKS.map((x) => x.d);

/** Unlocks any badge whose goal is now met. Returns newly unlocked ids. */
export function evaluateBadges(): string[] {
  const s = getState();
  const fresh = BADGES.filter((b) => !s.badges.unlocked.includes(b.id) && b.check(s)).map((b) => b.id);
  if (fresh.length) setState({ ...s, badges: { ...s.badges, unlocked: [...s.badges.unlocked, ...fresh] } });
  return fresh;
}

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const LANDS = ["aquatic", "forest", "fire"];

/** Called when the map opens. Returns true on the first visit of a new day. */
export function tickStreak(): boolean {
  const s = getState();
  const today = dayKey();
  if (s.streak.lastDay === today) return false;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const current = s.streak.lastDay === dayKey(y) ? s.streak.current + 1 : 1;
  const daily: DailyTask[] = SUBJ.map((subject) => ({ subject, world: LANDS[Math.floor(Math.random() * LANDS.length)], done: false }));
  setState({ ...s, streak: { current, best: Math.max(s.streak.best, current), lastDay: today, dailyDate: today, daily } });
  evaluateBadges();
  return true;
}

export function daysToNextStreakBadge(best: number, current: number) {
  void best;
  const next = STREAK_MILESTONES.find((d) => d > current);
  return next ? next - current : 0;
}

export function markDailyDone(subject: string, world: string) {
  const s = getState();
  if (s.streak.dailyDate !== dayKey()) return;
  const daily = s.streak.daily.map((d) => (d.subject === subject && d.world === world ? { ...d, done: true } : d));
  setState({ ...s, streak: { ...s.streak, daily } });
}
