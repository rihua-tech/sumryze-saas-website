"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function CoreWebVitalsChart() {
  const vitals = [
    {
      name: "LCP",
      value: 1.9,
      target: 2.5,
      unit: "s",
      thresholds: [2.5, 4.0],
      baseColor: ["#10b981", "#34d399"], // Green gradient
    },
    {
      name: "FID",
      value: 90,
      target: 100,
      unit: "ms",
      thresholds: [100, 300],
      baseColor: ["#3b82f6", "#60a5fa"], // Blue gradient
    },
    {
      name: "CLS",
      value: 0.08,
      target: 0.1,
      unit: "",
      thresholds: [0.1, 0.25],
      baseColor: ["#f59e0b", "#fbbf24"], // Orange gradient
    },
  ];

  const calcPercentage = (value: number, target: number) =>
    Math.min(100, parseFloat(((value / target) * 100).toFixed(1)));

  return (
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-900 mb-4">
        Core Web Vitals
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {vitals.map((vital, index) => {
          const percent = calcPercentage(vital.value, vital.target);

          const status =
            vital.value <= vital.thresholds[0]
              ? "✅ Good"
              : vital.value <= vital.thresholds[1]
              ? "⚠ Needs Improvement"
              : "❌ Poor";

          const options: ApexCharts.ApexOptions = {
            chart: {
              type: "radialBar",
              sparkline: { enabled: true },
            },
            plotOptions: {
              radialBar: {
                hollow: { size: "65%" },
                track: { background: "#f3f4f6" },
                dataLabels: {
                  name: {
                    show: true,
                    fontSize: "14px",
                    color: "#6b7280",
                    offsetY: 20,
                  },
                  value: {
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
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
                gradientToColors: [vital.baseColor[1]],
                stops: [0, 100],
              },
            },
            colors: [vital.baseColor[0]],
            labels: [vital.name],
            stroke: { lineCap: "round" },
            tooltip: {
              enabled: true,
              y: {
                formatter: () =>
                  `${status} | ${vital.value}${vital.unit} (Target: ${vital.target}${vital.unit})`,
              },
            },
          };

          return (
            <div key={index} className="flex flex-col items-center">
              <Chart
                options={options}
                series={[percent]}
                type="radialBar"
                height={180}
              />
              <p className="text-sm text-gray-600 mt-1">
                {vital.value}
                {vital.unit} (Target: {vital.target}
                {vital.unit})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
