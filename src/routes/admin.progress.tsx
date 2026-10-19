import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { listProgress } from "@/lib/auth.functions";

export const Route = createFileRoute("/admin/progress")({
  head: () => ({ meta: [{ name: "description", content: "PROGRESS database — Admin. Manage your Acelexia learning adventure." }, { property: "og:title", content: "PROGRESS database — Admin" }, { property: "og:description", content: "PROGRESS database — Admin. Acelexia learning tools." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { title: "PROGRESS database — Admin" }, { name: "robots", content: "noindex" }] }),
  component: ProgressAdmin,
});

type Row = {
  user_id: string;
  username: string;
  grade: string | null;
  onboarded: boolean;
  towers: Record<string, number> | null;
  revision_bank: Record<string, Record<string, unknown[]>> | null;
  settings: Record<string, unknown> | null;
  updated_at: string;
};

function ProgressAdmin() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pw = window.sessionStorage.getItem("wq_admin_token");
    if (window.sessionStorage.getItem("wq_admin") !== "1" || !pw) {
      nav({ to: "/login" });
      return;
    }
    listProgress({ data: { adminToken: pw } })
      .then((r) => setRows(r.rows as unknown as Row[]))
      .catch(() => setErr("Could not load the PROGRESS database."));
  }, [nav]);

  const totals = useMemo(
    () => ({
      players: rows.length,
      revisions: rows.reduce(
        (n, r) =>
          n +
          Object.values(r.revision_bank ?? {}).reduce(
            (m, topics) => m + Object.values(topics).reduce((k, list) => k + list.length, 0),
            0,
          ),
        0,
      ),
    }),
    [rows],
  );

  return (
    <main className="min-h-screen p-6">
      <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Admin • PROGRESS database</h1>
          <p className="text-sm text-muted-foreground">
            {totals.players} players • {totals.revisions} saved revision items
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin" className="text-sm text-primary font-semibold">← Stats</Link>
          <Link to="/code" className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold">
            {"</> Code"}
          </Link>
        </div>
      </header>

      {err && <p className="text-destructive font-semibold">{err}</p>}

      <div className="overflow-x-auto bg-card border-2 border-border rounded-3xl">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Username</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Towers cleared</th>
              <th className="p-3">Revision items</th>
              <th className="p-3">Settings</th>
              <th className="p-3">Updated</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const towers = r.towers ?? {};
              const revCount = Object.values(r.revision_bank ?? {}).reduce(
                (m, topics) => m + Object.values(topics).reduce((k, l) => k + l.length, 0),
                0,
              );
              const s = r.settings ?? {};
              return (
                <Fragment key={r.user_id}>
                  <tr className="border-t border-border">
                    <td className="p-3 font-mono text-xs">{r.user_id.slice(0, 8)}</td>
                    <td className="p-3 font-bold">{r.username}</td>
                    <td className="p-3">{r.grade ?? "—"}</td>
                    <td className="p-3">{Object.keys(towers).length}</td>
                    <td className="p-3">{revCount}</td>
                    <td className="p-3">
                      {s.fontScale ? `text ${s.fontScale}×` : "default"} • {s.timeLimit ? `${s.timeLimit}s` : "35s"}
                    </td>
                    <td className="p-3">{new Date(r.updated_at).toLocaleString()}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setOpen(open === r.user_id ? null : r.user_id)}
                        className="text-primary font-bold"
                      >
                        {open === r.user_id ? "Hide" : "Details"}
                      </button>
                    </td>
                  </tr>
                  {open === r.user_id && (
                    <tr className="border-t border-border bg-muted/30">
                      <td colSpan={8} className="p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h3 className="font-extrabold mb-1">Towers</h3>
                            <ul className="text-xs font-mono space-y-0.5">
                              {Object.entries(towers).map(([k, v]) => (
                                <li key={k}>{k} → level {v}</li>
                              ))}
                              {Object.keys(towers).length === 0 && <li>none</li>}
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-extrabold mb-1">Revision bank</h3>
                            <ul className="text-xs space-y-0.5">
                              {Object.entries(r.revision_bank ?? {}).flatMap(([subj, topics]) =>
                                Object.entries(topics).map(([topic, list]) => (
                                  <li key={`${subj}-${topic}`}>
                                    {subj.toUpperCase()} • {topic}: {list.length}
                                  </li>
                                )),
                              )}
                              {revCount === 0 && <li>none</li>}
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {rows.length === 0 && !err && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">No players yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
