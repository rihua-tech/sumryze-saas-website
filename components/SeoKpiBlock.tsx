// components/SeoKpiBlock.tsx
"use client";

import React from "react";
import {
  LineChart,
  PieChart,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Link,
  Search,
  ListChecks,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  {
    icon: <TrendingUp className="text-green-500 w-5 h-5" />, // Total Organic Clicks
    title: "Total Organic Clicks",
    value: "12,450",
    delta: "+8.3%",
    description: "From Google Search Console (last 30 days)",
  },
  {
    icon: <Search className="text-indigo-500 w-5 h-5" />, // Impressions
    title: "Total Impressions",
    value: "1.2M",
    delta: "+5.1%",
    description: "Visibility in search results",
  },
  {
    icon: <BarChart3 className="text-blue-500 w-5 h-5" />, // CTR
    title: "Click-Through Rate (CTR)",
    value: "2.7%",
    delta: "-0.2%",
    description: "CTR = Clicks ÷ Impressions",
  },
  {
    icon: <TrendingUp className="text-purple-500 w-5 h-5" />, // Avg Position
    title: "Avg. Position",
    value: "17.3",
    delta: "+0.6",
    description: "Average ranking across all tracked keywords",
  },
  {
    icon: <ListChecks className="text-yellow-500 w-5 h-5" />, // Top Keywords Gained
    title: "Top Keywords Gained",
    value: "5",
    delta: "+",
    description: "Keywords with improved rankings",
  },
  {
    icon: <TrendingDown className="text-red-500 w-5 h-5" />, // Top Keywords Lost
    title: "Top Keywords Lost",
    value: "3",
    delta: "-",
    description: "Keywords with major drops in rankings",
  },
  {
    icon: <Link className="text-gray-600 w-5 h-5" />, // Backlinks
    title: "New Backlinks",
    value: "14",
    delta: "+2",
    description: "From Ahrefs or Semrush",
  },
  {
    icon: <PieChart className="text-cyan-600 w-5 h-5" />, // Branded vs Non-Branded
    title: "Branded vs Non-Branded",
    value: "38% / 62%",
    delta: "",
    description: "Traffic source breakdown by intent",
  },
];

export default function SeoKpiBlock() {
  return (
    <section className="py-10">
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            SEO Performance Overview
          </h2>
          <div className="text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => (
            <Card key={idx} className="p-4 border shadow-md hover:shadow-lg transition-all">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                    {kpi.icon} {kpi.title}
                    <span title={kpi.description}>
                      <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </span>
                  </span>
                  <span
                    className={`text-sm font-semibold ${kpi.delta.startsWith("-") ? "text-red-600" : "text-green-600"}`}
                  >
                    {kpi.delta}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <p className="text-sm text-gray-500 leading-tight">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
