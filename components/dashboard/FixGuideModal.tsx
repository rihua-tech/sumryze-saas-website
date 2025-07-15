"use client";

import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface FixGuideModalProps {
  suggestion: any;
  onClose: () => void;
}

export default function FixGuideModal({ suggestion, onClose }: FixGuideModalProps) {
  if (!suggestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <Dialog open={true} onClose={onClose} className="relative z-50">
        <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Dialog.Title className="text-xl font-bold text-gray-900">
                Fix Guide: {suggestion.title}
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-1">{suggestion.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Why This Matters</h3>
            <p className="text-sm text-gray-600">
              This issue impacts your site's visibility or performance. Resolving it can improve your SEO score and user experience.
            </p>

            <h3 className="font-medium text-gray-700 mt-4">Fix Steps</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Step 1: Understand the issue context (e.g., slow LCP, missing meta).</li>
              <li>Step 2: Check affected pages or components.</li>
              <li>Step 3: Apply the recommended fix in your code or CMS.</li>
              <li>Step 4: Re-test using Google Lighthouse or PageSpeed Insights.</li>
            </ul>

            <h3 className="font-medium text-gray-700 mt-4">Helpful Tools</h3>
            <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
              <li><a href="https://pagespeed.web.dev" target="_blank">Google PageSpeed Insights</a></li>
              <li><a href="https://www.seoptimer.com/" target="_blank">SEOptimer</a></li>
              <li><a href="https://schema.org" target="_blank">Schema.org Reference</a></li>
            </ul>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
