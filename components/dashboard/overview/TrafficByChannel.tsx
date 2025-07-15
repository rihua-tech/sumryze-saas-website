"use client";

import React from "react";
import Chart from "react-apexcharts";

export default function TrafficByChannel() {
  const data = {
    series: [6800, 2200, 1200, 800, 400], // Example: Organic, Paid, Social, Referral, Email
    labels: ["Organic", "Paid", "Social", "Referral", "Email"],
    colors: ["#10B981", "#F59E0B", "#3B82F6", "#8B5CF6", "#6B7280"],
  };

  const totalTraffic = data.series.reduce((acc, val) => acc + val, 0);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: data.labels,
    colors: data.colors,
    legend: {
      position: "bottom",
      fontSize: "13px",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString()} visits`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "16px",
              color: "#111827",
              formatter: () => totalTraffic.toLocaleString(),
            },
          },
        },
      },
    },
  };

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Traffic by Channel
      </h3>
      <Chart options={options} series={data.series} type="donut" height={250} />
    </div>
  );
}
