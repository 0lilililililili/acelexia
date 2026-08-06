import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signUpUser } from "@/lib/auth.functions";
import { emptyState, setSession, setState } from "@/lib/store";
import pirateMap from "@/assets/pirate-map.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Acalexia account" },
      { name: "description", content: "Sign up to save your tower progress, revision bank and settings in Acalexia." },
      { property: "og:title", content: "Create your Acalexia account" },
      { property: "og:description", content: "Save your progress across every world and tower." },
    ],
  }),
  component: SignupPage,
});

const RESERVED = ["admin", "test1"];

function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const validate = () => {
    const n = name.trim();
    if (n.length < 3 || n.length > 20) return "Name must be 3–20 characters.";
    if (!/^[A-Za-z0-9_ -]+$/.test(n)) return "Only letters, numbers, spaces, - and _ are allowed.";
    if (RESERVED.includes(n.toLowerCase())) return `"${n}" is reserved. Please pick another name.`;
    if (pw.length < 6) return "Password must be at least 6 characters.";
    if (pw !== pw2) return "The two passwords don't match.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErr(v);
    if (v) return;
    setBusy(true);
    try {
      const res = await signUpUser({ data: { username: name.trim(), password: pw } });
      if (!res.ok) {
        setErr(res.error);
        return;
      }
      setState({ ...emptyState() }, { sync: false });
      setSession({ userId: res.userId, username: res.username, isAdmin: false });
      nav({ to: "/take-test" });
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
        <h1 className="text-3xl font-extrabold">Sign up</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick an explorer name — your progress will be saved to it.
        </p>

        <label className="block mt-6 font-semibold" htmlFor="username">Explorer name</label>
        <input
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="username"
          placeholder="e.g. SamTheBrave"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />
        <p className="text-xs text-muted-foreground mt-1">3–20 letters/numbers. "admin" and "test1" are not allowed.</p>

        <label className="block mt-4 font-semibold" htmlFor="pw">Password</label>
        <input
          id="pw"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        <label className="block mt-4 font-semibold" htmlFor="pw2">Type password again</label>
        <input
          id="pw2"
          type="password"
          value={pw2}
          onChange={(e) => setPw2(e.target.value)}
          autoComplete="new-password"
          className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
        />

        {err && <p className="text-destructive text-sm mt-3 font-semibold">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-50"
        >
          {busy ? "Creating…" : "Create account →"}
        </button>

        <Link to="/login" className="block mt-4 text-center text-sm text-primary font-semibold">
          I already have an account
        </Link>
        <Link to="/" className="block mt-2 text-center text-sm text-muted-foreground">← Back home</Link>
      </form>
    </main>
  );
}
