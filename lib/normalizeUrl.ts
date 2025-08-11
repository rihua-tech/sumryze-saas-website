// lib/normalizeUrl.ts  (isomorphic: safe on client + server)
export function normalizeUrl(raw: string): string | null {
  let s = (raw || "").trim();
  if (!s) return null;
  if (!/^https?:\/\//i.test(s)) s = "https://" + s; // allow example.com / www.example.com
  try {
    const u = new URL(s);
    u.hash = "";                                // ignore fragments
    // u.search = "";                           // ← uncomment if you want to drop query strings too
    u.pathname = u.pathname.replace(/\/+$/, ""); // drop trailing slash
    return u.toString();
  } catch {
    return null;
  }
}
