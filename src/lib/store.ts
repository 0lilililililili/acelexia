// Central client-side store: session, tower progress, revision bank, wallet and settings.
// Mirrors everything into the cloud PROGRESS database whenever a user is logged in.
import type { RevisionItem } from "./auth.functions";
import type { StarColor } from "./leveling";

export type Settings = {
  fontScale: number; // 1 = normal
  timeLimit: number; // seconds per question
  language: "zh-TW" | "zh-CN" | "en";
  lastFeedbackAt?: number;
  feedbackRating?: number;
  feedbackComment?: string;
  tutorialDone?: boolean;
};

export type Session = { userId: string; username: string; isAdmin: boolean; token?: string };

export type ItemKey = "glassA" | "glassB" | "glassC" | "potionA" | "potionB" | "torch";

export type Wallet = {
  stars: Record<StarColor, number>;
  items: Record<ItemKey, number>;
  exp: number;
};

export const emptyWallet = (): Wallet => ({
  stars: { red: 0, blue: 0, green: 0, yellow: 0 },
  items: { glassA: 0, glassB: 0, glassC: 0, potionA: 0, potionB: 0, torch: 0 },
  exp: 0,
});

export function normalizeWallet(w?: Partial<Wallet> | null): Wallet {
  const base = emptyWallet();
  return {
    stars: { ...base.stars, ...(w?.stars ?? {}) },
    items: { ...base.items, ...(w?.items ?? {}) },
    exp: Number(w?.exp ?? 0) || 0,
  };
}

export type SubjectStat = { correct: number; total: number };

export type State = {
  grade: string | null;
  onboarded: boolean;
  towers: Record<string, number>; // "grade:world:subject" -> highest cleared level
  stars: Record<string, number>; // "grade:world:subject:level" -> stars earned (1-3)
  revision: Record<string, Record<string, RevisionItem[]>>; // subject -> topic -> items
  stats: Record<string, SubjectStat>; // subject -> answered/correct tally
  wallet: Wallet;
  settings: Settings;
  avatar: AvatarState;
  streak: StreakState;
  badges: BadgeState;
  /** "subject|YYYY-MM-DD" -> daily answer tally with total answer time (ms). */
  daily: Record<string, DailyStat>;
};
export type DailyStat = { c: number; t: number; ms: number };

export type Gender = "boy" | "girl";
export type AvatarState = { gender: Gender; equipped: Record<string, string>; owned: string[] };
export type DailyTask = { subject: string; world: string; done: boolean };
export type StreakState = { current: number; best: number; lastDay: string; dailyDate: string; daily: DailyTask[]; lotteryDay?: string };
export type BadgeState = { unlocked: string[]; run: Record<string, number>; bestRun: Record<string, number> };

export const emptyAvatar = (gender: Gender = "boy"): AvatarState => ({ gender, equipped: {}, owned: [] });
export const emptyStreak = (): StreakState => ({ current: 0, best: 0, lastDay: "", dailyDate: "", daily: [] });
export const emptyBadges = (): BadgeState => ({ unlocked: [], run: {}, bestRun: {} });
export function normalizeAvatar(a?: Partial<AvatarState> | null): AvatarState {
  return { gender: a?.gender === "girl" ? "girl" : "boy", equipped: { ...(a?.equipped ?? {}) }, owned: [...(a?.owned ?? [])] };
}
export function normalizeStreak(a?: Partial<StreakState> | null): StreakState {
  return { ...emptyStreak(), ...(a ?? {}), daily: Array.isArray(a?.daily) ? a!.daily : [] };
}
export function normalizeBadges(a?: Partial<BadgeState> | null): BadgeState {
  return { unlocked: [...(a?.unlocked ?? [])], run: { ...(a?.run ?? {}) }, bestRun: { ...(a?.bestRun ?? {}) } };
}

export const DEFAULT_SETTINGS: Settings = { fontScale: 1, timeLimit: 35, language: "zh-TW" };

const STATE_KEY = "wq_state";
const SESSION_KEY = "wq_session";

