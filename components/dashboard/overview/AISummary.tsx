"use client";

import { useState } from "react";
import { RefreshCw, Share2, Award, AlertTriangle, TrendingDown } from "lucide-react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function AISummary() {
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("✅ AI Insights Generated! (Integrate API for real data)");
    } finally {
      setLoading(false);
    }
  };

  const badges = [
    {
      label: "+3 Wins",
      color: "bg-green-50 text-green-700 hover:bg-green-100",
      icon: <Award className="w-4 h-4" />,
      tip: "Your wins improved keyword positions.",
    },
    {
      label: "3 Warnings",
      color: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
      icon: <AlertTriangle className="w-4 h-4" />,
      tip: "Pages with slow LCP and CLS issues.",
    },
    {
      label: "Traffic -12%",
      color: "bg-red-50 text-red-700 hover:bg-red-100",
      icon: <TrendingDown className="w-4 h-4" />,
      tip: "Organic traffic dropped on 3 key pages.",
    },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm p-6"
      style={{
      
        background: "linear-gradient(135deg, #faf7ff 0%, #fdfaff 100%)",

      }}
    >
      {/* ✨ Subtle floating AI effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.2),transparent_70%)] w-[600px] h-[600px] absolute top-[-200px] left-[-200px] blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10 mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AutoAwesomeIcon fontSize="small" className="text-purple-600" />
          AI Summary
        </h2>
        <div className="flex gap-3 mt-3 md:mt-0">
          {/* Ask AI */}
          <button
            onClick={handleAskAI}
            disabled={loading}
            className={`text-sm font-medium flex items-center gap-2 px-5 py-2 rounded-xl shadow-md transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              <>
                <AutoAwesomeIcon fontSize="small" />
                Ask AI
              </>
            )}
          </button>

          {/* Share & Refresh */}
          <button
            className="p-2 rounded-full hover:bg-white/70 bg-white shadow-sm transition"
            title="Share Report"
          >
            <Share2 className="w-5 h-5 text-gray-500" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-white/70 bg-white shadow-sm transition"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Summary Text */}
      <p className="text-gray-800 text-base mb-5 leading-relaxed relative z-10">
        Your <strong>SEO score improved</strong> by <span className="text-green-600 font-semibold">+6</span> this week.
        Traffic dropped <span className="text-red-500 font-semibold">12%</span> on 3 key pages. Focus on improving{" "}
        <strong>LCP</strong> for Core Web Vitals.
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 relative z-10">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-lg cursor-pointer transition ${b.color} shadow-sm hover:shadow-md hover:scale-105`}
            title={b.tip}
          >
            {b.icon} {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
