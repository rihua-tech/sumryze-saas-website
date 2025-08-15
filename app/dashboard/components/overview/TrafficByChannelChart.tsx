"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SERIES_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface Props {
  labels?: string[];
  series?: number[];
}

export default function TrafficByChannelChart({ labels = [], series = [] }: Props) {
  const { resolvedTheme } = useTheme();

  // --- viewport-aware chart height (fixes oversized desktop donut) ---
  const [chartHeight, setChartHeight] = useState(220); // desktop default

  useEffect(() => {
    const compute = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1280;
      if (w >= 1280) return 220; // lg/xl desktops
      if (w >= 1024) return 210; // laptops
      if (w >= 768)  return 205; // tablets
      if (w >= 430)  return 200; // larger phones
      if (w >= 360)  return 205; // narrow phones (a touch taller for legend)
      return 210;               // very narrow
    };
    const apply = () => setChartHeight(compute());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
  // -------------------------------------------------------------------

  // Safe total
  const total = useMemo(() => {
    if (!Array.isArray(series)) return 0;
    return series.reduce((acc, v) => acc + (Number.isFinite(v) ? v : 0), 0);
  }, [series]);

  // Compact text (1.2K / 3.4M)
  const compact = useMemo(
    () =>
      new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }),
    []
  );

  // Center sizing by magnitude (smaller defaults so desktop isn’t huge)
  const donutSize = useMemo(() => {
    if (total >= 1_000_000) return "68%";
    if (total >= 100_000)  return "66%";
    if (total >= 10_000)   return "64%";
    return "62%";
  }, [total]);

  const valueFont = useMemo(() => {
    if (total >= 10_000_000) return "12px";
    if (total >= 1_000_000)  return "14px";
    if (total >= 100_000)    return "15px";
    return "16px";
  }, [total]);

  const totalFont = useMemo(() => {
    if (total >= 10_000_000) return "11px";
    if (total >= 1_000_000)  return "12px";
    if (total >= 100_000)    return "13px";
    return "14px";
  }, [total]);

  const valueText = useMemo(
    () => (total >= 10_000 ? compact.format(total) : total.toLocaleString()),
    [total, compact]
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
        background: "transparent",
        offsetY: 10, // space under CTA pill
        toolbar: { show: false },
      },
      labels,
      colors: SERIES_COLORS,
      tooltip: {
        y: {
          formatter: (val: number, { seriesIndex }: any) =>
            `${labels?.[seriesIndex] || "Unknown"}: ${Math.round(val).toLocaleString()}`,
        },
      },
      legend: {
        position: "right",
        horizontalAlign: "center",
        fontSize: "12px",
        itemMargin: { horizontal: 12, vertical: 6 },
        labels: { colors: resolvedTheme === "dark" ? "#d1d5db" : "#374151" },
        markers: {
          width: 12,
          height: 12,
          radius: 12,
          fillColors: SERIES_COLORS, // fix black markers
          strokeWidth: 0,
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          dataLabels: { offset: 0 },
          donut: {
            size: donutSize,
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "13px",
                fontWeight: 600,
                color: resolvedTheme === "dark" ? "#f3f4f6" : "#374151",
                offsetY: -6,
              },
              value: {
                show: true,
                fontSize: valueFont,
                fontWeight: 600,
                color: resolvedTheme === "dark" ? "#ffffff" : "#111827",
                offsetY: 6,
                formatter: () => valueText,
              },
              total: {
                show: true,
                label: "Total",
                fontSize: totalFont,
                fontWeight: 600,
                color: resolvedTheme === "dark" ? "#cbd5e1" : "#1f2937",
                formatter: () => valueText,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        dropShadow: { enabled: false },
        style: { colors: ["#fff"], fontSize: "12px", fontWeight: 700 },
        formatter: (val: number) => `${val.toFixed(1)}%`,
      },
      stroke: { show: true, width: 2, colors: ["#ffffff"] },

      // Responsive polish (legend bottom + compact labels on phones)
      responsive: [
        {
          breakpoint: 1024,
          options: {
            legend: {
              position: "bottom",
              fontSize: "12px",
              itemMargin: { horizontal: 10, vertical: 6 },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "64%",
                  labels: {
                    name: { fontSize: "12px", offsetY: -5 },
                    value: { fontSize: "14px", offsetY: 5 },
                    total: { fontSize: "12px" },
                  },
                },
              },
            },
            dataLabels: { style: { fontSize: "11px" } },
          },
        },
        // phones (≤430): keep % labels but tiny; skip very small slices
        {
          breakpoint: 430,
          options: {
            legend: {
              position: "bottom",
              itemMargin: { horizontal: 10, vertical: 6 },
            },
            dataLabels: {
              enabled: true,
              style: { colors: ["#fff"], fontSize: "10px", fontWeight: 700 },
              formatter: (val: number) => (val >= 4 ? `${val.toFixed(1)}%` : ""),
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "66%",
                  labels: {
                    name: { fontSize: "12px", offsetY: -4 },
                    value: { fontSize: "13px", offsetY: 4 },
                    total: { fontSize: "12px" },
                  },
                },
              },
            },
          },
        },
        // very narrow (≤360)
        {
          breakpoint: 360,
          options: {
            legend: {
              position: "bottom",
              fontSize: "11px",
              itemMargin: { horizontal: 8, vertical: 4 },
            },
            dataLabels: {
              enabled: true,
              style: { colors: ["#fff"], fontSize: "9.5px", fontWeight: 700 },
              formatter: (val: number) => (val >= 5 ? `${val.toFixed(0)}%` : ""),
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "68%",
                  labels: {
                    name: { fontSize: "11px", offsetY: -3 },
                    value: { fontSize: "12px", offsetY: 3 },
                    total: { fontSize: "11px" },
                  },
                },
              },
            },
          },
        },
      ],
    }),
    [resolvedTheme, labels, donutSize, valueFont, totalFont, valueText]
  );

  return (
    <div className="mt-4 sm:mt-5">
      {/* ✅ height is controlled here so desktop won’t blow up */}
      <Chart options={options} series={series} type="donut" height={chartHeight} />
    </div>
  );
}
