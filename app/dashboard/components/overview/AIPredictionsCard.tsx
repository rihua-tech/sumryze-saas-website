"use client";

import { useEffect, useState } from "react";

import AIPredictionsChart from "./AIPredictionsChart";
import { useUrlContext } from "@/app/context/UrlContext";
import { TrendingUp, Users, MousePointerClick } from "lucide-react";

interface PredictionData {
  chartData: number[];
  predictedVisitors: number;
  leadsGrowth: number;
  ctrImprovement: number;
  forecastPercent: number;
}

export default function AIPredictionsCard() {
  const { url: currentUrl } = useUrlContext();

  const [data, setData] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUrl) return;

    async function fetchPredictions() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/ai-predictions?url=${encodeURIComponent(currentUrl)}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error("Error fetching AI predictions:", err);
        setError("Failed to load AI predictions.");
      } finally {
        setLoading(false);
      }
    }

    fetchPredictions();
  }, [currentUrl]);

  if (loading) {
    return (
      <div className="bg-muted/30 dark:bg-[#111827] border border-gray-800 rounded-xl p-6 text-center text-sm text-gray-400">
        Loading AI Predictions...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-muted/30 dark:bg-[#111827] border border-gray-800 rounded-xl p-6 text-center text-sm text-red-400">
        {error || "Failed to load predictions."}
      </div>
    );
  }
const metrics = [
    {
      icon: <Users className="w-4 h-4 text-indigo-400" />,
      label: "Predicted Visitors",
      value: data.predictedVisitors.toLocaleString(),
      valueColor: "text-indigo-500",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-green-400" />,
      label: "Leads Growth",
      value: `+${data.leadsGrowth}`,
      valueColor: "text-green-400",
    },
    {
      icon: <MousePointerClick className="w-4 h-4 text-blue-400" />,
      label: "CTR Improvement",
      value: `+${data.ctrImprovement}%`,
      valueColor: "text-blue-400",
    },
  ];
  

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">AI Predictions</h3>

      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-green-400">+{data.forecastPercent}%</p>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          Traffic Growth (Next 30 Days)
        </p>
      </div>

      <div className="mb-6">
        <AIPredictionsChart data={data.chartData} />
      </div>

      <div className="space-y-3 text-sm">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              {m.icon}
              {m.label}
            </div>
            <span className={`font-semibold ${m.valueColor}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
