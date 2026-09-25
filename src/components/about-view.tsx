import type { AboutBlock } from "@/lib/about.functions";

export function AboutView({ blocks }: { blocks: AboutBlock[] }) {
  return (
    <article className="space-y-4">
      {blocks.map((b, i) =>
        b.kind === "heading" ? (
          <h2 key={i} className={i === 0 ? "text-4xl font-extrabold" : "text-2xl font-extrabold pt-2 border-b-2 border-border pb-1"}>
            {b.content}
          </h2>
        ) : b.kind === "image" ? (
          <figure key={i}>
            {b.image_url && <img src={b.image_url} alt={b.content || ""} className="rounded-2xl border-2 border-border max-h-96 w-auto" />}
            {b.content && <figcaption className="text-sm text-muted-foreground mt-1">{b.content}</figcaption>}
          </figure>
        ) : (
          <p key={i} className="whitespace-pre-line text-lg">{b.content}</p>
        ),
      )}
    </article>
  );
}
