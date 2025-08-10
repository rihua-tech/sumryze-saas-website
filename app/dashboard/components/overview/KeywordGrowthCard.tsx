"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import KeywordLineChart from "./KeywordLineChart";
import { useUrlContext } from "@/app/context/UrlContext";
import { useTheme } from "next-themes";
import clsx from "clsx";

type TabType = "weekly" | "monthly";
type DataPoint = { day: string; count: number };

/* ---------------- Helpers ---------------- */

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
const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

function computeSizeAwareDelta(
  data: DataPoint[],
  opts: { neutralPct?: number } = {}
): { text: string | null; tone: "up" | "down" | "neutral"; down: boolean } {
  if (!data || data.length < 4) return { text: null, tone: "neutral", down: false };

  const values = smoothMA3(data.map((d) => d.count));
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

/* ---------------- Component ---------------- */

export default function KeywordGrowthCard() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { url: currentUrl } = useUrlContext();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!currentUrl) return;

    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/keyword-growth?period=${activeTab}&url=${encodeURIComponent(currentUrl)}`,
          { signal: ac.signal }
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch data");
        setData(Array.isArray(json.data) ? json.data : []);
      } catch (err: any) {
        if (err?.name !== "AbortError") setError(err?.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [activeTab, currentUrl]);

  const delta = useMemo(() => computeSizeAwareDelta(data, { neutralPct: 2 }), [data]);

  const cardClass = isDark
    ? "border-gray-700/60 bg-gradient-to-br from-[#0e1322] via-[#101528] to-[#0b0f1c]"
    : "border-slate-200 bg-white";

  const neutralBadge = isDark ? "bg-white/5 text-gray-300" : "bg-slate-100 text-slate-600";
  const upBadge = isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600";
  const downBadge = isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600";

  const tabsWrap = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-slate-100 border border-slate-200";

  const tabActive = isDark ? "bg-indigo-500 text-white" : "bg-indigo-600 text-white";
  const tabIdle = isDark ? "text-gray-300 hover:bg-white/10" : "text-slate-600 hover:bg-slate-200/70";

  return (
    <div
      className={clsx(
        "group rounded-2xl border p-4 sm:p-5 shadow-sm transition-shadow",
        "hover:shadow-md hover:shadow-indigo-500/10",
        cardClass
      )}
    >
      {/* Header */}
      {/* Header */}
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
  <h3
    className={clsx(
      "font-semibold tracking-tight text-balance",
      "text-base sm:text-lg",
      isDark ? "text-gray-100" : "text-slate-900"
    )}
  >
    Keyword Growth
  </h3>

  {/* Right controls: badge + tabs */}
  <div className="flex items-center gap-2 min-w-0 flex-wrap w-full sm:w-auto justify-end">
    {delta.text && (
      <span
        className={clsx(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
          "text-[10px] sm:text-xs",
          "transition-colors",
          delta.tone === "neutral" ? neutralBadge : delta.down ? downBadge : upBadge
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

    {/* Tabs — scroll on tiny widths, otherwise fit/wrap neatly */}
    <div
      className={clsx(
        "flex items-center gap-1 rounded-full p-1",
        "overflow-x-auto max-w-full sm:max-w-none",
        "[-ms-overflow-style:none] [scrollbar-width:none]",
        tabsWrap
      )}
      style={{ scrollbarWidth: "none" }}
    >
      {(["weekly", "monthly"] as TabType[]).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={clsx(
            "px-3 py-1 rounded-full transition-colors whitespace-nowrap",
            "text-xs sm:text-[13px]",
            activeTab === tab ? tabActive : tabIdle
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
          <div className={clsx("h-full rounded-xl animate-pulse", isDark ? "bg-white/5" : "bg-slate-100")} />
        ) : error ? (
          <div
            className={clsx(
              "flex justify-center items-center h-full text-sm",
              isDark ? "text-rose-400" : "text-rose-600"
            )}
          >
            {error}
          </div>
        ) : data.length === 0 ? (
          <div
            className={clsx(
              "flex justify-center items-center h-full text-sm",
              isDark ? "text-gray-400" : "text-slate-500"
            )}
          >
            No data for this period.
          </div>
        ) : (
          <KeywordLineChart data={data} />
        )}
      </div>
    </div>
  );
}
