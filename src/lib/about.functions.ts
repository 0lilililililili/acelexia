import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";


export type AboutBlock = { kind: "heading" | "text" | "image"; content: string; image_url?: string | null };

const Block = z.object({
  kind: z.enum(["heading", "text", "image"]),
  content: z.string().max(5000),
  // Pictures are stored as small data URLs or https links.
  image_url: z.string().max(900_000).nullable().optional(),
});

export const getAboutBlocks = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await sb
    .from("about_blocks")
    .select("kind, content, image_url, position")
    .order("position", { ascending: true });
  if (error) return { blocks: [] as AboutBlock[] };
  return { blocks: (data ?? []).map((b) => ({ kind: b.kind as AboutBlock["kind"], content: b.content, image_url: b.image_url })) };
});

export const saveAboutBlocks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ adminToken: z.string().max(2000), blocks: z.array(Block).max(100) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./session.server");
    await requireAdmin(data.adminToken);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const del = await supabaseAdmin.from("about_blocks").delete().gte("position", -1);
    if (del.error) throw del.error;
    if (data.blocks.length) {
      const { error } = await supabaseAdmin.from("about_blocks").insert(
        data.blocks.map((b, i) => ({ kind: b.kind, content: b.content, image_url: b.image_url ?? null, position: i })),
      );
      if (error) throw error;
    }
    return { ok: true as const };
  });
