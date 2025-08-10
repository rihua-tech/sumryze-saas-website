"use client";

import { useEffect, useState } from "react";
import { BookOpenText, Star, Tags, Heading } from "lucide-react";
import { useUrlContext } from "@/app/context/UrlContext";

interface ContentPerformanceData {
  wordCount: number;
  qualityScore: number;
  metaPresent?: boolean;
  titlePresent?: boolean;
}

export default function ContentPerformanceCard() {
  const [data, setData] = useState<ContentPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const { url: currentUrl } = useUrlContext();


  useEffect(() => {
    async function fetchPerformance() {
      if (!currentUrl) return;

      try {
        const res = await fetch(
          `/api/content-performance?url=${encodeURIComponent(currentUrl)}`
        );

        const json = await res.json();

        setData({
          wordCount: json.wordCount ?? 0,
          qualityScore: json.qualityScore ?? 0,
          metaPresent: json.metaPresent ?? false,
          titlePresent: json.titlePresent ?? false,
        });
      } catch (error) {
        console.error("Failed to fetch content performance data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPerformance();
  }, [currentUrl]);

  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-7">
        Content Performance
      </h3>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      ) : (
        <div className="space-y-3.5 text-sm">
          {/* Avg Word Count */}
          <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted/10 rounded-md transition">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <BookOpenText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              Avg Word Count
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {data?.wordCount ?? "-"}
            </div>
          </div>
          <div className="border-t border-border/40" />

          {/* Quality Score */}
          <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted/10 rounded-md transition">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
              Quality Score
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {data?.qualityScore ?? "-"} / 100
            </div>
          </div>
          <div className="border-t border-border/40" />

          {/* Meta Description */}
          <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted/10 rounded-md transition">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Tags className="w-4 h-4 text-purple-400" />
              Meta Description
            </div>
            <div
              className={
                data?.metaPresent
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold"
              }
            >
              {data?.metaPresent ? "Found" : "Not Found"}
            </div>
          </div>
          <div className="border-t border-border/40" />

          {/* Title Tag */}
          <div className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-muted/10 rounded-md transition">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Heading className="w-4 h-4 text-cyan-400" />
              Title Tag
            </div>
            <div
              className={
                data?.titlePresent
                  ? "text-green-400 font-semibold"
                  : "text-red-400 font-semibold"
              }
            >
              {data?.titlePresent ? "Found" : "Not Found"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
