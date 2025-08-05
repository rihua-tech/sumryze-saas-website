"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CoreVital {
  name: string;
  value: number;
  target: number;
  unit: string;
  thresholds: number[];
  color: string;
}

interface Props {
  vitals?: CoreVital[]; // optional to handle undefined safely
}

export default function CoreWebVitalsChart({ vitals = [] }: Props) {
  const { resolvedTheme } = useTheme();

  const calcPercentage = (value: number, target: number) =>
    Math.min(100, parseFloat(((value / target) * 100).toFixed(1)));

  const getStatus = (value: number, thresholds: number[]) => {
    if (value <= thresholds[0]) {
      return { text: "Good", color: "text-green-600 dark:text-green-400" };
    }
    if (value <= thresholds[1]) {
      return { text: "Fair", color: "text-yellow-500 dark:text-yellow-400" };
    }
    return { text: "Poor", color: "text-red-500 dark:text-red-400" };
  };

  if (!Array.isArray(vitals) || vitals.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        No Core Web Vitals data available.
      </div>
    );
  }

  return (
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
              hollow: { size: "55%" },
              track: {
                background: resolvedTheme === "dark" ? "#374151" : "#e5e7eb",
              },
              dataLabels: {
                name: {
                  show: true,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: resolvedTheme === "dark" ? "#d1d5db" : "#374151",
                  offsetY: 20,
                },
                value: {
                  show: true,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: resolvedTheme === "dark" ? "#f9fafb" : "#111827",
                  offsetY: -10,
                  formatter: () => `${percent}%`,
                },
              },
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
          <div key={index} className="flex flex-col items-center text-center">
            <Chart options={options} series={[percent]} type="radialBar" height={180} />
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
  );
}
