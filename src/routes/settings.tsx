import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { DEFAULT_SETTINGS, emptyState, getSession, getState, setSession, setState, type Settings } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Acalexia" },
      { name: "description", content: "Change text size, question time limit, or reset your Acalexia progress." },
      { property: "og:title", content: "Settings — Acalexia" },
      { property: "og:description", content: "Make Acalexia comfortable for you." },
    ],
  }),
  component: SettingsPage,
});

const FONT_CHOICES: { key: string; value: number }[] = [
  { key: "small", value: 0.9 },
  { key: "normal", value: 1 },
  { key: "large", value: 1.2 },
  { key: "xlarge", value: 1.45 },
];

const TIME_CHOICES = [15, 25, 35, 60, 90];

const LANGUAGE_CHOICES: { label: string; value: Settings["language"] }[] = [
  { label: "繁體中文", value: "zh-TW" },
  { label: "简体中文", value: "zh-CN" },
  { label: "English", value: "en" },
];

function SettingsPage() {
  const nav = useNavigate();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setSettings(getState().settings);
    setUsername(getSession()?.username ?? null);
  }, []);

  const logOut = () => {
    if (!window.confirm("Log out of Acelexia? Your progress is saved.")) return;
    setSession(null);
    setState(emptyState(), { sync: false });
    try {
      window.localStorage.removeItem("player");
      window.sessionStorage.removeItem("wq_admin");
      window.sessionStorage.removeItem("wq_admin_pw");
    } catch {}
    nav({ to: "/" });
  };

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    setState({ ...getState(), settings: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const reset = () => {
    if (!window.confirm("Reset text size and question time limit back to normal?")) return;
    const fresh = { ...settings, fontScale: DEFAULT_SETTINGS.fontScale, timeLimit: DEFAULT_SETTINGS.timeLimit };
    setSettings(fresh);
    setState({ ...getState(), settings: fresh });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };


  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">← Back to map</Link>
        <h1 className="text-4xl font-extrabold mt-3">Settings</h1>
        <p className="text-muted-foreground mt-1">
          These are saved with your account and come back next time you log in.
        </p>

        <section className="mt-8 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">Text size</h2>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FONT_CHOICES.map((f) => (
              <button
                key={f.value}
                onClick={() => update({ fontScale: f.value })}
                className={`rounded-xl py-3 font-bold border-2 ${settings.fontScale === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="mt-3" style={{ fontSize: `${settings.fontScale}rem` }}>
            Preview: the quick brown fox reads every word.
          </p>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">Question time limit</h2>
          <p className="text-sm text-muted-foreground mt-1">How long you get to answer each question.</p>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TIME_CHOICES.map((t) => (
              <button
                key={t}
                onClick={() => update({ timeLimit: t })}
                className={`rounded-xl py-3 font-bold border-2 ${settings.timeLimit === t ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}
              >
                {t}s
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">System language</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {LANGUAGE_CHOICES.map((option) => (
              <button
                key={option.value}
                onClick={() => update({ language: option.value })}
                className={`rounded-xl py-3 font-bold border-2 ${settings.language === option.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">ENG stays in English. 中 and MATH follow this choice.</p>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">Reset</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Puts text size and question time limit back to normal. Your progress is kept.
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold"
          >
            Reset text size &amp; time limit
          </button>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">Account</h2>
          <p className="text-sm mt-1">
            You stay <strong>logged in</strong>{username ? <> as <strong>{username}</strong></> : null} until you press{" "}
            <strong>Log out</strong>.
          </p>
          <button
            onClick={logOut}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-card border-2 border-border px-6 py-3 font-extrabold hover:border-destructive"
          >
            <LogOut size={20} aria-hidden /> Log out
          </button>
        </section>

        {saved && <p className="mt-4 text-sm font-semibold text-primary">Saved ✓</p>}


      </div>
    </main>
  );
}
