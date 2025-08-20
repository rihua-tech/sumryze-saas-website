// lib/services/seo.ts

/** PSI endpoint + defaults */
const PAGESPEED_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const API_TIMEOUT_MS = 10_000;

export type Device = "mobile" | "desktop";

/** fetch with a hard timeout + (optional) external AbortSignal */
async function fetchWithTimeout(
  input: string,
  init: RequestInit = {},
  ms = API_TIMEOUT_MS,
  extSignal?: AbortSignal
) {
  const ac = new AbortController();

  // tie the external signal (if any) to our controller
  const onAbort = () => ac.abort();
  if (extSignal) {
    if (extSignal.aborted) ac.abort();
    else extSignal.addEventListener("abort", onAbort, { once: true });
  }

  const timer = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: ac.signal, cache: "no-store" });
  } finally {
    clearTimeout(timer);
    if (extSignal) extSignal.removeEventListener("abort", onAbort);
  }
}

/**
 * Calls PageSpeed Insights and returns Lighthouse SEO (0–100), or `null` on failure.
 * - Accepts optional API key via `PAGESPEED_API_KEY` (or legacy `PSI_API_KEY`)
 * - Supports `device` strategy: "mobile" | "desktop"
 * - Never throws: route layer decides how to fall back.
 */
export async function getSeoScorePSI(
  url: string,
  device: Device = "mobile",
  signal?: AbortSignal
): Promise<number | null> {
  try {
    // Either env var works (PAGESPEED_API_KEY preferred)
    const key = (process.env.PAGESPEED_API_KEY || process.env.PSI_API_KEY || "").trim();

    const qs = new URLSearchParams({
      url,
      category: "SEO",
      strategy: device === "desktop" ? "desktop" : "mobile",
    });
    if (key) qs.set("key", key); // PSI also works without a key (lower quota)

    const apiUrl = `${PAGESPEED_ENDPOINT}?${qs.toString()}`;
    const res = await fetchWithTimeout(
      apiUrl,
      { headers: { accept: "application/json" } },
      API_TIMEOUT_MS,
      signal
    );
    if (!res.ok) return null;

    const json = await res.json();
    // PSI gives 0..1; convert to 0..100 and clamp
    const score01 = Number(json?.lighthouseResult?.categories?.seo?.score);
    if (!Number.isFinite(score01)) return null;

    const clamped01 = Math.max(0, Math.min(1, score01));
    return Math.round(clamped01 * 100);
  } catch {
    return null;
  }
}

/**
 * Back-compat wrapper with the old return shape.
 * If PSI fails, returns a conservative fallback of 80 (same as your old code).
 */
export async function getSeoScore(
  url: string,
  device: Device = "mobile",
  signal?: AbortSignal
): Promise<{ value: number; delta?: string; down?: boolean }> {
  const score = await getSeoScorePSI(url, device, signal);
  if (score == null) {
    return { value: 80, delta: undefined, down: false };
  }
  return { value: score, delta: undefined, down: false };
}
