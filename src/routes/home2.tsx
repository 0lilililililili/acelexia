import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/home2")({ component: Home2 });

function Home2() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-2">Welcome, explorer! 🗺️</h1>
      <p className="text-muted-foreground mb-10">Let's get to know you first.</p>

      <div className="grid gap-6 sm:grid-cols-2 max-w-3xl w-full">
        <Link
          to="/upload-report"
          className="rounded-3xl bg-card border-2 border-border p-8 hover:border-primary hover:scale-[1.02] transition shadow"
        >
          <div className="text-5xl mb-3">📄</div>
          <h2 className="text-2xl font-bold">Upload my report</h2>
          <p className="mt-2 text-muted-foreground">
            Share your dyslexia assessment so we can tailor the game.
          </p>
        </Link>

        <Link
          to="/take-test"
          className="rounded-3xl bg-primary text-primary-foreground p-8 hover:scale-[1.02] transition shadow-lg"
        >
          <div className="text-5xl mb-3">🧠</div>
          <h2 className="text-2xl font-bold">Take our quick test</h2>
          <p className="mt-2 opacity-90">
            A few short questions to figure out where to start.
          </p>
        </Link>
      </div>

      <Link to="/" className="mt-10 text-sm text-muted-foreground">← Home</Link>
    </main>
  );
}
