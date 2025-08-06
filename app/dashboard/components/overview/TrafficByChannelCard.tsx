"use client";

import { useEffect, useState } from "react";
import { useUrlContext } from "@/app/context/UrlContext";
import TrafficByChannelChart from "./TrafficByChannelChart";

export default function TrafficByChannelCard() {
  const { url } = useUrlContext();
  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { url: currentUrl } = useUrlContext();

  useEffect(() => {
    if (!url) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/traffic-channel?url=${encodeURIComponent(currentUrl)}`);
        if (!res.ok) throw new Error("Failed to fetch traffic data");
        const data = await res.json();
        setLabels(data.labels || []);
        setSeries(data.series || []);
        setError(null);
      } catch (err: any) {
        console.error("Traffic by channel fetch error:", err);
        setError("Failed to load traffic channel data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Traffic by Channel
      </h3>

      {loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
      )}

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && series.length > 0 && (
        <TrafficByChannelChart labels={labels} series={series} />
      )}

      {!loading && !error && series.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
      )}
    </div>
  );
}
