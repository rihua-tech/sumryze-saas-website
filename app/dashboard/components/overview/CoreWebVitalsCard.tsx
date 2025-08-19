"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Info } from "lucide-react";
import { useUrlContext } from "@/app/context/UrlContext";
import CoreWebVitalsChart from "./CoreWebVitalsChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ------------------------------ Types ------------------------------ */
export type CoreVital = {
  name: "LCP" | "INP" | "CLS" | string;
  value: number;          // raw metric (s or ms for LCP/INP, unitless for CLS)
  target: number;         // “good” threshold goal
  unit: string;           // "s" | "ms" | ""
  thresholds?: number[];  // [good, needs-improvement] cut points (low is better)
  color?: string;         // optional accent color
};
type ApiResponse = { vitals?: CoreVital[]; isMock?: boolean };

/* ------------------------------ Knobs ------------------------------ */
const SOFT_TIMEOUT_MS = 800;
const HARD_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 10 * 60 * 1000;
const cacheKey = (k: string) => `kwcache:cwv:${k}`;

/* ------------------------- Demo data (seeded) ---------------------- */
function hash32(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeDemoVitals(key: string): CoreVital[] {
  const r = mulberry32(hash32(`cwv|${key}`));
  const lcp = +(1.8 + r() * 1.2).toFixed(1);             // 1.8–3.0 s
  const inp = Math.round(110 + r() * 180);               // 110–290 ms
  const cls = +(0.02 + r() * 0.09).toFixed(2);           // 0.02–0.11
  return [
    { name: "LCP", value: lcp, target: 2.5, unit: "s", thresholds: [2.5, 4.0], color: "#10b981" },
    { name: "INP", value: inp, target: 200, unit: "ms", thresholds: [200, 500], color: "#3b82f6" },
    { name: "CLS", value: cls, target: 0.10, unit: "", thresholds: [0.10, 0.25], color: "#f59e0b" },
  ];
}

/* ------------------------------ Cache ------------------------------ */
type Stored = { data: Required<ApiResponse>; ts: number };
function readCache(key: string): Stored | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(key));
    if (!raw) return null;
    const obj = JSON.parse(raw) as Stored;
    if (!obj?.data) return null;
    if (Date.now() - obj.ts > CACHE_TTL_MS) return null;
    return obj;
  } catch {
    return null;
  }
}
function writeCache(key: string, data: Required<ApiResponse>) {
  try {
    sessionStorage.setItem(cacheKey(key), JSON.stringify({ data, ts: Date.now() } as Stored));
  } catch {}
}

/* ------------------------------ Component -------------------------- */
export default function CoreWebVitalsCard() {
  const { url: ctxUrl } = useUrlContext();
  const url = (ctxUrl || "").trim();
  const mode: "demo" | "live" = url ? "live" : "demo";
  const key = url || "demo://blank";

  const [data, setData] = useState<Required<ApiResponse> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep layout stable while charts load
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const lastCheckedRef = useRef<Date | null>(null);

  const isSample = mode === "demo" || Boolean(data?.isMock);

  // Only load when visible
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Data load (mirrors Keyword/Content pattern)
  useEffect(() => {
    if (!inView) return;

    const cached = readCache(key);
    if (cached) setData(cached.data);

    if (mode === "demo") {
      const sample = { vitals: makeDemoVitals(key), isMock: true } as Required<ApiResponse>;
      setError(null);
      setLoading(false);
      setData(sample);
      writeCache(key, sample);
      return;
    }

    setLoading(true);
    setError(null);

    const ac = new AbortController();
    let softTimer: any = null;
    let hardTimer: any = null;

    if (!cached) {
      softTimer = setTimeout(() => {
        const sample = { vitals: makeDemoVitals(key), isMock: true } as Required<ApiResponse>;
        setData(sample);
      }, SOFT_TIMEOUT_MS);
    }
    hardTimer = setTimeout(() => ac.abort(), HARD_TIMEOUT_MS);

    (async () => {
      try {
        const res = await fetch(`/api/web-vitals?url=${encodeURIComponent(url)}`, {
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        const json: ApiResponse = await res.json();
        if (!res.ok || !Array.isArray(json?.vitals)) {
          throw new Error((json as any)?.error || `HTTP ${res.status}`);
        }

        clearTimeout(softTimer);
        clearTimeout(hardTimer);

        const merged: Required<ApiResponse> = {
          vitals: json.vitals!,
          isMock: !!json.isMock,
        };
        setData(merged);
        writeCache(key, merged);
        lastCheckedRef.current = new Date();
      } catch (e: any) {
        if (e.name !== "AbortError") {
          const sample = { vitals: makeDemoVitals(key), isMock: true } as Required<ApiResponse>;
          setError(null);
          setData(sample);
          writeCache(key, sample);
        }
      } finally {
        clearTimeout(softTimer);
        clearTimeout(hardTimer);
        setLoading(false);
      }
    })();

    return () => {
      clearTimeout(softTimer);
      clearTimeout(hardTimer);
      ac.abort();
    };
  }, [inView, mode, key, url]);

  // Skeleton tiles with fixed height so nothing jumps
  const Skeleton = useMemo(
    () => (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-muted/40 animate-pulse"
            style={{ minHeight: 170 }}
          />
        ))}
      </div>
    ),
    []
  );

  return (
    <TooltipProvider delayDuration={120}>
      <div
        ref={cardRef}
        className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm"
        aria-busy={loading || undefined}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Core Web Vitals
            </h3>

            {isSample && (
                     <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex items-center justify-center rounded-full p-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="About Core Web Vitals"
                >
                  <Info size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[280px]">
                <p className="text-xs leading-snug">
                  LCP (largest paint), <b>INP</b> (interaction latency), and CLS (layout shift).
                  Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Lower is better.
                </p>
              </TooltipContent>
            </Tooltip>


            )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide border bg-slate-100 text-slate-700 border-slate-300/80 dark:bg-white/10 dark:text-slate-300 dark:border-white/15"
                    aria-label="Sample data"
                  >
                    Sample
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[260px]">
                  <p className="text-xs leading-snug">
                    Showing sample data. Paste a URL to analyze your real page.
                  </p>
                </TooltipContent>
              </Tooltip>
            
          </div>

          {lastCheckedRef.current && (
            <span className="text-[10px] text-muted-foreground italic mt-1">
              Checked: {lastCheckedRef.current.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="relative h-56 sm:h-56">
        {(!data && loading) ? Skeleton : error ? (
          <div className="rounded-md border border-rose-300/30 bg-rose-50/60 dark:bg-rose-950/10 p-3 text-sm text-rose-600 dark:text-rose-300">
            {error}
          </div>
        ) : (
          <div className="min-h-[170px]">
            <CoreWebVitalsChart vitals={data?.vitals || []} />
          </div>
        )}
      </div>
      </div>
    </TooltipProvider>
    
  );
}
