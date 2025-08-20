"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import clsx from "clsx";
import SEOScoreChart from "./SEOScoreChart";
import { useUrlContext } from "@/app/context/UrlContext";

// at the top of SEOScoreCard.tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


/* ------------------------- Types ------------------------- */
type Status = "good" | "warn" | "bad";

type Props = {
  /** If provided, the card acts as a controlled/presentational card (no fetching). */
  value?: number;
  delta?: string;
  down?: boolean;
  note?: string;
  thresholds?: { good: number; warn: number };
  height?: string;
  footerMeta?: { label: string; value: string }[];
  /** When controlled, you can force loading UI. Ignored in auto mode. */
  loading?: boolean;
  /** When controlled, you can show the Sample pill manually. Ignored in auto mode. */
  isSample?: boolean;
  /** Optional: show footer divider + metadata. Defaults to false for a cleaner card. */
  showFooter?: boolean;
  /** Optional API path for auto mode. */
  apiPath?: string; // default: /api/seo-score
};

type AutoData = { value: number; delta?: string; down?: boolean };
type CacheVal = { data: AutoData; isMock: boolean; ts: number };

const KPI_CARD_HEIGHTS = "h-[190px] sm:h-[210px] md:h-[220px]";
const STORAGE_PREFIX = "kwcache:seoscore:";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const SOFT_TIMEOUT = 1200;
const HARD_TIMEOUT = 10000;

/* ------------------------- Utils ------------------------- */
function useMountedOnce() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

/** FNV-1a hash -> u32 */
function hash32(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
/** Mulberry32 PRNG */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Deterministic demo score + delta for a given key */
function makeDemoScore(key: string): AutoData {
  const r = mulberry32(hash32(`seo-score|${key}`));
  // Score 65–96, with slight bias upwards
  const base = 65 + Math.round(r() * 23) + (r() < 0.35 ? 6 : 0);
  // Delta -4 to +8, skew positive
  const dRaw = Math.round(-4 + r() * 12);
  const down = dRaw < 0;
  const delta = `${dRaw > 0 ? "+" : ""}${dRaw}`;
  return { value: Math.max(0, Math.min(100, base)), delta, down };
}

/** cache helpers */
const memCache = new Map<string, CacheVal>();
const cacheKey = (k: string) => `${STORAGE_PREFIX}${k}`;
function readSession(key: string): CacheVal | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(key));
    if (!raw) return null;
    const obj = JSON.parse(raw) as CacheVal;
    if (!obj?.data) return null;
    if (Date.now() - obj.ts > CACHE_TTL_MS) return null;
    return obj;
  } catch {
    return null;
  }
}
function writeSession(key: string, val: CacheVal) {
  try {
    sessionStorage.setItem(cacheKey(key), JSON.stringify(val));
  } catch {}
}

