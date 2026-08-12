import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_PW = "12345678";

const ResultSchema = z.object({
  qid: z.string().min(1).max(64),
  correct: z.boolean(),
  timeMs: z.number().int().min(0).max(1000 * 60 * 60),
});

const SubmissionSchema = z.object({
  dataId: z.string().min(1).max(32),
  userId: z.string().min(1).max(64),
  grade: z.enum(["K3", "P1", "P2", "P3", "P4", "P5", "P6"]),
  dyslexia: z.boolean().nullable(),
  timestamp: z.number().int().min(0),
  results: z.array(ResultSchema).min(1).max(200),
});

type SubmissionInput = z.infer<typeof SubmissionSchema>;

const toRow = (s: SubmissionInput) => ({
  data_id: s.dataId,
  user_id: s.userId,
  grade: s.grade,
  dyslexia: s.dyslexia,
  results: s.results,
  client_timestamp: s.timestamp,
});

/** Anonymous research submissions are written server-side only. */
export const insertSubmissions = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ submissions: z.array(SubmissionSchema).min(1).max(500) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("submissions").insert(data.submissions.map(toRow));
    if (error) throw new Error("Could not save submission");
    return { inserted: data.submissions.length };
  });

/** Reading the research dataset requires the admin password. */
export const listSubmissions = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ adminPassword: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (data.adminPassword !== ADMIN_PW) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("submissions")
      .select("data_id,user_id,grade,dyslexia,results,client_timestamp")
      .order("client_timestamp", { ascending: false })
      .limit(2000);
    if (error) throw new Error("Could not load submissions");
    return { rows: rows ?? [] };
  });
