"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function ConversionFunnel() {
  const stages = ["Traffic", "Leads", "Conversions", "Revenue"];
  const values = [12000, 2500, 850, 12847]; // Example values

  // Calculate conversion rates for tooltip
  const conversionRates = values.map((val, idx) =>
    idx === 0 ? "100%" : ((val / values[0]) * 100).toFixed(1) + "%"
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "60%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number, opts) =>
        `${val.toLocaleString()} (${conversionRates[opts.dataPointIndex]})`,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"], // SaaS gradient style
    xaxis: {
      categories: stages,
      labels: { style: { fontSize: "12px" } },
    },
    tooltip: {
      y: {
        formatter: (val: number, opts) =>
          `${val.toLocaleString()} (${conversionRates[opts.dataPointIndex]} of Traffic)`,
      },
    },
  };

  const series = [
    {
      name: "Conversion Steps",
      data: values,
    },
  ];

  return (
    <div className=" p-4 flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Conversion Funnel</h3>
      <Chart options={options} series={series} type="bar" height={280} />
    </div>
  );
}
