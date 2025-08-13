"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import KeywordLineChart from "./KeywordLineChart";
import { useUrlContext } from "@/app/context/UrlContext";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* ---------------- Types ---------------- */
type TabType = "weekly" | "monthly";
type DataPoint = { day: string; count: number };

/* ---------------- Math helpers ---------------- */
function smoothMA3(arr: number[]) {
  if (arr.length < 3) return arr.slice();
  const out: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i - 1] ?? arr[i];
    const b = arr[i];
    const c = arr[i + 1] ?? arr[i];
    out.push((a + b + c) / 3);
  }
  return out;
}
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;

function computeSizeAwareDelta(
  data: DataPoint[],
  opts: { neutralPct?: number } = {}
): { text: string | null; tone: "up" | "down" | "neutral"; down: boolean } {
  if (!data || data.length < 4) return { text: null, tone: "neutral", down: false };

  const values = smoothMA3(data.map((d) => Number(d.count) || 0));
  const half = Math.floor(values.length / 2);
  const prevMean = Math.max(1, mean(values.slice(0, half)));
  const last = values[values.length - 1];

  const pctChange = ((last - prevMean) / prevMean) * 100;
  const absChange = Math.abs(last - prevMean);

  let declinePct = 10;
  let minAbs = 25;
  if (prevMean < 200) { declinePct = 15; minAbs = 10; }
  else if (prevMean <= 5000) { declinePct = 10; minAbs = 25; }
  else if (prevMean <= 50000) { declinePct = 6; minAbs = 100; }
  else { declinePct = 4; minAbs = 300; }

  const neutralPct = Math.max(0, opts.neutralPct ?? 2);

  if (Math.abs(pctChange) < neutralPct || absChange < minAbs) {
    const rounded = Math.round(pctChange * 10) / 10;
    return { text: `${rounded}%`, tone: "neutral", down: false };
  }

  const rounded = Math.abs(pctChange) >= 10 ? Math.round(pctChange) : Math.round(pctChange * 10) / 10;
  const sign = rounded > 0 ? "+" : "";
  const down = rounded < 0;

  return { text: `${sign}${rounded}%`, tone: down ? "down" : "up", down };
}

/* ---------------- Deterministic demo generator ---------------- */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619;
  return h >>> 0;
}
function rng(seed: number) {
  let x = seed || 123456789;
  return () => (x ^= x << 13, x ^= x >>> 17, x ^= x << 5, (x >>> 0) / 0xffffffff);
}
const WEEK_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function makeDemoSeries(key: string, period: TabType): DataPoint[] {
  const r = rng(hash(`kw-demo|${period}|${key}`));
  const n = period === "weekly" ? 7 : 12;
  const labels = period === "weekly" ? WEEK_LABELS : MONTH_LABELS;

  let base = 100 + Math.round(r() * 40);
  const out: DataPoint[] = [];
  for (let i = 0; i < n; i++) {
    base = Math.max(0, base + Math.round((r() * 2 - 1) * 8));
    out.push({ day: labels[i], count: base });
  }
  return out;
}

/* ---------------- SWR cache (memory + sessionStorage) ---------------- */
type CacheVal = { data: DataPoint[]; isMock: boolean; ts: number };
const memCache = new Map<string, CacheVal>();
const STORAGE_PREFIX = "kwcache:";

function readSession(key: string): CacheVal | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.data)) return null;
    if (typeof parsed?.isMock !== "boolean") return null;
    if (typeof parsed?.ts !== "number") return null;
    return parsed as CacheVal;
  } catch { return null; }
}
function writeSession(key: string, val: CacheVal) {
  try { sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val)); } catch {}
}

/* ---------------- Timeouts & retries ---------------- */
const HARD_TIMEOUT = 10_000;
const SOFT_TIMEOUT = 1_200;
const MAX_RETRIES = 1;

