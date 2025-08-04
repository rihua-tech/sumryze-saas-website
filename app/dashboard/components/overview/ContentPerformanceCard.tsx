"use client";

import { useEffect, useState } from "react";
import { BookOpenText, Star } from "lucide-react";

interface ContentPerformanceData {
  wordCount: number;
  qualityScore: number;
}

export default function ContentPerformanceCard() {
  const [data, setData] = useState<ContentPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPerformance() {
      try {
        const res = await fetch("/api/content-performance");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch content performance data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerformance();
  }, []);

  return (
  
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Content Performance
      </h3>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <BookOpenText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              Avg Word Count
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {data?.wordCount ?? "-"}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              Quality Score
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {data?.qualityScore ?? "-"} / 100
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
