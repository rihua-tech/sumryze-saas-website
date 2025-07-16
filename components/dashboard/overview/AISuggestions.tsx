"use client";

import React, { useState } from "react";
import { Flame, Zap, Wrench, X } from "lucide-react";

export default function AISuggestions() {
  const suggestions = [
    {
      id: 1,
      icon: <Flame className="text-red-500 w-5 h-5" />,
      title: "Fix Page Speed",
      seoImpact: "+15% SEO",
      impactLevel: "High Impact",
      impactColor: "text-red-500",
      guide: [
        "Compress large images to reduce load time.",
        "Enable browser caching for static resources.",
        "Use a CDN to deliver assets faster.",
      ],
    },
    {
      id: 2,
      icon: <Zap className="text-yellow-500 w-5 h-5" />,
      title: "Add Meta Descriptions",
      seoImpact: "+8% SEO",
      impactLevel: "Medium Impact",
      impactColor: "text-yellow-500",
      guide: [
        "Add unique meta descriptions to all pages.",
        "Include your main keyword naturally.",
        "Keep descriptions under 160 characters.",
      ],
    },
    {
      id: 3,
      icon: <Wrench className="text-blue-500 w-5 h-5" />,
      title: "Implement Schema Markup",
      seoImpact: "+5% SEO",
      impactLevel: "Low Impact",
      impactColor: "text-blue-500",
      guide: [
        "Add JSON-LD schema for your main pages.",
        "Validate schema with Google’s Rich Results tool.",
        "Use structured data for reviews and products.",
      ],
    },
  ];

  const [selectedGuide, setSelectedGuide] = useState<any>(null);

  return (
    <div className=" p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">AI Suggestions</h3>

      {/* Suggestion List */}
      <div className="flex flex-col gap-4">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Left Section */}
            <div className="flex items-start gap-3">
              {s.icon}
              <div>
                <p className="font-medium text-sm text-gray-800">{s.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600 font-semibold">{s.seoImpact}</span>
                  {" • "}
                  <span className={`${s.impactColor} font-semibold`}>{s.impactLevel}</span>
                </p>
              </div>
            </div>

            {/* Fix Guide Button */}
            <button
              onClick={() => setSelectedGuide(s)}
              className="text-xs font-medium text-indigo-600 hover:underline"
            >
              Fix Guide →
            </button>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-4">
        <button className="text-indigo-600 font-medium text-sm hover:underline">
          View All Suggestions →
        </button>
      </div>

      {/* Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative transform animate-scaleIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedGuide(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedGuide.title}</h3>
            <p className="text-sm text-gray-500 mb-4">Follow these steps to fix the issue:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {selectedGuide.guide.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedGuide(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
