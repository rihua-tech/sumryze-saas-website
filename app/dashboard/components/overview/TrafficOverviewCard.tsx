// components/TrafficOverviewCard.tsx
"use client";

import { useState } from "react";
import TrafficAreaChart from "./TrafficAreaChart";

export default function TrafficOverviewCard() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-5">
      {/* Header Title + Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Traffic Overview
        </h3>
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-3 py-1 text-sm rounded-full font-medium transition ${
              activeTab === "weekly"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-3 py-1 text-sm rounded-full font-medium transition ${
              activeTab === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <TrafficAreaChart activeTab={activeTab} />
    </div>
  );
}
