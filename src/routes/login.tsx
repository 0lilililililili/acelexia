import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (id.trim() === "admin" && pw === "12345678") {
      try { window.sessionStorage.setItem("wq_admin", "1"); } catch {}
      nav({ to: "/admin" });
      return;
    }
    // Non-admin login is a placeholder for now
    if (id.trim() && pw) {
      nav({ to: "/home2" });
      return;
    }
    setErr("Please enter an ID and password.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="bg-card border-2 border-border rounded-3xl p-8 w-full max-w-md shadow-lg"
      >
        <h1 className="text-3xl font-extrabold">Log in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Admins can view collected question stats.
        </p>

        <label className="block mt-6 font-semibold">Login ID</label>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
          placeholder="e.g. admin"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        <label className="block mt-4 font-semibold">Password</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        {err && <p className="text-destructive text-sm mt-3">{err}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold"
        >
          Log in →
        </button>

        <Link to="/" className="block mt-4 text-center text-sm text-muted-foreground">← Back home</Link>
      </form>
    </main>
  );
}
