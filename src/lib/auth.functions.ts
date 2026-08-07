import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RESERVED = ["admin", "test1"];
const ADMIN_ID = "admin";
const ADMIN_PW = "12345678";

const Credentials = z.object({
  username: z.string().trim().min(3).max(20),
  password: z.string().min(6).max(72),
});

export type RevisionItem = {
  prompt: string;
  answer: string;
  topic: string;
  ts: number;
};

export type ProgressSnapshot = {
  grade: string | null;
  onboarded: boolean;
  towers: Record<string, number>;
  revision: Record<string, Record<string, RevisionItem[]>>;
  wallet: Record<string, unknown>;
  settings: Record<string, string | number | boolean>;
};


async function hash(password: string, salt: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  return btoa(String.fromCharCode(...new Uint8Array(bits)));
}

function randomSalt() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b));
}

export const signUpUser = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Credentials.parse(d))
  .handler(async ({ data }) => {
    const name = data.username.trim();
    if (RESERVED.includes(name.toLowerCase())) {
      return { ok: false as const, error: "That name is reserved. Please pick another." };
    }
    if (!/^[A-Za-z0-9_ -]{3,20}$/.test(name)) {
      return { ok: false as const, error: "Use 3–20 letters, numbers, spaces, - or _." };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("app_users")
      .select("id")
      .eq("username_lower", name.toLowerCase())
      .maybeSingle();
    if (existing) return { ok: false as const, error: "That username is already taken." };

    const salt = randomSalt();
    const password_hash = await hash(data.password, salt);
    const { data: created, error } = await supabaseAdmin
      .from("app_users")
      .insert({ username: name, password_hash, password_salt: salt })
      .select("id, username")
      .single();
    if (error || !created) return { ok: false as const, error: "Could not create account." };

    await supabaseAdmin.from("progress").insert({ user_id: created.id, username: created.username });
    return { ok: true as const, userId: created.id, username: created.username };
  });

export const logInUser = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ username: z.string().trim().min(1), password: z.string().min(1) }).parse(d),
  )
  .handler(async ({ data }) => {
    const name = data.username.trim();
    if (name.toLowerCase() === ADMIN_ID && data.password === ADMIN_PW) {
      return { ok: true as const, isAdmin: true, userId: "admin", username: "admin", progress: null };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: user } = await supabaseAdmin
      .from("app_users")
      .select("id, username, password_hash, password_salt")
      .eq("username_lower", name.toLowerCase())
      .maybeSingle();
    if (!user) return { ok: false as const, error: "No account with that name." };
    const computed = await hash(data.password, user.password_salt);
    if (computed !== user.password_hash) return { ok: false as const, error: "Wrong password." };

    const { data: prog } = await supabaseAdmin
      .from("progress")
      .select("grade, onboarded, towers, revision_bank, wallet, settings")
      .eq("user_id", user.id)
      .maybeSingle();

    return {
      ok: true as const,
      isAdmin: false,
      userId: user.id,
      username: user.username,
      progress: prog
        ? ({
            grade: prog.grade,
            onboarded: prog.onboarded,
            towers: (prog.towers ?? {}) as Record<string, number>,
            revision: (prog.revision_bank ?? {}) as ProgressSnapshot["revision"],
            wallet: (prog.wallet ?? {}) as Record<string, unknown>,
            settings: (prog.settings ?? {}) as Record<string, string | number | boolean>,
          } satisfies ProgressSnapshot)
        : null,
    };
  });

export const saveProgress = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z
      .object({
        userId: z.string().uuid(),
        username: z.string(),
        grade: z.string().nullable().optional(),
        onboarded: z.boolean().optional(),
        towers: z.record(z.string(), z.number()),
        revision: z.record(
          z.string(),
          z.record(
            z.string(),
            z.array(
              z.object({
                prompt: z.string(),
                answer: z.string(),
                topic: z.string(),
                ts: z.number(),
              }),
            ),
          ),
        ),
        wallet: z.record(z.string(), z.unknown()).optional(),
        settings: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("progress").upsert(
      {
        user_id: data.userId,
        username: data.username,
        grade: data.grade ?? null,
        onboarded: data.onboarded ?? false,
        towers: data.towers,
        revision_bank: data.revision,
        wallet: data.wallet ?? {},
        settings: data.settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
    if (error) throw error;
    return { ok: true as const };
  });

export const listProgress = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ adminPassword: z.string() }).parse(d))
  .handler(async ({ data }) => {
    if (data.adminPassword !== ADMIN_PW) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("progress")
      .select("user_id, username, grade, onboarded, towers, revision_bank, wallet, settings, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return { rows: rows ?? [] };
  });
