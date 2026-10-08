import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Players send feedback; signed-in players are linked to their account, others saved as guest. */
export const sendFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        token: z.string().max(2000).optional(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().max(500),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let user_id: string | null = null;
    let username = "guest";
    if (data.token) {
      const { verifySession } = await import("./session.server");
      const sess = await verifySession(data.token);
      if (sess && sess.role === "user") {
        const { data: owner } = await supabaseAdmin.from("app_users").select("username").eq("id", sess.sub).maybeSingle();
        if (owner) { user_id = sess.sub; username = owner.username; }
      }
    }
    const { error } = await supabaseAdmin
      .from("feedbacks")
      .insert({ user_id, username, rating: data.rating, comment: data.comment.trim() });
    if (error) throw new Error("Could not save feedback");
    return { ok: true };
  });

export const listFeedbacks = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ adminToken: z.string().max(2000) }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./session.server");
    await requireAdmin(data.adminToken);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("feedbacks")
      .select("id, username, rating, comment, created_at")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) throw new Error("Could not load feedback");
    return { rows: rows ?? [] };
  });
