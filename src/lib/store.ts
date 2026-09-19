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
};

export type Session = { userId: string; username: string; isAdmin: boolean };

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
};

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

/** Records one answered question for the /game profile card. */
export function recordAnswer(subject: string, correct: boolean) {
  updateState((s) => {
    const cur = s.stats[subject] ?? { correct: 0, total: 0 };
    return {
      ...s,
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
  if (!session || session.isAdmin) return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    void (async () => {
      try {
        const { saveProgress } = await import("./auth.functions");
        await saveProgress({
          data: {
            userId: session.userId,
            username: session.username,
            grade: next.grade,
            onboarded: next.onboarded,
            towers: next.towers,
            revision: next.revision,
            wallet: next.wallet,
            settings: {
              fontScale: next.settings.fontScale,
              timeLimit: next.settings.timeLimit,
              language: next.settings.language,
              ...(next.settings.lastFeedbackAt ? { lastFeedbackAt: next.settings.lastFeedbackAt } : {}),
              ...(next.settings.feedbackRating ? { feedbackRating: next.settings.feedbackRating } : {}),
              ...(next.settings.feedbackComment ? { feedbackComment: next.settings.feedbackComment } : {}),
              ...flattenStats(next.stats),
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
