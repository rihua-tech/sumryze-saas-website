"use client";

import React from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// ✅ Load ApexCharts dynamically (no SSR)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });



export default function CoreWebVitalsChart() {
  const { theme } = useTheme();

  const vitals = [
    { name: "LCP", value: 1.9, target: 2.5, unit: "s", thresholds: [2.5, 4.0], color: "#10B981" }, // Green
    { name: "FID", value: 90, target: 100, unit: "ms", thresholds: [100, 300], color: "#3B82F6" }, // Blue
    { name: "CLS", value: 0.08, target: 0.1, unit: "", thresholds: [0.1, 0.25], color: "#F59E0B" }, // Orange
  ];

  const calcPercentage = (value: number, target: number) =>
    Math.min(100, parseFloat(((value / target) * 100).toFixed(1)));

  const getStatus = (value: number, thresholds: number[]) => {
    if (value <= thresholds[0]) return { text: "Good", color: "text-green-600 dark:text-green-400" };
    if (value <= thresholds[1]) return { text: "Fair", color: "text-yellow-500 dark:text-yellow-400" };
    return { text: "Poor", color: "text-red-500 dark:text-red-400" };
  };

  return (
    <div className="p-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 justify-items-center">
        {vitals.map((vital, index) => {
          const percent = calcPercentage(vital.value, vital.target);
          const status = getStatus(vital.value, vital.thresholds);

          const options: ApexCharts.ApexOptions = {
            chart: {
              type: "radialBar",
              sparkline: { enabled: true },
            },
            plotOptions: {
              radialBar: {
                hollow: { size: "60%" },
                track: { background: theme === "dark" ? "#374151" : "#e5e7eb" },
                dataLabels: {
                  name: {
                    show: true,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: theme === "dark" ? "#d1d5db" : "#374151",
                    offsetY: 20, // Move below % inside donut
                  },
                  value: {
                    show: true,
                    fontSize: "22px",
                    fontWeight: 700,
                    color: theme === "dark" ? "#f9fafb" : "#111827",
                    offsetY: -10,
                    formatter: () => `${percent}%`,
                  },
                },
              },
            },
grid: {
  padding: {
    top: -10,
    bottom: -10,
    left: -10,
    right: -10,
  },
},

            fill: {
              type: "gradient",
              gradient: {
                shade: "light",
                type: "horizontal",
                gradientToColors: [vital.color],
                stops: [0, 100],
              },
            },
            colors: [vital.color],
            labels: [vital.name],
          };

          return (
            

              <div
  key={index}
  className="flex flex-col items-center text-center transition-none"
>
              {/* Donut Chart */}
              <Chart options={options} series={[percent]} type="radialBar" height={160} />

              {/* Bottom Info */}
              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {vital.value}
                  {vital.unit} &nbsp;|&nbsp; Target: {vital.target}
                  {vital.unit}
                </p>
                <p className={`text-xs font-semibold ${status.color}`}>{status.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
