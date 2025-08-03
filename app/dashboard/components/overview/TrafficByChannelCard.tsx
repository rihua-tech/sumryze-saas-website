"use client";

import TrafficByChannelChart from "./TrafficByChannelChart";

export default function TrafficByChannelCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Traffic by Channel
      </h3>
      <TrafficByChannelChart />
    </div>
  );
}
