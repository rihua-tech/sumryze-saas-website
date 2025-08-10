"use client";

import { useEffect, useState } from "react";
import TrafficAreaChart from "./TrafficAreaChart";
import { useUrlContext } from "@/app/context/UrlContext";
import ConnectGAPlaceholder from "./ConnectGAPlaceholder";

type TabType = "weekly" | "monthly";

interface TrafficDataPoint { date: string; traffic: number; }
interface ApiTrafficItem { date: string; traffic?: number; visits?: number; }

export default function TrafficOverviewCard() {
  const { url: currentUrl } = useUrlContext();

  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<TrafficDataPoint[]>([]);
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
    if (!currentUrl) { setData([]); setError(null); return; }

    const ac = new AbortController();
    (async () => {
      setLoading(true); setError(null);
      try {
        const res = await fetch(
          `/api/traffic?period=${activeTab}&url=${encodeURIComponent(currentUrl)}`,
          { signal: ac.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch traffic data");

        const json = await res.json();
        const mapped: TrafficDataPoint[] = (json?.data ?? []).map((i: ApiTrafficItem) => ({
          date: i.date,
          traffic: i.traffic ?? i.visits ?? 0,
        }));
        setData(mapped);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          setError(e?.message || "Unknown error");
          setData([]);
        }
      } finally { setLoading(false); }
    })();

    return () => ac.abort();
  }, [activeTab, currentUrl]);

  const tabOptions: TabType[] = ["weekly", "monthly"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Overview</h3>

        {/* Tabs */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
          {tabOptions.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body: fixed height so chart/CTA/skeleton are same size */}
      <div className="relative h-52 md:h-52">
        {loading ? (
          // Skeleton
          <div className="absolute inset-0 animate-pulse w-full flex flex-col">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-32 mx-auto"></div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
        ) : data.length === 0 ? (
          // GA4 linked but no data → empty state
          <div className="absolute inset-0 flex items-center justify-center">
            <EmptyState
              title="No GA4 data yet"
              subtitle="Try another date range or check your property/permissions."
            />
          </div>
        ) : (
          // Chart
          <div className="absolute inset-0">
            <TrafficAreaChart activeTab={activeTab} data={data} />
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
