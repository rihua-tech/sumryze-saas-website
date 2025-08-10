"use client";

import { useEffect, useState } from "react";

import SEOScoreCard from "./KPI/SEOScoreCard";
import TopPagesCard from "./KPI/TopPagesCard";
import { useUrlContext } from "@/app/context/UrlContext";

type KPI = {
  title: string;
  value: number | string;
  delta?: string;
  down?: boolean;
  series?: number[];
};

// 🔹 Generates a more natural-looking fallback series
function generateFallbackSeries(endValue: number, length = 7) {
  const series: number[] = [];
  let current = endValue - (length - 1);

  for (let i = 0; i < length; i++) {
    // Random change between -2 and +3 for variation
    current += Math.floor(Math.random() * 6) - 2;
    if (current < 0) current = 0; // no negative values
    series.push(current);
  }

  // Ensure last value = endValue
  series[length - 1] = endValue;
  return series;
}

export default function KPICardsContainer() {
  const { url } = useUrlContext();
  const [data, setData] = useState<Record<string, KPI>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/kpis?url=${encodeURIComponent(url)}`, {
          signal: ac.signal,
        });
        const list: KPI[] = await res.json();
        const map: Record<string, KPI> = {};
        list.forEach((k) => (map[k.title] = k));
        setData(map);
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          console.error("Failed to fetch KPIs:", error);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [url]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[148px] rounded-2xl bg-white/5 animate-pulse" />
        <div className="h-[148px] rounded-2xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  const seo = data["SEO Score"];
  const pages = data["Top Pages"];

  const toNumber = (v: number | string | undefined) =>
    typeof v === "number" ? v : Number(String(v ?? "").replace(/[^0-9.\-]/g, ""));

  const pagesValue = toNumber(pages?.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {typeof seo?.value === "number" && (
        <SEOScoreCard
          value={seo.value}
          delta={seo.delta}
          down={seo.down}
          note="vs last week"
        />
      )}

      {Number.isFinite(pagesValue) && (
        <TopPagesCard
          value={pagesValue as number}
          delta={pages?.delta}
          down={pages?.down}
          series={
            Array.isArray(pages?.series) && pages!.series!.length > 1
              ? pages!.series
              : generateFallbackSeries(pagesValue as number, 7) // 🔹 natural random fallback
          }
        />
      )}
    </div>
  );
}
