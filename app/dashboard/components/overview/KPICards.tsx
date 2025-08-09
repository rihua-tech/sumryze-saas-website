"use client";

import { useEffect, useMemo, useState } from "react";
import KPI from "./KPI";
import { useUrlContext } from "@/app/context/UrlContext";
import { TrendingUp, FileText, RotateCw } from "lucide-react";

type KPIData = {
  title: "SEO Score" | "Top Pages" | string;
  value: string | number;
  delta?: string;
  down?: boolean;
};

const ORDER: Array<"SEO Score" | "Top Pages"> = ["SEO Score", "Top Pages"];

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-[#0e1322] via-[#101528] to-[#0b0f1c] p-5 min-h-[148px] animate-pulse">
      <div className="h-3 w-24 bg-white/10 rounded mb-4" />
      <div className="h-8 w-24 bg-white/10 rounded mb-3" />
      <div className="h-3 w-20 bg-white/10 rounded" />
    </div>
  );
}

export default function DashboardKPIs() {
  const [data, setData] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { url: currentUrl } = useUrlContext();

  useEffect(() => {
    if (!currentUrl?.trim()) return;

    const ctrl = new AbortController();

    const fetchKPIs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/kpis?url=${encodeURIComponent(currentUrl)}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const json: KPIData[] = await res.json();
        setData(json || []);
      } catch (err) {
        if ((err as any)?.name !== "AbortError") setError("Failed to load KPI data.");
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
    return () => ctrl.abort();
  }, [currentUrl]);

  const mapIcon = (title: string) =>
    title === "SEO Score" ? <TrendingUp size={16} /> :
    title === "Top Pages" ? <FileText size={16} /> : null;

  const twoKPIs = useMemo(() => {
    const byTitle = Object.fromEntries(data.map(k => [k.title, k])) as Record<string, KPIData>;
    return ORDER.map(t => byTitle[t]).filter(Boolean) as KPIData[];
  }, [data]);

  if (!currentUrl?.trim()) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-400">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-1 px-2 py-1 rounded border border-red-500/30 hover:bg-red-500/10"
          title="Retry"
        >
          <RotateCw className="h-3.5 w-3.5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {loading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : twoKPIs.length ? (
        twoKPIs.map(kpi => {
          const isSEO = kpi.title === "SEO Score";
          const numeric =
            typeof kpi.value === "number"
              ? kpi.value
              : Number(String(kpi.value).replace(/[^\d.]/g, "") || "0");

          return (
            <KPI
              key={kpi.title}
              title={kpi.title}
              value={Number.isFinite(numeric) ? numeric : kpi.value}
              delta={kpi.delta}
              down={kpi.down}
              icon={mapIcon(kpi.title)}
              note={isSEO ? "vs last week" : "indexed pages"}
              variant="gradient"
              minH="min-h-[148px]"
              ringMax={isSEO ? 100 : undefined}              // ring for SEO Score
              statusThresholds={isSEO ? { good: 80, warn: 50 } : undefined}
            />
          );
        })
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </div>
  );
}
