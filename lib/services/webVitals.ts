// lib/services/webVitals.ts
import { normalizeUrl } from "@/lib/normalizeUrl";

export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;          // LCP in seconds, INP in ms, CLS unitless
  target: number;         // “good” goal
  unit: string;           // "s" | "ms" | ""
  thresholds?: number[];  // [good, needs-improvement] (lower is better)
  color?: string;         // optional accent
};

export type WebVitalsResult = {
  vitals: CoreVital[];
  isMock: boolean;
};

const API_TIMEOUT_MS = 12_000;

const DEFAULT_COLORS = {
  LCP: "#10b981", // emerald
  INP: "#3b82f6", // blue
  CLS: "#f59e0b", // amber
};

function withTimeout(input: string, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return {
    fetch: (init?: RequestInit) =>
      fetch(input, { ...init, signal: ac.signal, cache: "no-store" }).finally(
        () => clearTimeout(t)
      ),
  };
}

function normalizeCls(p75: number | undefined | null) {
  if (p75 == null) return undefined;
  return p75 > 1 ? p75 / 100 : p75; // some responses return CLS*100
}

function buildVitals(
  lcpSeconds?: number,
  inpMs?: number,
  cls?: number
): CoreVital[] {
  const out: CoreVital[] = [];

  if (typeof lcpSeconds === "number" && isFinite(lcpSeconds)) {
    out.push({
      name: "LCP",
      value: +lcpSeconds.toFixed(1),
      target: 2.5,
      unit: "s",
      thresholds: [2.5, 4.0],
      color: DEFAULT_COLORS.LCP,
    });
  }
  if (typeof inpMs === "number" && isFinite(inpMs)) {
    out.push({
      name: "INP",
      value: Math.round(inpMs),
      target: 200,
      unit: "ms",
      thresholds: [200, 500],
      color: DEFAULT_COLORS.INP,
    });
  }
  if (typeof cls === "number" && isFinite(cls)) {
    out.push({
      name: "CLS",
      value: +cls.toFixed(2),
      target: 0.1,
      unit: "",
      thresholds: [0.1, 0.25],
      color: DEFAULT_COLORS.CLS,
    });
  }

  return out;
}

function mockVitals(): CoreVital[] {
  return [
    { name: "LCP", value: 1.9, target: 2.5, unit: "s", thresholds: [2.5, 4.0], color: DEFAULT_COLORS.LCP },
    { name: "INP", value: 190, target: 200, unit: "ms", thresholds: [200, 500], color: DEFAULT_COLORS.INP },
    { name: "CLS", value: 0.08, target: 0.1, unit: "", thresholds: [0.1, 0.25], color: DEFAULT_COLORS.CLS },
  ];
}

/**
 * Pull CrUX field data via PageSpeed Insights.
 * Prefer page-level loadingExperience, fallback to originLoadingExperience.
 */
export async function fetchVitalsFromPSI(
  normalizedUrl: string,
  apiKey?: string,
  strategy: "mobile" | "desktop" = "mobile"
): Promise<CoreVital[]> {
  const endpoint =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
    `?url=${encodeURIComponent(normalizedUrl)}` +
    `&category=PERFORMANCE&strategy=${strategy}` +
    (apiKey ? `&key=${encodeURIComponent(apiKey)}` : "");

  const res = await withTimeout(endpoint).fetch({
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`PSI HTTP ${res.status}`);

  const json = await res.json();

  const exp =
    json?.loadingExperience ??
    json?.originLoadingExperience ??
    json?.lighthouseResult?.loadingExperience ??
    null;

  const m = exp?.metrics ?? {};

  const lcpMs: number | undefined = m?.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
  const inpMs: number | undefined =
    m?.INTERACTION_TO_NEXT_PAINT?.percentile ??
    m?.EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT?.percentile;
  const clsRaw: number | undefined = m?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;

  const lcpSeconds = typeof lcpMs === "number" ? lcpMs / 1000 : undefined;
  const cls = normalizeCls(clsRaw);

  return buildVitals(lcpSeconds, inpMs, cls);
}

/** Main entry used by the API route. */
export async function getWebVitals(
  rawUrl: string | null,
  opts?: {
    forceMock?: boolean;
    apiKey?: string;
    strategy?: "mobile" | "desktop";
  }
): Promise<WebVitalsResult> {
  const forceMock = !!opts?.forceMock;
  const apiKey = opts?.apiKey;
  const strategy = opts?.strategy ?? "mobile";

  const normalized = rawUrl ? normalizeUrl(rawUrl) : null;

  if (!forceMock && normalized) {
    try {
      const vitals = await fetchVitalsFromPSI(normalized, apiKey, strategy);
      if (vitals.length) return { vitals, isMock: false };
    } catch (err) {
      console.warn("[webVitals] PSI fetch failed → fallback:", (err as Error)?.message || err);
    }
  }

  return { vitals: mockVitals(), isMock: true };
}
