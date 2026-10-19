import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getState, setState, type State } from "@/lib/store";
import { buildStudyPlan, type TopicPlan } from "@/lib/study-plan";

export const Route = createFileRoute("/revision")({
  head: () => ({
    meta: [
      { title: "Revision bank — Acalexia" },
      { name: "description", content: "Every question you missed, grouped by subject and topic, ready to practise again." },
      { property: "og:title", content: "Revision bank — Acalexia" },
      { property: "og:description", content: "Practise the questions you missed, grouped by topic." },
    ],
  }),
  component: RevisionPage,
});

import { SUBJECT_LABEL } from "@/lib/subjects";
import { TrendCharts } from "@/components/trend-charts";
import { RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";

function RevisionPage() {
  const { t } = useLang();
  const tr = t;
  const [state, setLocal] = useState<State | null>(null);
  useEffect(() => {
    const sync = () => setLocal(getState());
    sync();
    window.addEventListener("wq-updated", sync);
    return () => window.removeEventListener("wq-updated", sync);
  }, []);

  const revision = state?.revision ?? {};
  const subjects = Object.keys(revision).filter((s) =>
    Object.values(revision[s] ?? {}).some((list) => list.length > 0),
  );

  const clearTopic = (subject: string, topic: string) => {
    const s = getState();
    const subj = { ...(s.revision[subject] ?? {}) };
    delete subj[topic];
    setState({ ...s, revision: { ...s.revision, [subject]: subj } });
  };

  const plan = useMemo(() => buildStudyPlan(revision), [revision]);

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>
        <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-extrabold">{t("revision_bank")}</h1>
            <p className="text-muted-foreground mt-1">{t("revision_sub")}</p>
          </div>
        </div>

        {subjects.length > 0 && (
          <div className="mt-6 flex items-center gap-4 rounded-3xl border-4 border-destructive bg-card p-4 shadow">
            <Link to="/requiz" search={{ subject: undefined, topic: undefined }} className="inline-flex items-center gap-3 rounded-full bg-destructive text-destructive-foreground px-6 py-4 text-xl font-extrabold shadow-lg hover:scale-105 transition">
              <RotateCcw size={28} aria-hidden /> Start Re-quiz
            </Link>
            <p className="font-semibold">Practise 15 questions you got wrong. Or press a red circle button next to a topic to practise only that topic.</p>
          </div>
        )}

        <TrendCharts daily={state?.daily ?? {}} />

        {plan.focus.length > 0 && (
          <section className="mt-8 bg-card border-2 border-border rounded-3xl p-5 shadow">
            <h2 className="text-2xl font-extrabold">{t("requiz_plan")}</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {plan.bySubject.map((s) => (
                <span key={s.subject} className="rounded-full bg-muted px-3 py-1 text-sm font-bold">
                  {SUBJECT_LABEL[s.subject] ?? s.subject}: {t("share_of_practice", { pct: s.share })}
                </span>
              ))}
            </div>

            <ol className="mt-4 space-y-3">
              {plan.focus.map((t: TopicPlan, i) => (
                <li key={`${t.subject}:${t.topic}`} className="rounded-2xl border-2 border-border p-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="font-extrabold">
                      {i + 1}. {t.topic}{" "}
                      <span className="font-semibold text-muted-foreground">
                        ({SUBJECT_LABEL[t.subject] ?? t.subject})
                      </span>
                    </h3>
                    <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                        t.band === "high"
                          ? "bg-destructive text-destructive-foreground"
                          : t.band === "medium"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-foreground"
                      }`}
                    >
                      {t.band === "high" ? tr("do_first") : t.band === "medium" ? tr("do_next") : tr("keep_warm")}
                    </span>
                    <Link
                            to="/requiz"
                            search={{ subject: t.subject, topic: t.topic }}
                            aria-label={`Re-quiz ${t.topic}`}
                            title="Re-quiz this topic"
                            className="requiz-dot grid place-items-center w-12 h-12 shrink-0 rounded-full bg-destructive text-destructive-foreground shadow-lg ring-4 ring-destructive/30 hover:scale-110 transition"
                          >
                            <RotateCcw size=22 aria-hidden />
                          </Link>
                    </div>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden" aria-hidden>
                    <div className="h-full bg-primary" style={{ width: `${t.priority}%` }} />
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    {tr("practise_about", { n: t.suggestedQuestions })}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}




        {subjects.length === 0 ? (
          <div className="mt-10 bg-card border-2 border-border rounded-3xl p-10 text-center">
            <p className="text-lg font-semibold">{t("nothing_here")}</p>
            <p className="text-muted-foreground mt-2">{t("nothing_here_sub")}</p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {subjects.map((subject) => (
              <section key={subject} className="bg-card border-2 border-border rounded-3xl p-5 shadow">
                <h2 className="text-2xl font-extrabold">{SUBJECT_LABEL[subject] ?? subject}</h2>
                <div className="mt-3 space-y-4">
                  {Object.entries(revision[subject] ?? {})
                    .filter(([, list]) => list.length > 0)
                    .map(([topic, list]) => (
                      <div key={topic} className="border-2 border-border rounded-2xl p-4">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-extrabold">
                            {topic} <span className="text-muted-foreground font-semibold">({list.length})</span>
                          </h3>
                          <div className="flex items-center gap-3">
                          <Link
                            to="/requiz"
                            search={{ subject: subject, topic: topic }}
                            aria-label={`Re-quiz ${topic}`}
                            title="Re-quiz this topic"
                            className="requiz-dot grid place-items-center w-12 h-12 shrink-0 rounded-full bg-destructive text-destructive-foreground shadow-lg ring-4 ring-destructive/30 hover:scale-110 transition"
                          >
                            <RotateCcw size=22 aria-hidden />
                          </Link>
                          <button
                            onClick={() => clearTopic(subject, topic)}
                            className="text-xs font-bold text-muted-foreground hover:text-destructive"
                          >
                            {t("clear")}
                          </button>
                          </div>
                        </div>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {list.map((item, i) => (
                            <li key={i} className="rounded-xl bg-background border border-border px-3 py-2">
                              <div className="font-bold">{item.prompt}</div>
                              <div className="text-sm text-muted-foreground">{t("answer")}: {item.answer}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
