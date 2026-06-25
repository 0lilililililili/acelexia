import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WordQuest — Reading & Math Adventure for Dyslexic Kids" },
      { name: "description", content: "A friendly game that helps K3–P6 dyslexic kids in Hong Kong practice Chinese, English and Math through voice." },
      { property: "og:title", content: "WordQuest" },
      { property: "og:description", content: "Reading & math adventure for dyslexic kids." },
    ],
  }),
  component: Home1,
});

function Home1() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 text-center max-w-2xl">
        <div className="text-7xl mb-4">🐉✨</div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          Word<span className="text-primary">Quest</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Defeat bosses with your voice. Learn Chinese, English & Math.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            to="/signup"
            className="rounded-2xl bg-primary text-primary-foreground px-6 py-5 text-lg font-bold shadow-lg hover:scale-[1.03] transition"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="rounded-2xl bg-card border-2 border-primary text-primary px-6 py-5 text-lg font-bold hover:scale-[1.03] transition"
          >
            Log in
          </Link>
          <Link
            to="/home2"
            className="rounded-2xl bg-accent text-accent-foreground px-6 py-5 text-lg font-bold shadow-lg hover:scale-[1.03] transition"
          >
            🎮 Trial
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Designed for dyslexic kids • K3 to P6 • Hong Kong
        </p>
      </div>
    </main>
  );
}
