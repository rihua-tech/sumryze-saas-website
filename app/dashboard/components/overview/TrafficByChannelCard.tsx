"use client";

import { useEffect, useState } from "react";
import TrafficByChannelChart from "./TrafficByChannelChart";
import { useUrlContext } from "@/app/context/UrlContext";
import ConnectGAPlaceholder from "./ConnectGAPlaceholder";

export default function TrafficByChannelCard() {
  const { url: currentUrl } = useUrlContext();

  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TEMP flags — replace with your real plan/integration state
  const [isPro, setIsPro] = useState(false);
  const [ga4Linked, setGa4Linked] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsPro(localStorage.getItem("plan") === "pro");
      setGa4Linked(localStorage.getItem("ga4Linked") === "true");
    }
  }, []);

  // Upgrade → pricing modal → GA4 connect
  const handleGAConnect = () => { window.location.href = "/api/auth/google"; };
  const openPricingModal = async (): Promise<boolean> => {
    // TODO: show your pricing modal; resolve true ONLY on successful payment
    // return await showPricingModal({ intent: "ga4-connection" });
    return false; // stub
  };

  useEffect(() => {
    if (!currentUrl) { setLabels([]); setSeries([]); setError(null); return; }

    const ac = new AbortController();
    (async () => {
      setLoading(true); setError(null);
      try {
        const res = await fetch(
          `/api/traffic-channel?url=${encodeURIComponent(currentUrl)}`,
          { signal: ac.signal }
        );
        if (!res.ok) throw new Error("Failed to load traffic channel data");

        const json = await res.json();

        const nextLabels: string[] = Array.isArray(json?.labels) ? json.labels : [];
        const nextSeries: number[] = Array.isArray(json?.series)
          ? json.series.map((v: unknown) => Number(v)).filter((v: number) => Number.isFinite(v))
          : [];

        setLabels(nextLabels);
        setSeries(nextSeries);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Unknown error");
          setLabels([]); setSeries([]);
        }
      } finally { setLoading(false); }
    })();

    return () => ac.abort();
  }, [currentUrl]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Traffic by Channel
      </h3>

      {/* Fixed-height content area so chart/CTA/skeleton are same size */}
      <div className="relative h-60 md:h-60">
        {loading ? (
          // Skeleton (pie shape)
          <div className="absolute inset-0 animate-pulse flex flex-col items-center justify-center">
            <div className="h-40 w-40 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        ) : error ? (
          // Error
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : !isPro ? (
          // Not Pro → upsell + connect
          <div className="absolute inset-0 flex items-center justify-center">
            <ConnectGAPlaceholder
              onOpenPricingModal={openPricingModal}
              onConnectGA4={handleGAConnect}
            />
          </div>
        ) : !ga4Linked ? (
          // Pro but GA4 not linked → connect-only CTA
          <div className="absolute inset-0 flex items-center justify-center">
            <ConnectOnlyBlock onConnect={handleGAConnect} />
          </div>
        ) : series.length === 0 ? (
          // GA4 linked but empty data → empty state
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              title="No channel data in GA4"
              subtitle="Try a different date range or check your GA4 channel grouping."
            />
          </div>
        ) : (
          // Chart
          <div className="absolute inset-0">
            <TrafficByChannelChart labels={labels} series={series} />
          </div>
        )}
      </div>
    </div>
  );
}

/** Minimal connect-only block (for Pro users who haven't linked GA4 yet) */
function ConnectOnlyBlock({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 px-4 text-center">
      <button
        onClick={onConnect}
        className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        🔗 Connect GA4
      </button>
    </div>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center py-6">
      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
