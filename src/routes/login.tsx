import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { logInUser } from "@/lib/auth.functions";
import { DEFAULT_SETTINGS, emptyState, normalizeAvatar, normalizeBadges, normalizeStreak, normalizeWallet, setSession, setState, unflattenStats, unflattenLevelStars, unflattenDaily, type State, type Wallet } from "@/lib/store";
import pirateMap from "@/assets/pirate-map.jpg";
import { BackButton } from "@/components/back-button";
import {Button} from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, 
      { title: "Log in to Acelexia" },
      { name: "description", content: "Log in to restore your towers, revision bank and settings in Acelexia." },
      { property: "og:title", content: "Log in to Acelexia" },
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
          window.sessionStorage.setItem("wq_admin_token", res.token);
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
            stars: unflattenLevelStars(p.settings ?? {}),
            revision: p.revision ?? {},
            stats: unflattenStats(p.settings ?? {}),
            wallet: normalizeWallet(p.wallet as Partial<Wallet>),
            settings: { ...DEFAULT_SETTINGS, ...(p.settings ?? {}) },
            avatar: normalizeAvatar(p.avatar as never),
            streak: normalizeStreak(p.streak as never),
            badges: normalizeBadges(p.badges as never),
            daily: unflattenDaily(p.settings ?? {}),
          }
        : emptyState();
      setState(restored, { sync: false });
      setSession({ userId: res.userId, username: res.username, isAdmin: false, token: res.token });
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

        <Button
          type="submit"
          disabled={busy}
          className="mt-6 w-full h-16 text-lg font-bold transition hover:bg-forest hover:shadow-lg focus-visible:ring-4 disabled:opacity-50"
        >
          {busy ? "Checking…" : "Log in →"}
        </Button>

        <Link to="/signup" className="block mt-4 text-center text-sm text-primary font-semibold">
          Create a new account
        </Link>
        <div className="mt-2 text-center text-sm"><BackButton className="text-muted-foreground" /></div>
      </form>
    </main>
  );
}
