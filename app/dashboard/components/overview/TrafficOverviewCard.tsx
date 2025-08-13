"use client";

import { useEffect, useRef, useState } from "react";
import TrafficAreaChart from "./TrafficAreaChart";
import { useUrlContext } from "@/app/context/UrlContext";
import { Gem, Plug2, ArrowRight } from "lucide-react";

/* ---------------- Types ---------------- */
type TabType = "weekly" | "monthly";
type TrafficDataPoint = { date: string; traffic: number };
type ApiTrafficItem = { date: string; traffic?: number; visits?: number; isMock?: boolean };

/* ---------------- Timeouts & retries ---------------- */
const SOFT_TIMEOUT = 1_200;
const HARD_TIMEOUT = 10_000;
const MAX_RETRIES = 1;

/* ---------------- Deterministic sample generator ---------------- */
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) h = (h ^ s.charCodeAt(i)) * 16777619; return h >>> 0; }
function rng(seed: number) { let x = seed || 123456789; return () => (x ^= x << 13, x ^= x >>> 17, x ^= x << 5, (x >>> 0) / 0xffffffff); }

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Sample series that looks nice but stays deterministic per (url, tab). */
function makeDemoTraffic(key: string, tab: TabType): TrafficDataPoint[] {
  const labels = tab === "weekly" ? WEEK : MONTH;
  const r = rng(hash(`traffic|${tab}|${key}`));

  // Baseline + drift tuned for readable axes on small screens
  let base = tab === "weekly" ? 150 + Math.round(r() * 25) : 450 + Math.round(r() * 80);

  return labels.map((lab, i) => {
    const noise = Math.round((r() * 2 - 1) * (tab === "weekly" ? 18 : 45));
    const trend = i > 0 ? (tab === "weekly" ? 8 : 28) : 0;
    base = Math.max(0, base + noise + trend);
    return { date: lab, traffic: base };
  });
}

/* ---------------- SWR cache (memory + sessionStorage) ---------------- */
type CacheVal = { data: TrafficDataPoint[]; isMock: boolean; ts: number };
const mem = new Map<string, CacheVal>();
const SKEY = "traffic-cache:";

function readSession(key: string): CacheVal | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.sessionStorage.getItem(SKEY + key);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!Array.isArray(p?.data) || typeof p?.ts !== "number") return null;
    return { data: p.data, isMock: !!p.isMock, ts: p.ts };
  } catch { return null; }
}
function writeSession(key: string, val: CacheVal) {
  try {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(SKEY + key, JSON.stringify(val));
  } catch {}
}

/* ---------------- Helpers ---------------- */
function toPoints(arr: unknown[]): TrafficDataPoint[] {
  return (arr ?? []).map((i: any) => ({
    date: String(i?.date ?? ""),
    traffic: Number(i?.traffic ?? i?.visits ?? 0),
  }));
}

