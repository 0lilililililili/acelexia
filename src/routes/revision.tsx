import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getState, setState, type State } from "@/lib/store";
import { buildStudyPlan, REASON_LABEL, type TopicPlan } from "@/lib/study-plan";

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

function RevisionPage() {
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
        <Link to="/game" className="text-primary font-semibold">← Back to map</Link>
        <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-extrabold">Revision bank</h1>
            <p className="text-muted-foreground mt-1">Questions you missed, grouped by subject and topic.</p>
          </div>
          {subjects.length > 0 && (
            <Link to="/requiz" className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold shadow">
              Re-quiz (15 Qs)
            </Link>
          )}
        </div>

        {plan.focus.length > 0 && (
          <section className="mt-8 bg-card border-2 border-border rounded-3xl p-5 shadow">
            <h2 className="text-2xl font-extrabold">Your revision plan</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Built from what you got <strong>wrong</strong> and the <strong>tools</strong> you used
              (glass = 1, potion = 2, torch = 2, wrong = 2), with newer mistakes counting more.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {plan.bySubject.map((s) => (
                <span key={s.subject} className="rounded-full bg-muted px-3 py-1 text-sm font-bold">
                  {SUBJECT_LABEL[s.subject] ?? s.subject}: <strong>{s.share}%</strong> of your practice
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
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                        t.band === "high"
                          ? "bg-destructive text-destructive-foreground"
                          : t.band === "medium"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-foreground"
                      }`}
                    >
                      {t.band === "high" ? "Do first" : t.band === "medium" ? "Do next" : "Keep warm"}
                    </span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden" aria-hidden>
                    <div className="h-full bg-primary" style={{ width: `${t.priority}%` }} />
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    Practise about <strong>{t.suggestedQuestions} Qs</strong> here.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground font-semibold">
                    {(Object.keys(t.reasons) as (keyof typeof t.reasons)[])
                      .filter((r) => t.reasons[r] > 0)
                      .map((r) => `${REASON_LABEL[r]}: ${t.reasons[r]}`)
                      .join(" • ")}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}




        {subjects.length === 0 ? (
          <div className="mt-10 bg-card border-2 border-border rounded-3xl p-10 text-center">
            <p className="text-lg font-semibold">Nothing here yet — great work!</p>
            <p className="text-muted-foreground mt-2">Missed questions will appear here automatically.</p>
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
                          <button
                            onClick={() => clearTopic(subject, topic)}
                            className="text-xs font-bold text-muted-foreground hover:text-destructive"
                          >
                            Clear
                          </button>
                        </div>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {list.map((item, i) => (
                            <li key={i} className="rounded-xl bg-background border border-border px-3 py-2">
                              <div className="font-bold">{item.prompt}</div>
                              <div className="text-sm text-muted-foreground">Answer: {item.answer}</div>
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
