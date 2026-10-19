import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/code")({
  head: () => ({ meta: [{ name: "description", content: "Code — Acelexia. Manage your Acelexia learning adventure." }, { property: "og:title", content: "Code — Acelexia" }, { property: "og:description", content: "Code — Acelexia. Acelexia learning tools." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { title: "Code — Acelexia" }, { name: "robots", content: "noindex" }] }),
  component: CodePage,
});

// Bundle every source file at build time as raw text.
const RAW_FILES = import.meta.glob(
  ["/src/**/*.{ts,tsx,css}", "!/src/**/*.gen.ts"],
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

const EXCLUDE = /routeTree\.gen\.ts$|\/components\/ui\//;

function CodePage() {
  const files = useMemo(
    () =>
      Object.keys(RAW_FILES)
        .filter((p) => !EXCLUDE.test(p))
        .sort(),
    [],
  );
  const [selected, setSelected] = useState<string | null>(files[0] ?? null);

  const grouped = useMemo(() => {
    const g: Record<string, string[]> = {};
    for (const f of files) {
      const key = f.startsWith("/src/routes/")
        ? "Pages (routes)"
        : f.startsWith("/src/lib/")
          ? "Library"
          : f.startsWith("/src/hooks/")
            ? "Hooks"
            : f.startsWith("/src/components/")
              ? "Components"
              : "Other";
      (g[key] ||= []).push(f);
    }
    return g;
  }, [files]);

  const code = selected ? RAW_FILES[selected] : "";

  return (
    <main className="min-h-screen bg-background p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold">{"</> App source code"}</h1>
        <BackButton className="text-sm text-primary" />
      </header>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="bg-card border-2 border-border rounded-2xl p-3 max-h-[80vh] overflow-auto">
          {Object.entries(grouped).map(([label, list]) => (
            <div key={label} className="mb-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground font-bold mb-1">
                {label}
              </div>
              <ul className="space-y-1">
                {list.map((f) => (
                  <li key={f}>
                    <button
                      onClick={() => setSelected(f)}
                      className={`w-full text-left text-xs px-2 py-1 rounded font-mono truncate ${
                        selected === f
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                      title={f}
                    >
                      {f.replace("/src/", "")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <section className="bg-card border-2 border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-muted/40">
            <span className="font-mono text-xs truncate">{selected ?? "—"}</span>
            {selected && (
              <button
                onClick={() => navigator.clipboard?.writeText(code)}
                className="text-xs font-bold rounded bg-primary text-primary-foreground px-2 py-1"
              >Copy</button>
            )}
          </div>
          <pre className="text-xs leading-relaxed overflow-auto p-4 max-h-[80vh] whitespace-pre">
            <code>{code}</code>
          </pre>
        </section>
      </div>
    </main>
  );
}