/* ---------------- Component ---------------- */
export default function KeywordGrowthCard() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(false);
  const reqIdRef = useRef(0);

  const { url: currentUrl } = useUrlContext();

  useEffect(() => {
    const url = currentUrl?.trim() || "";
    const period = activeTab;
    const key = `${url || "demo://blank"}|${period}`;
    const thisReq = ++reqIdRef.current;
    const ac = new AbortController();

    setError(null);

    // 1) No URL → instant demo (no network)
    if (!url) {
      const demo = makeDemoSeries(key, period);
      const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
      memCache.set(key, pack);
      writeSession(key, pack);
      setData(demo);
      setIsMock(true);
      setLoading(false);
      return () => ac.abort();
    }

    // 2) Use cache/session immediately if available (SWR)
    const cached = memCache.get(key) ?? readSession(key);
    if (cached) {
      memCache.set(key, cached); // hydrate memory from session
      setData(cached.data);
      setIsMock(cached.isMock);
      setLoading(false);
    } else {
      setLoading(true);
    }

    // 3) Soft timeout → show demo quickly if API is slow/cold
    let softFired = false;
    const soft = setTimeout(() => {
      if (thisReq !== reqIdRef.current) return;
      softFired = true;
      const demo = makeDemoSeries(key, period);
      const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
      memCache.set(key, pack);
      writeSession(key, pack);
      setData(demo);
      setIsMock(true);
      setLoading(false);
    }, SOFT_TIMEOUT);

    (async () => {
      let attempt = 0;
      while (attempt <= MAX_RETRIES) {
        try {
          const res = await fetch(
            `/api/keyword-growth?period=${period}&url=${encodeURIComponent(url)}`,
            { signal: ac.signal, cache: "no-store", headers: { accept: "application/json" } }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();

          const arr = Array.isArray(json?.data) ? json.data : [];
          const clean: DataPoint[] = arr.map((d: any) => ({
            day: String(d?.day ?? ""),
            count: Number(d?.count) || 0,
          }));

          if (thisReq !== reqIdRef.current) return;

          clearTimeout(soft);

          const pack: CacheVal = { data: clean, isMock: Boolean(json?.isMock), ts: Date.now() };
          memCache.set(key, pack);
          writeSession(key, pack);

          setData(clean);
          setIsMock(Boolean(json?.isMock));
          setLoading(false);
          return;
        } catch (e: any) {
          if (ac.signal.aborted || thisReq !== reqIdRef.current) return;
          if (e?.name === "AbortError") return;

          if (attempt++ >= MAX_RETRIES) {
            clearTimeout(soft);
            setError(e?.message || "Unexpected error");
            if (!cached && !softFired) {
              const demo = makeDemoSeries(key, period);
              const pack: CacheVal = { data: demo, isMock: true, ts: Date.now() };
              memCache.set(key, pack);
              writeSession(key, pack);
              setData(demo);
              setIsMock(true);
            }
            setLoading(false);
            return;
          }
          await new Promise((r) => setTimeout(r, 120 + Math.random() * 200));
        }
      }
    })();

    // Hard timeout guard
    const hard = setTimeout(() => ac.abort(), HARD_TIMEOUT);

    return () => {
      clearTimeout(soft);
      clearTimeout(hard);
      ac.abort();
    };
  }, [activeTab, currentUrl]);

  const delta = useMemo(() => computeSizeAwareDelta(data, { neutralPct: 2 }), [data]);

  return (
    <TooltipProvider delayDuration={120}>
      <div
        className={clsx(
          "group rounded-2xl border p-4 sm:p-5 shadow-sm transition-shadow",
          "hover:shadow-md hover:shadow-indigo-500/10",
          "border-slate-200 bg-white dark:border-gray-700/60 dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]",
          // CSS vars consumed by KeywordLineChart (hydration-safe)
          "[--kw-grid:rgba(0,0,0,0.06)] dark:[--kw-grid:rgba(255,255,255,0.06)] " +
          "[--kw-axis:#334155] dark:[--kw-axis:#cbd5e1] " +
          "[--kw-tooltip-bg:#ffffff] dark:[--kw-tooltip-bg:#0f172a] " +
          "[--kw-tooltip-border:#e5e7eb] dark:[--kw-tooltip-border:#334155] " +
          "[--kw-tooltip-fg:#0f172a] dark:[--kw-tooltip-fg:#e2e8f0] " +
          "[--kw-line:#22c55e]"
        )}
        aria-live="polite"
        aria-busy={loading ? true : undefined}
      >
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold tracking-tight text-balance text-base sm:text-lg text-slate-900 dark:text-gray-100">
              Keyword Growth
            </h3>

            {isMock && (
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
                    Showing sample data. Connect your data source to see your real keyword growth.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Right controls: delta badge + tabs */}
          <div className="flex items-center gap-2 min-w-0 flex-wrap w-full sm:w-auto justify-end">
            {delta.text && (
              <span
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold text-[10px] sm:text-xs transition-colors",
                  delta.tone === "neutral"
                    ? "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-gray-300"
                    : delta.down
                    ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                )}
                title={
                  delta.tone === "neutral"
                    ? "Change within neutral band / too small for site size"
                    : delta.down
                    ? "Down vs previous period average"
                    : "Up vs previous period average"
                }
              >
                {delta.tone === "neutral" ? null : delta.down ? (
                  <ArrowDown className="h-3 w-3" />
                ) : (
                  <ArrowUp className="h-3 w-3" />
                )}
                {delta.text}
              </span>
            )}

            <div
              className={clsx(
                "flex items-center gap-0 rounded-full p-1 overflow-x-auto max-w-full sm:max-w-none",
                "[-ms-overflow-style:none] [scrollbar-width:none]",
                "bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10"
              )}
              style={{ scrollbarWidth: "none" }}
            >
              {(["weekly", "monthly"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "px-2 py-1 sm:px-2 sm:py-0.5  rounded-full transition-colors whitespace-nowrap text-xs sm:text-[11px]",
                    activeTab === tab
                      ? "bg-indigo-600 text-white dark:bg-indigo-500"
                      : "text-slate-600 hover:bg-slate-200/70 dark:text-gray-300 dark:hover:bg-white/10"
                  )}
                  aria-pressed={activeTab === tab}
                >
                  {tab === "weekly" ? "Weekly" : "Monthly"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Body */}
        <div className="h-44 sm:h-56 md:h-56 lg:h-60">
          {loading ? (
            <div className="h-full rounded-xl animate-pulse bg-slate-100 dark:bg-white/5" />
          ) : error ? (
            <div className="flex justify-center items-center h-full text-sm text-rose-600 dark:text-rose-400">
              {error}
            </div>
          ) : data.length === 0 ? (
            <div className="flex justify-center items-center h-full text-sm text-slate-500 dark:text-gray-400">
              No data for this period.
            </div>
          ) : (
            <KeywordLineChart period={activeTab} data={data} />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
