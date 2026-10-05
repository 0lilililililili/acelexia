// Server-only signed session tokens (HMAC-SHA256). Issued at login/sign-up,
// required by every server function that writes user data or reads admin data.
type Payload = { sub: string; role: "user" | "admin"; exp: number };

const enc = new TextEncoder();

function b64url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64url(s: string) {
  const b = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

async function key() {
  const secret = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!secret) throw new Error("Server misconfigured");
  const material = await crypto.subtle.digest("SHA-256", enc.encode(`acelexia-session:${secret}`));
  return crypto.subtle.importKey("raw", material, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signSession(sub: string, role: Payload["role"], ttlSeconds: number) {
  const payload: Payload = { sub, role, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(), enc.encode(body)));
  return `${body}.${b64url(sig)}`;
}

export async function verifySession(token: string | undefined | null): Promise<Payload | null> {
  if (!token || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(fromB64url(body))) as Payload;
    if (!p.sub || (p.role !== "user" && p.role !== "admin") || p.exp < Date.now() / 1000) return null;
    return p;
  } catch {
    return null;
  }
}

export async function requireAdmin(token: string) {
  const p = await verifySession(token);
  if (!p || p.role !== "admin") throw new Error("Forbidden");
}
