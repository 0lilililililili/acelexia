import { createFileRoute, Link } from "@tanstack/react-router";
import { getAboutBlocks } from "@/lib/about.functions";
import { DEFAULT_ABOUT } from "@/lib/about-defaults";
import { AboutView } from "@/components/about-view";

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
        <Link to="/" className="text-primary font-semibold">← Back</Link>
        <div className="mt-4"><AboutView blocks={blocks} /></div>
        <section className="mt-8 border-t-2 border-border pt-6">
          <h2 className="text-2xl font-extrabold">How your child's answers guide their practice</h2>
          <ol className="mt-3 space-y-3 text-lg leading-relaxed list-decimal pl-6">
            <li><b>Two signals per answer.</b> Every answer records whether it was right and how long it took. Slow-but-correct and fast-but-wrong tell us different things.</li>
            <li><b>Spotting the gap.</b> Answers are grouped by subject (中, ENG, MATH), topic and question type, such as look-alike characters (形近字), spelling or word problems.</li>
            <li><b>Recent mistakes count more.</b> Newer errors weigh more than old ones, so the plan follows how your child is doing now.</li>
            <li><b>Focus on what matters most.</b> The few topics causing most mistakes become the Re-quiz plan, and missed questions go to the Revision bank.</li>
            <li><b>Back into play.</b> These topics return as short practice rounds, so improvement happens inside the game.</li>
          </ol>
          <p className="mt-3 text-muted-foreground">Only answers and timings are used. Voice is processed on the device and never saved.</p>
        </section>
      </div>
    </main>
  );
}
