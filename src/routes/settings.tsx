import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({ component: Page });

function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">⚙️ Settings</h1>
        <p className="mt-3 text-muted-foreground">Coming soon.</p>
        <Link to="/game" className="inline-block mt-6 text-primary font-semibold">← Back to map</Link>
      </div>
    </main>
  );
}