export const emptyState = (): State => ({
  grade: null,
  onboarded: false,
  towers: {},
  stars: {},
  revision: {},
  stats: {},
  wallet: emptyWallet(),
  settings: { ...DEFAULT_SETTINGS },
  avatar: emptyAvatar(),
  streak: emptyStreak(),
  badges: emptyBadges(),
  daily: {},
});


export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session | null) {
  if (typeof window === "undefined") return;
  if (s) window.localStorage.setItem(SESSION_KEY, JSON.stringify(s));
  else window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent("wq-updated"));
}

export function getState(): State {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<State>;
    return {
      ...emptyState(),
      ...parsed,
      stats: parsed.stats ?? {},
      wallet: normalizeWallet(parsed.wallet),
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      avatar: normalizeAvatar(parsed.avatar),
      streak: normalizeStreak(parsed.streak),
      badges: normalizeBadges(parsed.badges),
      daily: parsed.daily ?? {},
    };

  } catch {
    return emptyState();
  }
}

/** Per-subject accuracy is stored as flat keys inside the PROGRESS settings blob. */
export function flattenStats(stats: Record<string, SubjectStat>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [subject, s] of Object.entries(stats ?? {})) {
    out[`stat_${subject}_correct`] = s.correct;
    out[`stat_${subject}_total`] = s.total;
  }
  return out;
}

export function unflattenStats(settings: Record<string, unknown>): Record<string, SubjectStat> {
  const out: Record<string, SubjectStat> = {};
  for (const [k, v] of Object.entries(settings ?? {})) {
    const m = k.match(/^stat_(.+)_(correct|total)$/);
    if (!m) continue;
    const cur = out[m[1]] ?? { correct: 0, total: 0 };
    cur[m[2] as "correct" | "total"] = Number(v) || 0;
    out[m[1]] = cur;
  }
  return out;
}

/** Per-level star ratings (1-3) are stored as `ls_<grade:world:subject:level>` keys in the settings blob. */
export function flattenLevelStars(stars: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(stars ?? {})) {
    const n = Math.round(Number(v));
    if (n >= 1 && n <= 3) out[`ls_${k}`] = n;
  }
  return out;
}

export function unflattenLevelStars(settings: Record<string, unknown>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(settings ?? {})) {
    if (!k.startsWith("ls_")) continue;
    const n = Math.round(Number(v));
    if (n >= 1 && n <= 3) out[k.slice(3)] = n;
  }
  return out;
}

/** Daily trend stats are stored as `da_<subject|day>` = "correct,total,ms" keys (last 60 days kept). */
export function flattenDaily(daily: Record<string, DailyStat>): Record<string, string> {
  const cutoff = new Date(Date.now() - 60 * 86400000).toISOString().slice(0, 10);
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(daily ?? {})) {
    if ((k.split("|")[1] ?? "") < cutoff) continue;
    out[`da_${k}`] = `${v.c},${v.t},${Math.round(v.ms)}`;
  }
  return out;
}

export function unflattenDaily(settings: Record<string, unknown>): Record<string, DailyStat> {
  const out: Record<string, DailyStat> = {};
  for (const [k, v] of Object.entries(settings ?? {})) {
    if (!k.startsWith("da_") || typeof v !== "string") continue;
    const [c, t, ms] = v.split(",").map(Number);
    if ([c, t, ms].every(Number.isFinite)) out[k.slice(3)] = { c, t, ms };
  }
  return out;
}

