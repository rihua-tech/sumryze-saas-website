"use client";

import TrafficByChannelChart from "./TrafficByChannelChart";
import { useUrlContext } from "@/app/context/UrlContext";

export default function TrafficByChannelCard() {
  const { url: currentUrl } = useUrlContext();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Traffic by Channel
      </h3>
   
      <TrafficByChannelChart url={currentUrl} />

    </div>
  );
}
