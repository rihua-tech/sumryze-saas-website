"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports for dashboard widgets
const TrafficChart = dynamic(() => import("@/components/dashboard/overview/TrafficChart"), { ssr: false });
const CoreVitalsGauge = dynamic(() => import("@/components/dashboard/overview/CoreVitalsGauge"), { ssr: false });
const KeywordGrowthChart = dynamic(() => import("@/components/dashboard/overview/KeywordGrowthChart"), { ssr: false });
const TopPagesChart = dynamic(() => import("@/components/dashboard/overview/TopPagesChart"), { ssr: false });
const TrafficByChannel = dynamic(() => import("@/components/dashboard/overview/TrafficByChannel"), { ssr: false });
const BacklinkSummary = dynamic(() => import("@/components/dashboard/overview/BacklinkSummary"), { ssr: false });
const ConversionFunnel = dynamic(() => import("@/components/dashboard/overview/ConversionFunnel"), { ssr: false });
const AIPredictions = dynamic(() => import("@/components/dashboard/overview/AIPredictions"), { ssr: false });
const AISuggestions = dynamic(() => import("@/components/dashboard/overview/AISuggestions"), { ssr: false });
const AISummary = dynamic(() => import("@/components/dashboard/overview/AISummary"), { ssr: false });
const KPISection = dynamic(() => import("@/components/dashboard/overview/KPISection"), { ssr: false });

export default function DashboardPage() {
  const [shareModalOpen, setShareModalOpen] = React.useState(false);

  return (
    <main className="px-4 sm:px-6 lg:px-8 w-full max-w-[1440px] mx-auto mb-10 space-y-6">
      {/* ✅ AI Summary Section */}
      <AISummary />

      {/* ✅ KPI Section */}
      <KPISection />

      {/* ✅ Main Dashboard Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card><TrafficChart /></Card>
        <Card><KeywordGrowthChart /></Card>
        <Card><AISuggestions /></Card>
        <Card><CoreVitalsGauge /></Card>
        <Card><TrafficByChannel /></Card>
        <Card><AIPredictions /></Card>
        <Card><TopPagesChart /></Card>
        <Card><BacklinkSummary /></Card>
        <Card><ConversionFunnel /></Card>
      </section>

      {/* ✅ Footer CTA */}
{/* Footer CTA */}
<div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 mt-8 shadow-sm">
  {/* Left Info */}
  <div className="text-center sm:text-left mb-4 sm:mb-0">
    <h4 className="text-base font-semibold text-gray-900">Ready to take the next step?</h4>
    <p className="text-sm text-gray-600">Share, download, or dive deeper into your technical SEO dashboard.</p>
  </div>

  {/* Actions */}
  <div className="flex flex-wrap gap-3 justify-center">
    {/* Share Report */}
    <button
      onClick={() => setShareModalOpen(true)}
      className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:border-indigo-300 text-sm font-medium transition-all duration-200"
    >
      {/* ✅ Correct Arrow Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
      </svg>
      Share Report
    </button>

    {/* Download Report */}
    <button
      onClick={() => alert("Downloading report...")}
      className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:border-indigo-300 text-sm font-medium transition-all duration-200"
    >
      {/* ✅ Plus Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Download Report
    </button>

    {/* ✅ Go to SEO Dashboard */}
    <button
      onClick={() => alert("Redirecting to SEO Dashboard...")}
      className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02] text-sm font-semibold shadow-md transition-all duration-200"
    >
      {/* Right Arrow Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      Go to SEO Dashboard
    </button>
  </div>
</div>




      {/* ✅ Share Modal with Framer Motion Animation */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg w-[400px]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Share Report</h3>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Report shared!");
                    setShareModalOpen(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Or copy link:{" "}
                <span className="text-indigo-600 cursor-pointer hover:underline">Copy</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
