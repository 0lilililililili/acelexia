import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({ component: Page });

function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <p className="mt-3 text-muted-foreground">Coming soon.</p>
        <Link to="/" className="inline-block mt-6 text-primary font-semibold">← Back home</Link>
      </div>
    </main>
  );
}
