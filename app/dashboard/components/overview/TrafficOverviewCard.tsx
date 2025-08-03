"use client";

import { useState, useEffect } from "react";
import TrafficAreaChart from "./TrafficAreaChart";

type TabType = "weekly" | "monthly";

interface TrafficDataPoint {
  date: string;
  traffic: number;
}

export default function TrafficOverviewCard() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<TrafficDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call
  useEffect(() => {
    async function fetchTrafficData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/traffic?period=${activeTab}`);
        if (!response.ok) throw new Error("Failed to fetch traffic data");

        const result = await response.json();
        // If your API returns { date, visits }, map to { date, traffic }
        setData(result.data.map((item: any) => ({
          date: item.date,
          traffic: item.traffic ?? item.visits // support both keys
        })));
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTrafficData();
  }, [activeTab]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Traffic Overview
        </h3>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
          {["weekly", "monthly"].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
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

      {/* Chart or Loading/Error States */}
      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <TrafficAreaChart activeTab={activeTab} data={data} />
      )}
    </div>
  );
}
