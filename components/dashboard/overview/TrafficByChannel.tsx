"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function TrafficByChannel() {
  // Data
  const data = {
    series: [6800, 2200, 1200, 800, 400], // Organic, Paid, Social, Referral, Email
    labels: ["Organic", "Paid", "Social", "Referral", "Email"],
    colors: ["#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#6B7280"],
    trends: [12, -5, 3, 2, 0], // Trend percentages
  };

  const totalTraffic = data.series.reduce((a, b) => a + b, 0);

  // Chart Options
 const options: ApexCharts.ApexOptions = {
  chart: {
    type: "donut",
    sparkline: { enabled: false },
  },
  labels: data.labels,
  colors: data.colors,
  legend: { show: false }, // We'll build custom legend below
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`,
    style: { fontSize: "10px", fontWeight: 600 },
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val.toLocaleString()} visits`,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: "55%",
        labels: {
          show: true,
          name: {
            show: true, // We don't need extra name because "Total" is shown
          },
          value: {
          show: true, // Hide default value to use custom total  
          fontSize: "18px",
          fontWeight: 700,
          color: "#111827", // Gray-900

          offsetY: -5, // Move it closer DOWN
        
          },
          total: {
            show: true,
            label: "Total",
            fontSize: "14px",
            fontWeight: 500,
            color: "#6B7280",
            formatter: () => totalTraffic.toLocaleString(),
          },
        },
      },
    },
  },
};


  return (
    <div className=" p-5 flex flex-col gap-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Traffic by Channel</h3>

      {/* Donut Chart */}
      <Chart options={options} series={data.series} type="donut" height={200} />

      {/* Custom Legend with Stats */}
      <div className="mt-1 flex flex-col gap-2 text-xs">
        {data.labels.map((label, i) => (
          <div key={i} className="flex justify-between items-center border-b last:border-none pb-2 last:pb-0">
            {/* Left: Label with color dot */}
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: data.colors[i] }}
              ></span>
              <span className="text-gray-700">{label}</span>
            </div>

            {/* Right: Value + Trend */}
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-medium">
                {data.series[i].toLocaleString()} visits
              </span>
              <span
                className={`text-xs font-semibold ${
                  data.trends[i] > 0
                    ? "text-green-600"
                    : data.trends[i] < 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {data.trends[i] > 0
                  ? `▲ ${data.trends[i]}%`
                  : data.trends[i] < 0
                  ? `▼ ${Math.abs(data.trends[i])}%`
                  : "0%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
