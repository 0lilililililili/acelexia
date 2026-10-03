import { createFileRoute, Link } from "@tanstack/react-router";
import { getAboutBlocks } from "@/lib/about.functions";
import { DEFAULT_ABOUT } from "@/lib/about-defaults";
import { AboutView } from "@/components/about-view";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Privacy — Acelexia" },
      { name: "description", content: "Who makes Acelexia, what data the game collects, and how children's privacy is protected." },
      { property: "og:title", content: "About Us & Privacy — Acelexia" },
      { property: "og:description", content: "What data Acelexia collects and how we keep it safe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: async () => {
    try {
      const { blocks } = await getAboutBlocks();
      return { blocks: blocks.length ? blocks : DEFAULT_ABOUT };
    } catch {
      return { blocks: DEFAULT_ABOUT };
    }
  },
  errorComponent: () => <main className="p-8"><AboutView blocks={DEFAULT_ABOUT} /></main>,
  notFoundComponent: () => <main className="p-8">Not found</main>,
  component: AboutPage,
});

function AboutPage() {
  const { blocks } = Route.useLoaderData();
  return (
    <main className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-3xl mx-auto bg-card border-2 border-border rounded-3xl p-6 sm:p-10 shadow">
        <BackButton className="text-primary" />
        <div className="mt-4"><AboutView blocks={blocks} /></div>
      </div>
    </main>
  );
}
