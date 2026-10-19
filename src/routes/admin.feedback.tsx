import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BackButton } from "@/components/back-button";
import { listFeedbacks } from "@/lib/feedback.functions";

export const Route = createFileRoute("/admin/feedback")({
  head: () => ({ meta: [{ name: "description", content: "Feedback — Acelexia Admin. Manage your Acelexia learning adventure." }, { property: "og:title", content: "Feedback — Acelexia Admin" }, { property: "og:description", content: "Feedback — Acelexia Admin. Acelexia learning tools." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { title: "Feedback — Acelexia Admin" }, { name: "robots", content: "noindex" }] }),
  component: FeedbackAdmin,
});

type Row = { id: string; username: string; rating: number; comment: string; created_at: string };

function FeedbackAdmin() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const tok = window.sessionStorage.getItem("wq_admin_token");
    if (window.sessionStorage.getItem("wq_admin") !== "1" || !tok) { nav({ to: "/login" }); return; }
    listFeedbacks({ data: { adminToken: tok } })
      .then((r) => setRows(r.rows as Row[]))
      .catch(() => setErr("Could not load feedback."));
  }, [nav]);

  const avg = useMemo(() => (rows.length ? rows.reduce((s, r) => s + r.rating, 0) / rows.length : 0), [rows]);

  return (
    <main className="min-h-screen p-6 bg-background">
      <header className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">Admin • Feedback</h1>
          <p className="text-sm text-muted-foreground">
            {rows.length} feedback{rows.length === 1 ? "" : "s"} · Avg rating {avg.toFixed(1)} / 5
          </p>
        </div>
        <BackButton className="text-sm text-primary" />
      </header>
      {err && <p className="text-destructive font-bold mb-4">{err}</p>}
      <div className="grid gap-3 max-w-3xl">
        {rows.length === 0 && !err && <p className="text-muted-foreground">No feedback yet.</p>}
        {rows.map((r) => (
          <article key={r.id} className="rounded-2xl bg-card border-2 border-border p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-extrabold">{r.username}</span>
              <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
            </div>
            <div className="text-primary font-bold mt-1" aria-label={`${r.rating} out of 5`}>
              {"★".repeat(r.rating)}<span className="opacity-30">{"★".repeat(5 - r.rating)}</span>
            </div>
            {r.comment ? <p className="mt-2 whitespace-pre-wrap">{r.comment}</p> : <p className="mt-2 text-sm text-muted-foreground">(no comment)</p>}
          </article>
        ))}
      </div>
    </main>
  );
}
