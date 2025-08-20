"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Info } from "lucide-react";
import { useUrlContext } from "@/app/context/UrlContext";
import CoreWebVitalsChart, { type CoreVital } from "./CoreWebVitalsChart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ------------------------------ API shapes ------------------------------ */
type ApiResponse = {
  vitals?: CoreVital[];
  prevVitals?: CoreVital[];
  isMock?: boolean;
};



/* ------------------------------ Knobs ------------------------------ */
const HARD_TIMEOUT_MS = 8_000;
const CACHE_TTL_MS = Number(process.env.NEXT_PUBLIC_CWV_CACHE_TTL_MS ?? 10 * 60 * 1000);
const CACHE_VERSION = 2; // ⬅️ bump when mock logic changes
const cacheKey = (k: string) => `kwcache:cwv:v${CACHE_VERSION}:${k}`;


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
  const lcp = +(1.8 + r() * 0.6).toFixed(1);
  const inp = Math.round(110 + r() * 180);
  const cls = +(0.02 + r() * 0.09).toFixed(2);
  return [
    { name: "LCP", value: lcp, target: 2.5, unit: "s", thresholds: [2.5, 4.0] },
    { name: "INP", value: inp, target: 200, unit: "ms", thresholds: [200, 500] },
    { name: "CLS", value: cls, target: 0.1, unit: "", thresholds: [0.1, 0.25] },
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

/* ------------------------- Color/status helpers -------------------- */
type Status = "good" | "ni" | "poor";
const STATUS_COLOR: Record<Status, string> = {
  good: "#10b981",
  ni: "#f59e0b",
  poor: "#ef4444",
};
function statusFrom(v: CoreVital): Status {
  const [good, ni] = v.thresholds ?? [];
  if (v.name === "CLS") return v.value <= (good ?? 0.1) ? "good" : v.value <= (ni ?? 0.25) ? "ni" : "poor";
  return v.value <= (good ?? v.target) ? "good" : v.value <= (ni ?? v.target * 1.6) ? "ni" : "poor";
}
function enrichVitals(vitals: CoreVital[]): CoreVital[] {
  return vitals.map((v) => ({ ...v, color: STATUS_COLOR[statusFrom(v)] }));
}

/* ------------------------------ Component -------------------------- */
export default function CoreWebVitalsCard() {
  const { url: ctxUrl } = useUrlContext();
  const url = (ctxUrl || "").trim();
  const mode: "demo" | "live" = url ? "live" : "demo";
  const key = url || "demo://blank";

  // ✅ 1) Seed with cached or demo data immediately (no empty state)
  const seeded = useMemo<Required<ApiResponse>>(() => {
    const cached = readCache(key);
    if (cached) return cached.data;
    return { vitals: makeDemoVitals(key), prevVitals: [], isMock: true };
  }, [key]);

  const [data, setData] = useState<Required<ApiResponse>>(seeded);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Visibility gate (we can still show seeded data before visible)
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
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

  // ✅ 2) Background refresh (no flicker, keep previous data visible)
  useEffect(() => {
    if (!inView || mode === "demo") return;

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), HARD_TIMEOUT_MS);

    (async () => {
      try {
        setIsRefreshing(true);
        setError(null);

        const res = await fetch(`/api/web-vitals?url=${encodeURIComponent(url)}`, {
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        const json: ApiResponse = await res.json();

        if (!res.ok || !Array.isArray(json?.vitals)) {
          throw new Error((json as any)?.error || `HTTP ${res.status}`);
        }

        const merged: Required<ApiResponse> = {
          vitals: json.vitals!,
          prevVitals: Array.isArray(json.prevVitals) ? json.prevVitals : [],
          isMock: !!json.isMock,
        };
        setData(merged);
        writeCache(key, merged);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          // Keep current data; just report error subtly
          setError("Couldn’t refresh. Showing last values.");
        }
      } finally {
        clearTimeout(timer);
        setIsRefreshing(false);
      }
    })();

    return () => {
      clearTimeout(timer);
      ac.abort();
    };
  }, [inView, mode, url, key]);

  const vitalsEnriched: CoreVital[] = useMemo(() => enrichVitals(data.vitals || []), [data]);
  const isSample = mode === "demo" || data.isMock;
  const sourceLabel = isSample ? "Demo data" : "Field data (CrUX) • last 28 days • p75";

  return (
    <TooltipProvider delayDuration={120}>
      <div
        ref={cardRef}
        className="rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-white dark:bg-[#0f1423] p-5 sm:p-6 shadow-sm"
        aria-busy={isRefreshing || undefined}
        aria-label={`Core Web Vitals card — ${sourceLabel}`}
      >
        {/* Header */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
              Core Web Vitals
            </h3>

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
                  LCP (largest contentful paint), <b>INP</b> (interaction latency), and CLS (layout shift).
                  Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (p75 over last 28 days).
                </p>
              </TooltipContent>
            </Tooltip>

            {isSample && (
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
                  <p className="text-xs leading-snug">Showing sample data. Paste a URL to analyze your real page.</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          
        </div>

        {/* Body — always render chart; min-height prevents layout shift */}
        <div className="min-h-[220px]">
          <CoreWebVitalsChart vitals={vitalsEnriched} />
        </div>

        {error && (
          <div className="mt-3 text-xs text-amber-400">
            {error}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
