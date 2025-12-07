// lib/services/webVitals.ts
import { normalizeUrl } from "@/lib/normalizeUrl";

/* ----------------------------- Types ----------------------------- */
export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;          // LCP in seconds, INP in ms, CLS unitless
  target: number;         // “good” goal
  unit: string;           // "s" | "ms" | ""
  thresholds?: number[];  // [good, needs-improvement] (lower is better)
  color?: string;         // optional accent color for the ring
};

export type WebVitalsResult = { vitals: CoreVital[] };

/* ------------------------------ Knobs ---------------------------- */
const API_TIMEOUT_MS = toInt(process.env.WEB_VITALS_API_TIMEOUT_MS, 12_000);

const DEFAULT_COLORS = {
  LCP: "#10b981", // emerald
  INP: "#3b82f6", // blue
  CLS: "#f59e0b", // amber
};

const resolvePageSpeedApiKey = () => (process.env.PAGE_SPEED_API_KEY?.trim() || undefined);

/* ----------------------------- Utilities ------------------------- */
function toInt(s: string | undefined, def: number) {
  const n = Number(s);
  return Number.isFinite(n) ? n : def;
}

function withTimeout(input: string, ms = API_TIMEOUT_MS) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return {
    async fetch(init?: RequestInit) {
      try {
        return await fetch(input, { ...init, signal: ac.signal, cache: "no-store" });
      } finally {
        clearTimeout(t);
      }
    },
  };
}

function toExternalHttpUrl(raw: string | null): string {
  const s = (raw || "").trim();
  if (!s) return "";
  try {
    const withProto = /^https?:\/\//i.test(s) ? s : `http://${s}`;
    const u = new URL(withProto);
    if (!/^https?:$/i.test(u.protocol)) return "";
    const host = u.hostname.replace(/^www\./i, "");
    // block private/local hosts
    if (
      /^localhost$|^127\.0\.0\.1$|\.local$|^0\.0\.0\.0$/i.test(host) ||
      !host.includes(".")
    ) {
      return "";
    }
    return u.toString();
  } catch {
    return "";
  }
}

function normalizeCls(p75: number | undefined | null) {
  if (p75 == null) return undefined;
  return p75 > 1 ? p75 / 100 : p75; // some payloads historically reported CLS*100
}

function buildVitals(lcpSeconds?: number, inpMs?: number, cls?: number): CoreVital[] {
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

/* ------------------------ PageSpeed (CrUX) ------------------------ */
export async function fetchVitalsFromPSI(
  normalizedUrl: string,
  apiKey: string | undefined = resolvePageSpeedApiKey(),
  strategy: "mobile" | "desktop" = "mobile"
): Promise<CoreVital[]> {
  const endpoint =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed" +
    `?url=${encodeURIComponent(normalizedUrl)}` +
    `&category=PERFORMANCE&strategy=${strategy}` +
    (apiKey ? `&key=${encodeURIComponent(apiKey)}` : "");

  const res = await withTimeout(endpoint, API_TIMEOUT_MS).fetch({
    headers: { accept: "application/json" },
  });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("PageSpeed API key missing or invalid (403)");
    }
    if (res.status === 429) {
      throw new Error("PageSpeed API quota exceeded (429)");
    }
    // 204 == no field data; 5xx = transient
    throw new Error(`PSI HTTP ${res.status}`);
  }

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

/* --------------------------- Main entry --------------------------- */
export async function getWebVitals(
  rawUrl: string | null,
  opts?: { apiKey?: string; strategy?: "mobile" | "desktop" }
): Promise<WebVitalsResult> {
  if (!rawUrl) throw new Error("Missing URL");
  const external = toExternalHttpUrl(rawUrl);
  if (!external) throw new Error("Invalid URL");

  const normalized: string = normalizeUrl(external) ?? "";
  const vitals = await fetchVitalsFromPSI(normalized, opts?.apiKey, opts?.strategy ?? "mobile");
  return { vitals };
}
