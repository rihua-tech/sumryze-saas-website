"use client";

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function ConversionFunnel() {
  const stages = ["Traffic", "Leads", "Conversions"];
  const values = [12000, 2500, 850];
  const revenue = 12847;

  const dropOff = [
    "-79%", // Traffic → Leads
    "-66%", // Leads → Conversions
  ];

  const labelsWithPercent = [
    `${values[0].toLocaleString()} (100%)`,
    `${values[1].toLocaleString()} (${((values[1] / values[0]) * 100).toFixed(
      1
    )}% of Traffic)`,
    `${values[2].toLocaleString()} (${((values[2] / values[0]) * 100).toFixed(
      1
    )}% of Traffic, ${((values[2] / values[1]) * 100).toFixed(1)}% of Leads)`,
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "80%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      position: "right",
      formatter: (_: number, opts) => labelsWithPercent[opts.dataPointIndex],
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#374151"],
      },
      offsetX: 8, // ✅ Moves the text slightly right
    },
    legend: {
      show: false, // ✅ Removes the label
    },
    colors: ["#10B981", "#F59E0B", "#EF4444"], // Funnel colors
    xaxis: {
      categories: stages,
      labels: {
        style: { fontSize: "12px", colors: "#6B7280" },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number, idx) => {
          if (idx.dataPointIndex === 0) return `${val.toLocaleString()} visitors`;
          if (idx.dataPointIndex === 1)
            return `${val.toLocaleString()} leads (${dropOff[0]} drop)`;
          return `${val.toLocaleString()} conversions (${dropOff[1]} drop)`;
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 3,
    },
  };

  const series = [{ name: "Conversion Steps", data: values }];

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Conversion Funnel
      </h3>

      {/* Funnel Chart */}
      <Chart options={options} series={series} type="bar" height={260} />

      {/* Drop-off Arrows */}
      <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
        <div className="flex items-center gap-1">
          <span className="text-red-500">↓</span> {dropOff[0]} (Traffic → Leads)
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-500">↓</span> {dropOff[1]} (Leads → Conversions)
        </div>
      </div>

      {/* Revenue KPI with Trend */}
      <div className="mt-4 border-t pt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-lg font-bold text-indigo-600">
            ${revenue.toLocaleString()}
          </p>
        </div>
        <div className="text-xs text-green-600 font-medium">▲ +12% this month</div>
      </div>
    </div>
  );
}
