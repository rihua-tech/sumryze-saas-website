"use client";

import { useEffect, useState } from "react";
import CoreWebVitalsChart from "./CoreWebVitalsChart";

interface CoreVital {
  name: string;
  value: number;
  target: number;
  unit: string;
  thresholds: number[];
  color: string;
}

export default function CoreWebVitalsCard() {
  const [vitals, setVitals] = useState<CoreVital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVitals() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/web-vitals");
        const json = await res.json();

        if (!res.ok || !Array.isArray(json.vitals)) {
          throw new Error(json.error || "Invalid response format");
        }

        setVitals(json.vitals);
      } catch (err: any) {
        console.error("Error loading vitals:", err);
        setError(err.message || "Unexpected error");
      } finally {
        setLoading(false);
      }
    }

    fetchVitals();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Core Web Vitals
      </h3>

      {loading ? (
        <div className="text-sm text-gray-500 dark:text-gray-400 text-center">Loading...</div>
      ) : error ? (
        <div className="text-sm text-red-500 text-center">{error}</div>
      ) : (
        <CoreWebVitalsChart vitals={vitals} />
      )}
    </div>
  );
}
