// Central client-side store: session, tower progress, revision bank and settings.
// Mirrors everything into the cloud PROGRESS database whenever a user is logged in.
import type { RevisionItem } from "./auth.functions";

export type Settings = {
  fontScale: number; // 1 = normal
  timeLimit: number; // seconds per question
};

export type Session = { userId: string; username: string; isAdmin: boolean };

export type State = {
  grade: string | null;
  onboarded: boolean;
  towers: Record<string, number>; // "grade:world:subject" -> highest cleared level
  revision: Record<string, Record<string, RevisionItem[]>>; // subject -> topic -> items
  settings: Settings;
};

export const DEFAULT_SETTINGS: Settings = { fontScale: 1, timeLimit: 35 };

const STATE_KEY = "wq_state";
const SESSION_KEY = "wq_session";

export const emptyState = (): State => ({
  grade: null,
  onboarded: false,
  towers: {},
  revision: {},
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
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
    };
  } catch {
    return emptyState();
  }
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
            settings: { fontScale: next.settings.fontScale, timeLimit: next.settings.timeLimit },
          },
        });
      } catch (e) {
        console.error("progress sync failed", e);
      }
    })();
  }, 600);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("settings-updated"));
  }
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
