"use client";

import { useEffect, useState } from "react";
import KeywordLineChart from "./KeywordLineChart";

type TabType = "weekly" | "monthly";

interface DataPoint {
  day: string;
  count: number;
}

export default function KeywordGrowthCard() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/keyword-growth?period=${activeTab}`);
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to fetch data");

        setData(json.data);
      } catch (err: any) {
        console.error("Keyword growth fetch error:", err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeTab]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
      {/* Header & Tab */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md md:text-lg font-semibold text-gray-900 dark:text-white">
          Keyword Growth
        </h2>
        <div className="flex items-center space-x-2 text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
          {["weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as TabType)}
              className={`px-3 py-1 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Body */}
      <div className="h-[250px]">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-red-500">
            {error}
          </div>
        ) : (
          <KeywordLineChart data={data} />
        )}
      </div>
    </div>
  );
}
