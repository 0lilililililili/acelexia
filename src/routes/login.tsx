import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { logInUser } from "@/lib/auth.functions";
import { DEFAULT_SETTINGS, emptyState, normalizeWallet, setSession, setState, unflattenStats, type State, type Wallet } from "@/lib/store";
import pirateMap from "@/assets/pirate-map.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in to Acalexia" },
      { name: "description", content: "Log in to restore your towers, revision bank and settings in Acalexia." },
      { property: "og:title", content: "Log in to Acalexia" },
      { property: "og:description", content: "Your adventure continues where you left off." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!id.trim() || !pw) {
      setErr("Please enter a name and password.");
      return;
    }
    setBusy(true);
    try {
      const res = await logInUser({ data: { username: id.trim(), password: pw } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      if (res.isAdmin) {
        try {
          window.sessionStorage.setItem("wq_admin", "1");
          window.sessionStorage.setItem("wq_admin_pw", pw);
        } catch {}
        setSession({ userId: "admin", username: "admin", isAdmin: true });
        nav({ to: "/admin" });
        return;
      }

      // Restore everything from PROGRESS
      const p = res.progress;
      const restored: State = p
        ? {
            grade: p.grade,
            onboarded: p.onboarded,
            towers: p.towers ?? {},
            stars: {},
            revision: p.revision ?? {},
            stats: unflattenStats(p.settings ?? {}),
            wallet: normalizeWallet(p.wallet as Partial<Wallet>),
            settings: { ...DEFAULT_SETTINGS, ...(p.settings ?? {}) },
          }
        : emptyState();
      setState(restored, { sync: false });
      setSession({ userId: res.userId, username: res.username, isAdmin: false });
      try {
        window.localStorage.setItem(
          "player",
          JSON.stringify({ name: res.username, grade: restored.grade ?? "P3" }),
        );
      } catch {}

      // New player (never finished the test) → take the test first
      nav({ to: restored.onboarded ? "/game" : "/take-test" });
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{ backgroundImage: `url(${pirateMap})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-[oklch(0.97_0.05_80)]/55" />
      <form onSubmit={submit} className="relative bg-card border-2 border-border rounded-3xl p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-extrabold">Log in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your towers, revision bank and settings come back with you.
        </p>

        <label className="block mt-6 font-semibold" htmlFor="loginid">Login ID</label>
        <input
          id="loginid"
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="username"
          placeholder="Your explorer name"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        <label className="block mt-4 font-semibold" htmlFor="loginpw">Password</label>
        <input
          id="loginpw"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        {err && <p className="text-destructive text-sm mt-3 font-semibold">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-50"
        >
          {busy ? "Checking…" : "Log in →"}
        </button>

        <Link to="/signup" className="block mt-4 text-center text-sm text-primary font-semibold">
          Create a new account
        </Link>
        <Link to="/" className="block mt-2 text-center text-sm text-muted-foreground">← Back home</Link>
      </form>
    </main>
  );
}
