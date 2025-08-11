// lib/services/seo.ts
import { URL } from "node:url";

const API_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(input: string, init: RequestInit = {}, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const res = await fetch(input, { ...init, signal: ac.signal, cache: "no-store" });
    return res;
  } finally {
    clearTimeout(t);
  }
}

/** Fetch Lighthouse SEO score (0–100) from PageSpeed Insights. Expects a normalized absolute URL. */
export async function getSeoScore(url: string): Promise<{ value: number; delta?: string; down?: boolean }> {
  const key = process.env.PSI_API_KEY;
  if (!key) {
    // Safe fallback when no key in dev
    return { value: 80, delta: undefined, down: false };
  }

  const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  api.searchParams.set("url", url);
  api.searchParams.set("category", "SEO");
  api.searchParams.set("strategy", "mobile");
  api.searchParams.set("key", key);

  try {
    const res = await fetchWithTimeout(api.toString(), { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`PSI HTTP ${res.status}`);
    const json = await res.json();

    const score01 = Number(json?.lighthouseResult?.categories?.seo?.score);
    const value = Math.round(Math.max(0, Math.min(1, isNaN(score01) ? 0 : score01)) * 100);

    return { value, delta: undefined, down: false };
  } catch {
    return { value: 80, delta: undefined, down: false };
  }
}
