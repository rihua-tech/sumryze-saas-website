"use client";

import dynamic from "next/dynamic";
import React from "react";


// Placeholder visual components — replace with real ones
const TrafficChart = dynamic(() => import("@/components/dashboard/overview/TrafficChart"), { ssr: false });
const KeywordGrowthChart = dynamic(() => import("@/components/dashboard/overview/KeywordGrowthChart"), { ssr: false });
const TopPagesChart = dynamic(() => import("@/components/dashboard/overview/TopPagesChart"), { ssr: false });
const CoreVitalsGauge = dynamic(() => import("@/components/dashboard/overview/CoreVitalsGauge"), { ssr: false });


const VitalsGauge = () => <div className="h-32 bg-gray-100 rounded-md" />;
const PieChartLegend = () => <div className="h-32 bg-gray-100 rounded-md" />;
const StackedBarChart = () => <div className="h-32 bg-gray-100 rounded-md" />;
const IssueTimeline = () => <div className="h-32 bg-gray-100 rounded-md" />;

export default function DashboardPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[1440px] mx-auto space-y-8">
      {/* AI Summary */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">AI Summary</h2>
          <div className="flex gap-2">
            <button className="text-sm font-medium px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Ask AI Summary
            </button>
            <button className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              Share Report
            </button>
          </div>
        </div>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>+3 Wins this period</li>
          <li>+3 Warnings / Red Flags</li>
          <li>"Traffic dropped 12% — top reason: organic loss on 3 key pages"</li>
        </ul>
      </Card>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI title="SEO Score" value="78/100" delta="+6" />
        <KPI title="Top Performing Pages" value="5" delta="+2" />
        <KPI title="Conversions" value="3.4%" delta="-1%" />
        <KPI title="Revenue" value="$12,847" delta="+15%" />
      </section>

      {/* Main Data Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       

        <Card>
  <TrafficChart />
</Card>

<Card>
  <KeywordGrowthChart />
</Card>

<Card>
  <TopPagesChart />
</Card>

<Card>
  <CoreVitalsGauge />
</Card>


        <Card title="Traffic by Channel">
          <PieChartLegend />
        </Card>

        <Card title="AI Quick Fixes">
          <ul className="space-y-3">
            <QuickFixItem title="Fix Page Speed" impact="High" score="+15%" time="~2h" />
            <QuickFixItem title="Add Meta Descriptions" impact="Medium" score="+8%" time="~1h" />
          </ul>
        </Card>
      </section>

      {/* Bottom Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card title="Ranking Distribution">
          <StackedBarChart />
        </Card>
        <Card title="Issue Timeline">
          <IssueTimeline />
        </Card>
      </section>

      {/* Footer CTA */}
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <button className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm">
          Download Full Report
        </button>
        <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm">
          Go to Technical Dashboard
        </button>
      </div>
    </main>
  );
}

// ✅ Reusable KPI Card
function KPI({ title, value, delta }: { title: string; value: string; delta: string }) {
  const isPositive = delta.startsWith("+");
  return (
    <Card>
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-500"}`}>
        {isPositive ? "▲" : "▼"} {delta}
      </div>
    </Card>
  );
}

// ✅ Generic Card Wrapper with Consistent Border
function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-3">
      {title && <h3 className="text-sm font-semibold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}

// ✅ Quick Fix Item
function QuickFixItem({ title, impact, score, time }: { title: string; impact: string; score: string; time: string }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg flex flex-col gap-1 border border-gray-200">
      <div className="flex justify-between text-sm font-medium text-gray-800">
        <span>{title}</span>
        <span
          className={`text-xs font-semibold ${
            impact === "High" ? "text-red-600" : impact === "Medium" ? "text-yellow-600" : "text-gray-500"
          }`}
        >
          {impact} Impact
        </span>
      </div>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{score} SEO</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