export function localDay(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Records one answered question for the /game profile card and the daily trend charts. */
export function recordAnswer(subject: string, correct: boolean, ms = 0) {
  updateState((s) => {
    const dk = `${subject}|${localDay()}`;
    const d = s.daily?.[dk] ?? { c: 0, t: 0, ms: 0 };
    s = { ...s, daily: { ...(s.daily ?? {}), [dk]: { c: d.c + (correct ? 1 : 0), t: d.t + 1, ms: d.ms + Math.max(0, Math.min(ms, 600000)) } } };
    const cur = s.stats[subject] ?? { correct: 0, total: 0 };
    const run = correct ? (s.badges.run[subject] ?? 0) + 1 : 0;
    return {
      ...s,
      badges: {
        ...s.badges,
        run: { ...s.badges.run, [subject]: run },
        bestRun: { ...s.badges.bestRun, [subject]: Math.max(s.badges.bestRun[subject] ?? 0, run) },
      },
      stats: { ...s.stats, [subject]: { correct: cur.correct + (correct ? 1 : 0), total: cur.total + 1 } },
    };
  });
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;

export function setState(next: State, { sync = true } = {}) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STATE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("wq-updated"));
  if (!sync) return;
  const session = getSession();
  if (!session || session.isAdmin || !session.token) return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    void (async () => {
      try {
        const { saveProgress } = await import("./auth.functions");
        await saveProgress({
          data: {
            token: session.token!,
            username: session.username,
            grade: next.grade,
            onboarded: next.onboarded,
            towers: next.towers,
            revision: next.revision,
            wallet: next.wallet,
            avatar: next.avatar,
            streak: next.streak,
            badges: next.badges,
            settings: {
              fontScale: next.settings.fontScale,
              timeLimit: next.settings.timeLimit,
              language: next.settings.language,
              ...(next.settings.lastFeedbackAt ? { lastFeedbackAt: next.settings.lastFeedbackAt } : {}),
              ...(next.settings.feedbackRating ? { feedbackRating: next.settings.feedbackRating } : {}),
              ...(next.settings.feedbackComment ? { feedbackComment: next.settings.feedbackComment } : {}),
              ...(next.settings.tutorialDone ? { tutorialDone: true } : {}),
              ...flattenStats(next.stats),
              ...flattenLevelStars(next.stars),
              ...flattenDaily(next.daily),
            },
          },
        });

      } catch (e) {
        console.error("progress sync failed", e);
      }
    })();
  }, 600);
}

export function updateState(fn: (s: State) => State) {
  setState(fn(getState()));
}

export function resetState() {
  setState(emptyState());
}

export function towerKey(grade: string, world: string, subject: string) {
  return `${grade}:${world}:${subject}`;
}

export function addRevisionItem(subject: string, item: RevisionItem) {
  updateState((s) => {
    const subj = { ...(s.revision[subject] ?? {}) };
    const topic = item.topic || "General";
    const list = [...(subj[topic] ?? [])];
    if (!list.some((x) => x.prompt === item.prompt && x.answer === item.answer)) list.push(item);
    subj[topic] = list;
    return { ...s, revision: { ...s.revision, [subject]: subj } };
  });
}

/* ---------------- wallet helpers ---------------- */

export function addStars(color: StarColor, n: number) {
  updateState((s) => ({
    ...s,
    wallet: { ...s.wallet, stars: { ...s.wallet.stars, [color]: (s.wallet.stars[color] ?? 0) + n } },
  }));
}

export function spendStars(color: StarColor, n: number): boolean {
  const s = getState();
  if ((s.wallet.stars[color] ?? 0) < n) return false;
  setState({
    ...s,
    wallet: { ...s.wallet, stars: { ...s.wallet.stars, [color]: s.wallet.stars[color] - n } },
  });
  return true;
}

export function grantItem(key: ItemKey, n = 1) {
  updateState((s) => ({
    ...s,
    wallet: { ...s.wallet, items: { ...s.wallet.items, [key]: (s.wallet.items[key] ?? 0) + n } },
  }));
}

export function consumeItem(key: ItemKey): boolean {
  const s = getState();
  if ((s.wallet.items[key] ?? 0) < 1) return false;
  setState({
    ...s,
    wallet: { ...s.wallet, items: { ...s.wallet.items, [key]: s.wallet.items[key] - 1 } },
  });
  return true;
}

export function addExp(n: number) {
  if (n <= 0) return;
  updateState((s) => ({ ...s, wallet: { ...s.wallet, exp: (s.wallet.exp ?? 0) + n } }));
}

/** Records the star rating (1-3) for a finished tower level, keeping the best result. */
export function recordLevelStars(grade: string, world: string, subject: string, level: number, stars: number) {
  updateState((s) => {
    const key = `${towerKey(grade, world, subject)}:${level}`;
    if ((s.stars[key] ?? 0) >= stars) return s;
    return { ...s, stars: { ...s.stars, [key]: stars } };
  });
}

export function getLevelStars(grade: string, world: string, subject: string, level: number) {
  return getState().stars[`${towerKey(grade, world, subject)}:${level}`] ?? 0;
}
