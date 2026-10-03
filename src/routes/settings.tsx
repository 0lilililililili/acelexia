import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DEFAULT_SETTINGS, getState, setState, type Settings } from "@/lib/store";
import { useLang } from "@/lib/i18n";

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
  const { t } = useLang();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getState().settings);
  }, []);

  const update = (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    setState({ ...getState(), settings: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const reset = () => {
    if (!window.confirm(t("reset_confirm"))) return;
    const fresh = { ...settings, fontScale: DEFAULT_SETTINGS.fontScale, timeLimit: DEFAULT_SETTINGS.timeLimit };
    setSettings(fresh);
    setState({ ...getState(), settings: fresh });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };


  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>
        <h1 className="text-4xl font-extrabold mt-3">{t("settings")}</h1>
        <p className="text-muted-foreground mt-1">{t("settings_sub")}</p>

        <section className="mt-8 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">{t("text_size")}</h2>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FONT_CHOICES.map((f) => (
              <button
                key={f.value}
                onClick={() => update({ fontScale: f.value })}
                className={`rounded-xl py-3 font-bold border-2 ${settings.fontScale === f.value ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}
              >
                {t(f.key)}
              </button>
            ))}
          </div>
          <p className="mt-3" style={{ fontSize: `${settings.fontScale}rem` }}>{t("preview_text")}</p>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">{t("time_limit")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("time_limit_sub")}</p>
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TIME_CHOICES.map((secs) => (
              <button
                key={secs}
                onClick={() => update({ timeLimit: secs })}
                className={`rounded-xl py-3 font-bold border-2 ${settings.timeLimit === secs ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}
              >
                {secs}s
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">{t("system_language")}</h2>
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
          <p className="mt-3 text-sm text-muted-foreground">{t("language_note")}</p>
        </section>

        <section className="mt-6 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">{t("reset")}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t("reset_sub")}</p>
          <button
            onClick={reset}
            className="mt-4 rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold"
          >
            {t("reset_btn")}
          </button>
        </section>

        {saved && <p className="mt-4 text-sm font-semibold text-primary">{t("saved")}</p>}


      </div>
    </main>
  );
}
