"use client";

import { useEffect, useState } from "react";
import KPI from "./KPI";
import { useUrlContext } from "@/app/context/UrlContext";

type KPIData = {
  title: string;
  value: string | number;
  delta: string;
  down?: boolean;
};

export default function DashboardKPIs() {
  const [data, setData] = useState<KPIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { url: currentUrl } = useUrlContext();

  useEffect(() => {
  if (!currentUrl || currentUrl.trim() === "") {
    console.warn("⛔ currentUrl empty — KPI fetch skipped.");
    return;
  }

  const fetchKPIs = async () => {
    try {
      const res = await fetch(`/api/kpis?url=${encodeURIComponent(currentUrl)}`);
      if (!res.ok) throw new Error("API error");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("❌ Failed to load KPI data", err);
      setError("Failed to load KPI data.");
    } finally {
      setLoading(false);
    }
  };

  fetchKPIs();
}, [currentUrl]);


  if (loading) return <p className="text-sm text-gray-500 dark:text-gray-400">Loading KPIs...</p>;
  if (error) return <p className="text-sm text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((kpi, idx) => (
        <KPI key={idx} {...kpi} />
      ))}
    </div>
  );
}