/* ---------------- Component ---------------- */
export default function TrafficOverviewCard() {
  const { url: currentUrl } = useUrlContext();

  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<TrafficDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(false);
  const reqRef = useRef(0);

  // TEMP flags — replace with real plan/integration state
  const [isPro, setIsPro] = useState(false);
  const [ga4Linked, setGa4Linked] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsPro(window.localStorage.getItem("plan") === "pro");
      setGa4Linked(window.localStorage.getItem("ga4Linked") === "true");
    }
  }, []);

  // CTA handlers (replace with your flows if needed)
  const onUpgrade = () => { window.location.href = "/pricing"; };
  const onConnect = () => { window.location.href = "/api/auth/google"; };

  // State model
  const url = (currentUrl || "").trim();
  const hasUrl = Boolean(url) && !url.startsWith("demo://");
  // Prefer sample when there’s no URL, not Pro, or GA4 not linked (always show a chart first)
  const preferSample = !hasUrl || !isPro || !ga4Linked;

  useEffect(() => {
    const tab = activeTab;
    const key = `${url || "demo://blank"}|${tab}`;
    const thisReq = ++reqRef.current;
    const ac = new AbortController();

    setError(null);

    // 1) Prefer sample → instant demo (no network), still cache so the shape is stable
    if (preferSample) {
      const sample = makeDemoTraffic(key, tab);
      const pack: CacheVal = { data: sample, isMock: true, ts: Date.now() };
      mem.set(key, pack);
      writeSession(key, pack);
      setData(sample);
      setIsMock(true);
      setLoading(false);
      return () => ac.abort();
    }

    // 2) Real data path (hasUrl && isPro && ga4Linked)
    const cached = mem.get(key) ?? readSession(key);
    if (cached) {
      mem.set(key, cached);
      setData(cached.data);
      setIsMock(!!cached.isMock);
      setLoading(false);
    } else {
      setLoading(true);
    }

    const soft = setTimeout(() => { /* keep skeleton; don't swap to sample */ }, SOFT_TIMEOUT);

    (async () => {
      let attempt = 0;
      while (attempt <= MAX_RETRIES) {
        try {
          const res = await fetch(
            `/api/traffic?period=${tab}&url=${encodeURIComponent(url)}`,
            { signal: ac.signal, cache: "no-store", headers: { accept: "application/json" } }
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const rows = toPoints(json?.data);
          if (thisReq !== reqRef.current) return;

          clearTimeout(soft);
          const pack: CacheVal = { data: rows, isMock: !!json?.isMock, ts: Date.now() };
          mem.set(key, pack);
          writeSession(key, pack);

          setData(rows);
          setIsMock(!!json?.isMock);
          setLoading(false);
          return;
        } catch (e: any) {
          if (ac.signal.aborted || thisReq !== reqRef.current) return;
          if (e?.name === "AbortError") return;
          if (attempt++ >= MAX_RETRIES) {
            clearTimeout(soft);
            setError(e?.message || "Failed to load traffic");
            setLoading(false);
            return;
          }
          await new Promise(r => setTimeout(r, 140 + Math.random() * 240));
        }
      }
    })();

    const hard = setTimeout(() => ac.abort(), HARD_TIMEOUT);
    return () => { clearTimeout(soft); clearTimeout(hard); ac.abort(); };
  }, [activeTab, url, isPro, ga4Linked, preferSample]);

  const tabs: TabType[] = ["weekly", "monthly"];

  return (
    <div
      className="
        rounded-2xl border p-5 shadow-sm transition-shadow
        hover:shadow-md hover:shadow-indigo-500/10
        border-slate-200 bg-white dark:border-gray-700/60
        dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]
        [--traffic-grid:rgba(0,0,0,0.06)] dark:[--traffic-grid:rgba(255,255,255,0.06)]
        [--traffic-axis:#334155] dark:[--traffic-axis:#cbd5e1]
        [--traffic-tip-bg:#ffffff] dark:[--traffic-tip-bg:#0f172a]
        [--traffic-tip-br:#e5e7eb] dark:[--traffic-tip-br:#334155]
        [--traffic-tip-fg:#0f172a] dark:[--traffic-tip-fg:#e2e8f0]
      "
      aria-live="polite"
      aria-busy={loading ? true : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Traffic Overview</h3>
          {isMock && (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300">
              Sample
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center  gap-0 rounded-full p-1 bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10">
          {tabs.map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  "px-2 py-1 sm:px-2 sm:py-0.5 rounded-full text-xs sm:text-[11px] font-medium whitespace-nowrap transition-colors " +
                  (active
                    ? "bg-indigo-600 text-white dark:bg-indigo-500"
                    : "text-slate-600 hover:bg-slate-200/70 dark:text-gray-300 dark:hover:bg-white/10")
                }
                aria-pressed={active}
              >
                {tab === "weekly" ? "Weekly" : "Monthly"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body: fixed height for smooth swaps (mobile-first) */}
      <div className="relative h-56 sm:h-64">
        {preferSample ? (
          <div className="absolute inset-0">
            {/* CTA overlay — small on mobile, centered; never blocks the chart */}
            <div className="absolute inset-x-0 top-8 sm:top-5 z-10 flex justify-center pointer-events-none">
              <div className="pointer-events-auto">
                {!isPro ? (
                  <button
                    onClick={onUpgrade}
                    className="
                      group inline-flex items-center gap-1 sm:gap-2
                      rounded-full px-2 py-0.5 text-[9px] 
                      font-semibold text-white
                      bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500
                      shadow-[0_10px_30px_rgba(99,102,241,.35)]
                      hover:from-indigo-400 hover:to-fuchsia-500 transition-all
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70
                      active:scale-[.98]
                    "
                    aria-label="Upgrade to Pro and connect GA4"
                  >
                    <Gem className="h-4 w-4 opacity-90" />
                    <span>Upgrade to Pro &amp; Connect GA4</span>
                    <ArrowRight className="h-4 w-4 opacity-90 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : !ga4Linked ? (
                  <button
                    onClick={onConnect}
                    className="
                      inline-flex items-center gap-2
                      rounded-full px-4 py-2 text-sm font-semibold
                      text-white/95 bg-white/10 backdrop-blur
                      border border-white/15 hover:bg-white/14 transition-all
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                      shadow-[0_8px_24px_rgba(0,0,0,.25)]
                    "
                    aria-label="Connect Google Analytics 4"
                  >
                    <Plug2 className="h-4 w-4" />
                    <span>Connect GA4</span>
                  </button>
                ) : null}
              </div>
            </div>

            {/* Chart below the overlay */}
            <TrafficAreaChart activeTab={activeTab} data={data} />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="absolute inset-0 animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
            ) : error && data.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-rose-600 dark:text-rose-400">
                {error}{" "}
                <button className="ml-2 underline" onClick={() => location.reload()}>
                  Retry
                </button>
              </div>
            ) : data.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-600 dark:text-gray-400">
                No data for this period.{" "}
                <a className="ml-2 underline" href="/help/ga4">
                  Troubleshoot
                </a>
              </div>
            ) : (
              <div className="absolute inset-0">
                <TrafficAreaChart activeTab={activeTab} data={data} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
