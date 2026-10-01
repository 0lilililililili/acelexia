import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — Acalexia" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("wq_admin") !== "1") {
      nav({ to: "/login" });
      return;
    }
    setOk(true);
  }, [nav]);

  if (!ok) return null;

  return (
    <main className="min-h-screen p-6 bg-background">
      <header className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">Admin</h1>
          <p className="text-sm text-muted-foreground">Data and source code tools.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-sm text-primary font-semibold">← Home</Link>
          <button
            onClick={() => { window.sessionStorage.removeItem("wq_admin"); nav({ to: "/login" }); }}
            className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold"
          >Log out</button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
        <Link to="/admin/view" className="rounded-3xl bg-card border-2 border-border p-6 shadow hover:border-primary transition">
          <h2 className="text-xl font-extrabold">Submissions</h2>
          <p className="text-sm text-muted-foreground mt-1">Data table of every recorded test.</p>
        </Link>
        <Link to="/admin/progress" className="rounded-3xl bg-card border-2 border-border p-6 shadow hover:border-primary transition">
          <h2 className="text-xl font-extrabold">PROGRESS database</h2>
          <p className="text-sm text-muted-foreground mt-1">Players, towers, revision banks, settings.</p>
        </Link>
        <Link to="/admin/about" className="rounded-3xl bg-card border-2 border-border p-6 shadow hover:border-primary transition">
          <h2 className="text-xl font-extrabold">About page</h2>
          <p className="text-sm text-muted-foreground">Edit the About Us page.</p>
        </Link>
        <Link to="/code" className="rounded-3xl bg-card border-2 border-border p-6 shadow hover:border-primary transition">
          <h2 className="text-xl font-extrabold">{"</> Code"}</h2>
          <p className="text-sm text-muted-foreground mt-1">Browse the source of every page.</p>
        </Link>
      </div>
    </main>
  );
}
