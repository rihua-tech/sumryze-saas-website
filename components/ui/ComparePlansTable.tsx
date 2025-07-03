
"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function ComparePlansTable() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = ["Starter", "Pro", "Enterprise"];
  const planLinks = [
    "/signup?plan=starter",
    "/signup?plan=pro",
    "/signup?plan=enterprise",
  ];

  const features = [
    { name: "Monthly Reports", values: ["5", "25", "100+"] },
    { name: "White-Label Branding", values: [false, true, true] },
    { name: "AI-Powered Insights", values: [true, true, true] },
    { name: "Multi-format Exports", values: [false, true, true] },
    { name: "Custom Branding", values: [false, false, true] },
    { name: "Priority Support", values: [false, true, true] },
    { name: "Advanced Automation", values: [false, false, true] },
    { name: "API Access", values: [false, false, true] },
    { name: "Historical Data", values: [false, false, true] },
    { name: "Full White-Label (Domain, Logo)", values: [false, false, true] },
    {
      name: isYearly ? "Price (Yearly)" : "Price (Monthly)",
      values: isYearly
        ? ["$39/mo", "$79/mo", "$159/mo"]
        : ["$49/mo", "$99/mo", "$199/mo"],
    },
    {
      name: "CTA",
      values: plans.map((_, i) => (
        <Link
          key={i}
          href={planLinks[i]}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {i === 0
            ? "Start Free"
            : i === 1
            ? "Try Pro"
            : "Start Free Trial"}
        </Link>
      )),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-10">
          Compare All Plans
        </h2>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center border rounded-full overflow-hidden">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                !isYearly ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                isYearly ? "bg-blue-600 text-white" : "text-gray-700"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="text-green-500 ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border shadow">
          <table className="min-w-full table-fixed text-sm text-center">
            <thead className="bg-gray-100 text-gray-700 text-lg font-bold">
              <tr>
                <th className="p-4 w-1/4 text-left">Feature / Plan</th>
                {plans.map((plan, idx) => (
                  <th key={idx} className="p-4 w-1/4">
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {features.map((feature, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 text-left text-gray-800 text-[15px] font-normal md:text-base">
                    {feature.name}
                  </td>
                  {feature.values.map((val, colIdx) => (
                    <td key={colIdx} className="p-4">
                      {val === true ? (
                        <CheckCircle className="text-emerald-500 inline w-5 h-5" />
                      ) : val === false ? (
                        <XCircle className="text-gray-300 inline w-5 h-5" />
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
