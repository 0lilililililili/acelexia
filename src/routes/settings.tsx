import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, getState, setState, type Settings } from "@/lib/store";

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

const FONT_CHOICES: { label: string; value: number }[] = [
  { label: "Small", value: 0.9 },
  { label: "Normal", value: 1 },
  { label: "Large", value: 1.2 },
  { label: "Extra large", value: 1.45 },
];

const TIME_CHOICES = [15, 25, 35, 60, 90];

function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => setSettings(getState().settings), []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    setState({ ...getState(), settings: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const reset = () => {
    if (!window.confirm("Reset text size and question time limit back to normal?")) return;
    const fresh = { ...DEFAULT_SETTINGS };
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

        {saved && <p className="mt-4 text-sm font-semibold text-primary">Saved ✓</p>}

      </div>
    </main>
  );
}
