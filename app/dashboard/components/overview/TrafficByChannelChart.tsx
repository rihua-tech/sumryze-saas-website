"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TrafficByChannelChart() {
  const { resolvedTheme } = useTheme();

  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    async function fetchChartData() {
      // Replace with actual API call
      const res = await fetch("/api/traffic-channel"); // your backend endpoint
      const data = await res.json();

      setLabels(data.labels);      // e.g., ["Organic", "Paid", ...]
      setSeries(data.series);      // e.g., [7000, 4500, ...]
      setTotal(data.series.reduce((acc: number, val: number) => acc + val, 0));

    }

    fetchChartData();
  }, []);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      type: "pie",
      background: "transparent",
    },
    labels,
    tooltip: {
      y: {
        formatter: (val: number, { seriesIndex }: any) =>
          `${labels[seriesIndex]}: ${val.toLocaleString()}`,
      },
    },
    legend: {
      position: "right",
      labels: {
        colors: resolvedTheme === "dark" ? "#d1d5db" : "#374151",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              color: resolvedTheme === "dark" ? "#f3f4f6" : "#374151",
              offsetY: -5,
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 500,
              color: resolvedTheme === "dark" ? "#ffffff" : "#111827",
              offsetY: 5,
              formatter: () => total.toLocaleString(),
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 600,
              color: resolvedTheme === "dark" ? "#cbd5e1" : "#1f2937",
              formatter: () => total.toLocaleString(),
            },
          },
        },
      },
    },
    dataLabels: {
      style: {
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#ffffff"],
    },
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  }), [resolvedTheme, labels, total]);

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height={200}
    />
  );
}
