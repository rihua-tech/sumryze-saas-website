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
      baseColor: ["#10b981", "#34d399"], // Green
    },
    {
      name: "FID",
      value: 90,
      target: 100,
      unit: "ms",
      thresholds: [100, 300],
      baseColor: ["#3b82f6", "#60a5fa"], // Blue
    },
    {
      name: "CLS",
      value: 0.08,
      target: 0.1,
      unit: "",
      thresholds: [0.1, 0.25],
      baseColor: ["#f59e0b", "#fbbf24"], // Orange
    },
  ];

  const calcPercentage = (value: number, target: number) =>
    Math.min(100, parseFloat(((value / target) * 100).toFixed(1)));

  const getStatus = (value: number, thresholds: number[]) => {
    if (value <= thresholds[0]) return { text: "Good", color: "text-green-600" };
    if (value <= thresholds[1]) return { text: "Fair", color: "text-yellow-500" };
    return { text: "Poor", color: "text-red-500" };
  };

  return (
       
      <div className="p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Core Web Vitals
      </h3>

       <div className="flex-1 flex items-center justify-center">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {vitals.map((vital, index) => {
          const percent = calcPercentage(vital.value, vital.target);
          const status = getStatus(vital.value, vital.thresholds);

          const options: ApexCharts.ApexOptions = {
            chart: { type: "radialBar", sparkline: { enabled: true } },
            plotOptions: {
              radialBar: {
                hollow: { size: "55%" },
                track: { background: "#f3f4f6" },
                dataLabels: {
                  name: {
                    show: true,
                    fontSize: "13px",
                    color: "#6b7280",
                    offsetY: 18,
                  },
                  value: {
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                    offsetY: -12,
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
          };

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center text-center h-[230px]" // ✅ Center vertically & horizontally
            >
              <Chart
                options={options}
                series={[percent]}
                type="radialBar"
                height={150}
              />

              {/* Text Info */}
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-800">
                  {vital.value}{vital.unit}
                </p>
                <p className="text-xs text-gray-500">
                  Target: {vital.target}{vital.unit}
                </p>
                <p className={`text-xs font-semibold mt-1 ${status.color}`}>
                  {status.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  );
}
