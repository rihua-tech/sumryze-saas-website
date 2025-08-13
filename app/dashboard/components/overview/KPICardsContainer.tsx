// components/overview/KPICardsContainer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import SEOScoreCard from "./KPI/SEOScoreCard";
import TopPagesCard from "./KPI/TopPagesCard";
import { useUrlContext } from "@/app/context/UrlContext";
import { z } from "zod";

/* ---------- Zod schemas ---------- */
const ZNumeric = z.preprocess((v) => {
  if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
  return v;
}, z.number());

const KPISchema = z.object({
  title: z.string(),
  value: ZNumeric,
  delta: z.string().optional(),
  down: z.boolean().optional(),
  series: z.array(ZNumeric).optional(),
  demo: z.boolean().optional(),
});
type KPI = z.infer<typeof KPISchema>;
const KPIArraySchema = z.array(KPISchema);

/* ---------- Consts ---------- */
const TITLES = { SEO: "SEO Score", PAGES: "Top Pages" } as const;

const INITIAL: Record<string, KPI> = {
  [TITLES.SEO]:   { title: TITLES.SEO,   value: 0, delta: "+0", down: false },
  [TITLES.PAGES]: { title: TITLES.PAGES, value: 0, delta: "+0", down: false, series: [0, 0] },
};

const HARD_TIMEOUT_MS = 10_000;       // abort request if it drags on too long
const SOFT_TIMEOUT_MS = 1_200;        // show demo quickly, keep fetching in background
const MAX_RETRIES = 1;
const LAST_URL_KEY = "sumryze:lastUrl";

/* ---------- helpers ---------- */
function mapByTitle(list: KPI[]): Record<string, KPI> {
  return list.reduce<Record<string, KPI>>((acc, k) => {
    acc[k.title] = k;
    return acc;
  }, {});
}

async function fetchWithTimeout(url: string, opts: RequestInit, ms: number, signal?: AbortSignal) {
  const ac = new AbortController();
  const onAbort = () => ac.abort();
  signal?.addEventListener("abort", onAbort, { once: true });
  const t = setTimeout(() => ac.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ac.signal, cache: "no-store", headers: { accept: "application/json" } });
  } finally {
    clearTimeout(t);
    signal?.removeEventListener("abort", onAbort);
  }
}

async function fetchKPIs(urlParam: string, outerSignal: AbortSignal) {
  const endpoint = `/api/kpis?url=${encodeURIComponent(urlParam)}`;
  let attempt = 0;
  while (true) {
    try {
      const res = await fetchWithTimeout(endpoint, {}, HARD_TIMEOUT_MS, outerSignal);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return KPIArraySchema.parse(json);
    } catch (err) {
      if (outerSignal.aborted) throw err;
      if (attempt++ >= MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 120 + Math.random() * 200));
    }
  }
}

function readLastUrl(): string | null {
  try { return localStorage.getItem(LAST_URL_KEY); } catch { return null; }
}
function saveLastUrl(u: string) {
  try { localStorage.setItem(LAST_URL_KEY, u); } catch {}
}

/* ---------- deterministic client-side demo (matches server shape) ---------- */
function hash(s: string) {
  let h = 2166136261; for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}
function rng(seed: number) { let x = seed || 123456789; return () => (x ^= x << 13, x ^= x >>> 17, x ^= x << 5, (x >>> 0) / 0xffffffff); }
function jitterSeries(endValue: number, len = 7, seed = 1, step = 2) {
  const r = rng(seed); const out: number[] = new Array(len);
  let cur = Math.max(0, endValue - (len - 1));
  for (let i = 0; i < len; i++) { const jit = Math.round((r() * 2 - 1) * step); cur = Math.max(0, cur + jit); out[i] = cur; }
  out[len - 1] = endValue;
  return out;
}
function demoData(urlSeed: string): Record<string, KPI> {
  const seed = hash(urlSeed || "demo://blank");
  const seo = Math.max(0, Math.min(100, 80 + (seed % 6)));
  const pages = 8 + (seed % 18);
  const series = jitterSeries(pages, 7, seed, 2).map((n) => Math.max(0, Math.round(n)));
  const prev = series.at(-2) ?? pages;
  const diff = pages - prev;
  return {
    [TITLES.SEO]:   { title: TITLES.SEO,   value: seo,   delta: "+0", down: false, demo: true },
    [TITLES.PAGES]: { title: TITLES.PAGES, value: pages, delta: (diff >= 0 ? "+" : "") + diff, down: diff < 0, series, demo: true },
  };
}

/* ---------- component ---------- */
export default function KPICardsContainer() {
  const { url } = useUrlContext();
  const [data, setData] = useState<Record<string, KPI>>(INITIAL);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSample, setIsSample] = useState<boolean>(false);
  const reqIdRef = useRef(0);

  useEffect(() => {
    const trimmed = url?.trim() || "";
    const last = !trimmed ? readLastUrl() : null;
    const target = trimmed || last || "demo://blank";
    if (trimmed) saveLastUrl(trimmed);

    const thisReq = ++reqIdRef.current;
    const ac = new AbortController();

    setLoaded(false);
    setError(null);
    setIsSample(target.startsWith("demo://"));

    // 1) Instant demo for explicit demo:// (no network)
    if (target.startsWith("demo://")) {
      setData(demoData(target));
      setLoaded(true);
      return () => ac.abort();
    }

    // 2) Soft timeout – render demo fast if API is slow/cold; keep fetching
    let softFired = false;
    const soft = setTimeout(() => {
      if (thisReq !== reqIdRef.current) return;
      softFired = true;
      setIsSample(true);
      setData(demoData(target));
      setLoaded(true); // let UI render now
    }, SOFT_TIMEOUT_MS);

    (async () => {
      try {
        const list = await fetchKPIs(target, ac.signal);
        if (thisReq !== reqIdRef.current) return;

        const sampleFromPayload = list.some((k) => k.demo === true);
        setIsSample(sampleFromPayload);

        setData((prev) => ({ ...prev, ...mapByTitle(list) }));
      } catch (e: any) {
        if (e?.name !== "AbortError" && thisReq === reqIdRef.current) {
          console.error("[KPIs] fetch error:", e);
          setError(e?.message || "Failed to load KPIs");
          // fall back to demo if we didn't already
          setIsSample(true);
          setData(demoData(target));
        }
      } finally {
        clearTimeout(soft);
        if (thisReq === reqIdRef.current) setLoaded(true);
      }
    })();

    return () => {
      clearTimeout(soft);
      ac.abort();
    };
  }, [url]);

  const seo = data[TITLES.SEO];
  const pages = data[TITLES.PAGES];

  const seoReady = loaded && Number.isFinite(seo?.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SEOScoreCard
        key={seoReady ? `seo-${seo.value}` : "seo-loading"}
        value={seoReady ? (seo.value as number) : 0}
        delta={seoReady ? seo?.delta : undefined}
        down={seoReady ? seo?.down : undefined}
        note={error ? "Temporary issue — showing sample" : "vs last week"}
        loading={!seoReady}
        isSample={isSample}
      />

      <TopPagesCard
        key={`pages-${pages.value}-${(pages.series?.length ?? 0)}`}
        value={loaded ? (pages.value as number) : 0}
        delta={loaded ? pages?.delta : undefined}
        down={loaded ? pages?.down : undefined}
        series={loaded ? pages?.series : undefined}
        loading={!loaded}
        isSample={isSample}
      />
    </div>
  );
}
