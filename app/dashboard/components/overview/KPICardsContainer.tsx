// components/overview/KPICardsContainer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import SEOScoreCard from "./KPI/SEOScoreCard";
import TopPagesCard from "./KPI/TopPagesCard";
import { useUrlContext } from "@/app/context/UrlContext";
import { z } from "zod";

/* ---------- Zod schemas ---------- */

// Coerce strings like "85", "1,234", " 90 "
const ZNumeric = z.preprocess((v) => {
  if (typeof v === "string") return Number(v.replace(/[^0-9.+-]/g, ""));
  return v;
}, z.number());

// Allow API to optionally send a demo flag
const KPISchema = z.object({
  title: z.string(),
  value: ZNumeric,                    // number after parse
  delta: z.string().optional(),
  down: z.boolean().optional(),
  series: z.array(ZNumeric).optional(),
  demo: z.boolean().optional(),       // <— optional demo flag from API
});

const KPIArraySchema = z.array(KPISchema);

/* ---------- Types ---------- */
type KPI = z.infer<typeof KPISchema>;

const TITLES = { SEO: "SEO Score", PAGES: "Top Pages" } as const;

const INITIAL: Record<string, KPI> = {
  [TITLES.SEO]:   { title: TITLES.SEO,   value: 0, delta: "+0", down: false },
  [TITLES.PAGES]: { title: TITLES.PAGES, value: 0, delta: "+0", down: false, series: [0, 0] },
};

const API_TIMEOUT_MS = 10_000;
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
    return await fetch(url, { ...opts, signal: ac.signal });
  } finally {
    clearTimeout(t);
    signal?.removeEventListener("abort", onAbort);
  }
}

async function fetchKPIs(urlParam: string, outerSignal: AbortSignal) {
  const endpoint = `/api/kpis?url=${encodeURIComponent(urlParam)}`;
  const opts: RequestInit = { headers: { accept: "application/json" }, cache: "no-store" };

  let attempt = 0;
  // retry once for transient hiccups
  while (true) {
    try {
      const res = await fetchWithTimeout(endpoint, opts, API_TIMEOUT_MS, outerSignal);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const parsed = KPIArraySchema.parse(json);   // throws if shape wrong
      return parsed;
    } catch (err) {
      if (outerSignal.aborted) throw err;
      if (attempt++ >= MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 100 + Math.random() * 200)); // jitter
    }
  }
}

function readLastUrl(): string | null {
  try {
    return localStorage.getItem(LAST_URL_KEY);
  } catch {
    return null;
  }
}
function saveLastUrl(u: string) {
  try {
    localStorage.setItem(LAST_URL_KEY, u);
  } catch {}
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
    // Choose the target URL:
    // 1) if user typed one, use it (and persist for next visit)
    // 2) else try lastUrl from localStorage
    // 3) else use demo
    const trimmed = url?.trim() || "";
    const last = !trimmed ? readLastUrl() : null;
    const target = trimmed || last || "demo://blank";

    if (trimmed) saveLastUrl(trimmed);

    const thisReq = ++reqIdRef.current;
    const ac = new AbortController();

    setLoaded(false);
    setError(null);
    setIsSample(target.startsWith("demo://")); // initial guess; will refine after fetch

    (async () => {
      try {
        const list = await fetchKPIs(target, ac.signal);
        if (thisReq !== reqIdRef.current) return; // stale response

        // If API includes a demo flag on any KPI, respect it.
        const sampleFromPayload = list.some((k) => k.demo === true);
        setIsSample(sampleFromPayload || target.startsWith("demo://"));

        setData((prev) => ({ ...prev, ...mapByTitle(list) }));
      } catch (e: any) {
        if (e?.name !== "AbortError" && thisReq === reqIdRef.current) {
          console.error("[KPIs] fetch error:", e);
          setError(e?.message || "Failed to load KPIs");
          setData(INITIAL);
          setIsSample(true); // show sample badge if we fell back to initial placeholders
        }
      } finally {
        if (thisReq === reqIdRef.current) setLoaded(true);
      }
    })();

    return () => ac.abort();
  }, [url]);

  const seo = data[TITLES.SEO];
  const pages = data[TITLES.PAGES];

  const seoReady = loaded && Number.isFinite(seo?.value) && (seo.value as number) >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SEOScoreCard
        key={seoReady ? `seo-${seo.value}` : "seo-loading"}
        value={seoReady ? (seo.value as number) : 0}
        delta={seoReady ? seo?.delta : undefined}
        down={seoReady ? seo?.down : undefined}
        note={error ? "temporary issue, showing last data" : "vs last week"}
        loading={!seoReady}
        isSample={isSample}                // <— add this optional prop in SEOScoreCard
      />

      <TopPagesCard
        key={`pages-${pages.value}`}
        value={loaded ? (pages.value as number) : 0}
        delta={loaded ? pages?.delta : undefined}
        down={loaded ? pages?.down : undefined}
        series={loaded ? pages?.series : undefined}
        isSample={isSample}                // <— add this optional prop in TopPagesCard
      />
    </div>
  );
}
