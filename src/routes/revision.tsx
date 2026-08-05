import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, setState, type State } from "@/lib/store";

export const Route = createFileRoute("/revision")({
  head: () => ({
    meta: [
      { title: "Revision bank — WordQuest" },
      { name: "description", content: "Every question you missed, grouped by subject and topic, ready to practise again." },
      { property: "og:title", content: "Revision bank — WordQuest" },
      { property: "og:description", content: "Practise the questions you missed, grouped by topic." },
    ],
  }),
  component: RevisionPage,
});

const SUBJECT_LABEL: Record<string, string> = { chi: "Chinese", eng: "English", math: "Math" };

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

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">← Back to map</Link>
        <h1 className="text-4xl font-extrabold mt-3">Revision bank</h1>
        <p className="text-muted-foreground mt-1">Questions you missed, grouped by subject and topic.</p>

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
