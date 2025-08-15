"use client";

import { useEffect, useMemo, useState } from "react";
import TrafficByChannelChart from "./TrafficByChannelChart";
import { useUrlContext } from "@/app/context/UrlContext";
import { Gem, Plug2, ArrowRight } from "lucide-react";

/** Fallback demo data for the donut when we’re showing the CTA overlay (same idea as Overview’s sample) */
const DEMO_LABELS = ["Organic", "Direct", "Referral", "Social", "Email"];
const DEMO_SERIES = [124, 96, 72, 58, 31];

type Props = {
  hasPro?: boolean;        // optional real plan flag from parent/context
  ga4Connected?: boolean;  // optional real GA4 link flag from parent/context
};

export default function TrafficByChannelCard({ hasPro, ga4Connected }: Props) {
  const { url: currentUrl } = useUrlContext();

  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Same state model & CTA routing as TrafficOverviewCard ----
  const [isPro, setIsPro] = useState(false);
  const [ga4Linked, setGa4Linked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsPro(window.localStorage.getItem("plan") === "pro");
      setGa4Linked(window.localStorage.getItem("ga4Linked") === "true");
    }
  }, []);

  const onUpgrade = () => { window.location.href = "/pricing"; };           // same as Overview
  const onConnect = () => { window.location.href = "/api/auth/google"; };   // same as Overview

  const url = (currentUrl || "").trim();
  const hasUrl = Boolean(url) && !url.startsWith("demo://");
  // Mirror Overview: prefer rendering a demo chart (and overlay CTA) when not Pro or not linked or no URL
  const preferSample = !hasUrl || !isPro || !ga4Linked;

  // ----------------------------------------------------------------

  // Real GA4 data path (only when Pro + linked + hasUrl)
  useEffect(() => {
    if (!hasUrl || !isPro || !ga4Linked) {
      setError(null);
      setLabels([]);
      setSeries([]);
      return;
    }

    const ac = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/traffic-channel?url=${encodeURIComponent(url)}`,
          { signal: ac.signal, cache: "no-store", headers: { accept: "application/json" } }
        );
        if (!res.ok) throw new Error("Failed to load traffic channel data");
        const json = await res.json();

        const nextLabels: string[] = Array.isArray(json?.labels) ? json.labels : [];
        const nextSeries: number[] = Array.isArray(json?.series)
          ? json.series.map((v: unknown) => Number(v)).filter((n: number) => Number.isFinite(n) && n >= 0)
          : [];

        setLabels(nextLabels);
        setSeries(nextSeries);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Unknown error");
          setLabels([]);
          setSeries([]);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [url, hasUrl, isPro, ga4Linked]);

  const empty = useMemo(() => series.length === 0, [series]);

  return (
    <section
      aria-labelledby="traffic-by-channel-heading"
      className="rounded-2xl border p-5 shadow-sm transition-shadow
                 hover:shadow-md hover:shadow-indigo-500/10
                 border-slate-200 bg-white dark:border-gray-700/60
                 dark:bg-gradient-to-br dark:from-[#0e1322] dark:via-[#101528] dark:to-[#0b0f1c]"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 id="traffic-by-channel-heading" className="text-lg font-semibold text-slate-900 dark:text-white">
          Traffic by Channel
        </h3>
      </div>

      {/* Fixed-height body so layout is stable, same as Overview */}
      <div className="relative h-56 sm:h-64">
        {preferSample ? (
          <div className="absolute inset-0">
            {/* CTA overlay — same style/logic as Overview */}
            <div className="absolute inset-x-0 top-0 sm:top-0 z-10 flex justify-center pointer-events-none">
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

            {/* Demo donut below the overlay, to match Overview’s “sample chart under CTA” pattern */}
            <TrafficByChannelChart labels={DEMO_LABELS} series={DEMO_SERIES} />
          </div>
        ) : (
          <>
            {loading ? (
              <div className="absolute inset-0 animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
            ) : error && empty ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-rose-600 dark:text-rose-400">
                {error}{" "}
                <button className="ml-2 underline" onClick={() => location.reload()}>
                  Retry
                </button>
              </div>
            ) : empty ? (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-600 dark:text-gray-400">
                No channel data.{" "}
                <a className="ml-2 underline" href="/help/ga4">Troubleshoot</a>
              </div>
            ) : (
              <div className="absolute inset-0">
                <TrafficByChannelChart labels={labels} series={series} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