/* ------------------------- Component ------------------------- */
export default function SEOScoreCard({
  value,
  delta,
  down,
  note = "vs last week",
  thresholds = { good: 80, warn: 50 },
  height = KPI_CARD_HEIGHTS,
  footerMeta,
  loading = false,
  isSample = false,
  showFooter = false,
  apiPath = "/api/seo-score",
}: Props) {
  const mounted = useMountedOnce();
  const { url: ctxUrl } = useUrlContext();
  const url = (ctxUrl || "").trim();

  /** Controlled mode if `value` is provided. Otherwise auto mode. */
  const controlled = Number.isFinite(value);

  // Auto-mode state
  const [autoData, setAutoData] = useState<AutoData | null>(null);
  const [autoLoading, setAutoLoading] = useState<boolean>(false);
  const [autoIsMock, setAutoIsMock] = useState<boolean>(false);
  const reqIdRef = useRef(0);

  // Seed/key for caching & demo
  const autoKey = useMemo(() => `${url || "demo://blank"}|score`, [url]);

  useEffect(() => {
    if (controlled) {
      // Presentational mode: do nothing.
      return;
    }

    const thisReq = ++reqIdRef.current;
    const ac = new AbortController();

    // 1) No URL → instant demo (no network)
    if (!url) {
      const demo = makeDemoScore(autoKey);
      const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
      memCache.set(autoKey, pack);
      writeSession(autoKey, pack);
      setAutoData(demo);
      setAutoIsMock(true);
      setAutoLoading(false);
      return () => ac.abort();
    }

    // 2) Cache-first SWR
    const cached = memCache.get(autoKey) ?? readSession(autoKey);
    if (cached) {
      memCache.set(autoKey, cached);
      setAutoData(cached.data);
      setAutoIsMock(cached.isMock);
      setAutoLoading(false);
    } else {
      setAutoLoading(true);
    }

    // 2.1) Offline & no cache → demo immediately
    if (typeof navigator !== "undefined" && navigator.onLine === false && !cached) {
      const demo = makeDemoScore(autoKey);
      const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
      memCache.set(autoKey, pack);
      writeSession(autoKey, pack);
      setAutoData(demo);
      setAutoIsMock(true);
      setAutoLoading(false);
      return () => ac.abort();
    }

    // 3) Soft timeout → inject demo quickly if nothing on screen yet
    let softFired = false;
    const shouldSoft = !cached;
    const soft = setTimeout(() => {
      if (!shouldSoft) return;
      if (thisReq !== reqIdRef.current) return;
      softFired = true;
      const demo = makeDemoScore(autoKey);
      const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
      memCache.set(autoKey, pack);
      writeSession(autoKey, pack);
      setAutoData(demo);
      setAutoIsMock(true);
      setAutoLoading(false);
    }, SOFT_TIMEOUT);

    // 4) Fetch live
    (async () => {
      try {
        const res = await fetch(`${apiPath}?url=${encodeURIComponent(url)}`, {
          signal: ac.signal,
          cache: "no-store",
          headers: { accept: "application/json" },
        });
        const json = await res.json().catch(() => ({} as any));
        if (!res.ok || typeof json?.value !== "number") {
          throw new Error((json as any)?.error || `HTTP ${res.status}`);
        }

        if (thisReq !== reqIdRef.current) return;
        clearTimeout(soft);

        const clean: AutoData = {
          value: Math.max(0, Math.min(100, Number(json.value) || 0)),
          delta: typeof json.delta === "string" ? json.delta : undefined,
          down: Boolean(json.down),
        };
        const isMock = Boolean(json.isMock);
        const pack: CacheVal = { data: clean, isMock, ts: Date.now() };

        memCache.set(autoKey, pack);
        writeSession(autoKey, pack);

        setAutoData(clean);
        setAutoIsMock(isMock);
        setAutoLoading(false);
      } catch {
        if (ac.signal.aborted || thisReq !== reqIdRef.current) return;
        clearTimeout(soft);
        // Error fallback
        const existing = memCache.get(autoKey) ?? cached;
        if (existing) {
          setAutoData(existing.data);
          setAutoIsMock(existing.isMock);
        } else {
          const demo = makeDemoScore(autoKey);
          const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
          memCache.set(autoKey, pack);
          writeSession(autoKey, pack);
          setAutoData(demo);
          setAutoIsMock(true);
        }
        setAutoLoading(false);
      }
    })();

    // 5) Hard timeout guard
    const hard = setTimeout(() => ac.abort(), HARD_TIMEOUT);

    return () => {
      clearTimeout(soft);
      clearTimeout(hard);
      ac.abort();
    };
  }, [controlled, url, apiPath, autoKey]);

  /* ------------------------- Derived UI values ------------------------- */
  const live = controlled
    ? { value: Math.max(0, Math.min(100, Number(value))) || 0, delta, down, isMock: Boolean(isSample), loading: Boolean(loading) }
    : { value: autoData?.value ?? 0, delta: autoData?.delta, down: autoData?.down, isMock: autoIsMock, loading: autoLoading };

  const status: Status =
    live.value >= (thresholds?.good ?? 80) ? "good" :
    live.value >= (thresholds?.warn ?? 50) ? "warn" : "bad";

  const ringSize = 76;
  const ringStroke = 8;

  const ringColor =
    status === "good"
      ? "stroke-emerald-400 group-hover:stroke-emerald-500"
      : status === "warn"
      ? "stroke-amber-400 group-hover:stroke-amber-500"
      : "stroke-rose-400 group-hover:stroke-rose-500";

  const ringBar = clsx(ringColor, mounted ? "transition-colors duration-200" : "transition-none");
  const track = "stroke-slate-200 dark:stroke-white/10";

  const cardSurface =
    "border-slate-200 bg-white dark:border-gray-700/70 " +
    "dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]";

  const deltaBadge = clsx(
    "inline-flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap",
    live.down
      ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15"
      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
  );

  const statusChip = (s: Status) =>
    s === "good"
      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/15"
      : s === "warn"
      ? "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/15"
      : "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/15";

  const StatusIcon = status === "good" ? CheckCircle2 : status === "warn" ? AlertTriangle : XCircle;
  const statusLabel = status === "good" ? "Good" : status === "warn" ? "Needs work" : "Bad";

  /* ------------------------- Render ------------------------- */
  return (
    <div
      className={clsx(
        "group relative rounded-2xl border shadow-sm overflow-hidden transition-colors flex flex-col min-w-0",
        "p-4 sm:p-5",
        cardSurface,
        height
      )}
      aria-live="polite"
      aria-label="SEO Score card"
    >
      {/* decorative blob (dark only) */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl hidden dark:block" />

      {/* Header */}
      <div className="mb-1.5 sm:mb-2 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-base md:text-lg font-medium text-slate-900 dark:text-gray-200">
              SEO Score
            </p>

           {live.isMock && (
    <TooltipProvider>         
  <Tooltip>
    <TooltipTrigger asChild>
      <span
        className="ml-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80"
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
  </TooltipProvider>
)}
          </div>

          {!live.loading && live.delta && (
            <span
              className={clsx("ml-auto", deltaBadge)}
              title={live.down ? "Decrease" : "Increase"}
              aria-label={`Change ${live.down ? "down" : "up"} ${live.delta}`}
            >
              {live.down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
              {live.delta}
            </span>
          )}
        </div>
      </div>

      {/* Body — donut + status centered on one line */}
      {/* Body — fill remaining height and center content */}
<div className="flex-1 flex items-center justify-center">
  <div className="flex items-center gap-4">
    {live.loading ? (
      <div
        className="relative grid place-items-center shrink-0"
        style={{ width: ringSize, height: ringSize }}
        aria-busy="true"
        aria-label="Loading score"
      >
        <div
          className="rounded-full border-slate-200 dark:border-white/10"
          style={{ width: ringSize, height: ringSize, borderWidth: ringStroke, borderStyle: "solid" }}
          aria-hidden
        />
        <span className="absolute h-5 w-12 rounded bg-emerald-500/10 animate-pulse" />
      </div>
    ) : (
      <div className="shrink-0">
        <SEOScoreChart
          value={live.value}
          max={100}
          size={ringSize}
          stroke={ringStroke}
          barClass={ringBar}
          trackClass={track}
          labelClass="text-slate-900 dark:text-white"
          animateOnMount={false}
        />
      </div>
    )}

    {live.loading ? (
      <span className="h-5 w-16 rounded-full bg-slate-300/20 dark:bg-white/10 animate-pulse" aria-hidden />
    ) : (
      <span
        className={clsx(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-semibold leading-none whitespace-nowrap",
          statusChip(status)
        )}
        title={status === "good" ? "Meets target" : status === "warn" ? "Needs improvement" : "Below expectations"}
        role="status"
      >
        {status === "good" ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : status === "warn" ? (
          <AlertTriangle className="h-3.5 w-3.5" />
        ) : (
          <XCircle className="h-3.5 w-3.5" />
        )}
        {statusLabel}
      </span>
    )}
  </div>
</div>


      {/* Optional footer */}
      {showFooter && (
        <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between text-xs text-slate-600 dark:text-gray-400 border-t border-slate-200/70 dark:border-white/10">
          <span className="truncate">{live.isMock ? "Sample data" : note}</span>
          {footerMeta?.length ? (
            <div className="hidden sm:flex items-center gap-4 min-w-0">
              {footerMeta.map((m, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="opacity-70">{m.label}:</span>
                  <span className="text-slate-800 dark:text-gray-300">{m.value}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
