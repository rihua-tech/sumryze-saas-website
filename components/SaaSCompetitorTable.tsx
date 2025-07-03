"use client";


import { CheckCircle, XCircle, Check, X, AlertCircle } from "lucide-react"

import * as React from "react";



// ✅ 1. 给 iconMap 添加类型注解
const iconMap: Record<"check" | "x" | "alert", React.ReactElement> = {
  check: (
    <CheckCircle className="w-5 h-5 text-green-600 mx-auto">
      <title>Available</title>
    </CheckCircle>
  ),
  x: (
    <XCircle className="w-5 h-5 text-red-500 mx-auto">
      <title>Not available</title>
    </XCircle>
  ),
  alert: (
    <AlertCircle className="w-5 h-5 text-yellow-500 mx-auto">
      <title>Limited</title>
    </AlertCircle>
  ),
};



// 定义图标类型
type IconKey = "check" | "x" | "alert";

// 工具类型
type Tool = {
  name: string;
  price: string;
  ai: IconKey;
  whiteLabel: IconKey;
  auto: IconKey;
  format: IconKey;
  clients: string;
  trial: string;
  team: string;
};

// 工具列表数据
const tools: Tool[] = [
  {
    name: "Sumryze",
    price: "$49",
    ai: "check",
    whiteLabel: "check",
    auto: "check",
    format: "check",
    clients: "Starter: 5 clients",
    trial: "14-day free trial",
    team: "Pro plan only",
  },
  {
    name: "DashThis",
    price: "$39",
    ai: "x",
    whiteLabel: "check",
    auto: "check",
    format: "check",
    clients: "Tier-based",
    trial: "15-day free trial",
    team: "Supported",
  },
  {
    name: "AgencyAnalytics",
    price: "$49",
    ai: "x",
    whiteLabel: "check",
    auto: "check",
    format: "check",
    clients: "Tier-based",
    trial: "14-day free trial",
    team: "Supported",
  },
  {
    name: "SE Ranking",
    price: "$49",
    ai: "alert",
    whiteLabel: "check",
    auto: "alert",
    format: "check",
    clients: "Tier-based",
    trial: "14-day free trial",
    team: "Partial",
  },
  {
    name: "Surfer SEO",
    price: "$89",
    ai: "check",
    whiteLabel: "x",
    auto: "x",
    format: "alert",
    clients: "1 website minimum",
    trial: "7-day refund policy",
    team: "Not supported",
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-20 px-4 md:px-8">

      <h2 id="comparison" className="text-3xl md:text-4xl font-extrabold text-center mb-4">
        How does Sumryze compare to other tools?
      </h2>
      
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        See how Sumryze stacks up against the competition in features, automation, and AI insights.
      </p>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block max-w-screen-xl mx-auto overflow-x-auto border rounded-xl shadow-sm">
        <table className="min-w-full text-sm md:text-base text-left">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-center">
            <tr>
              <th className="p-4">Tool Name</th>
              <th className="p-4">Starting Price</th>
              <th className="p-4">AI Analysis</th>
              <th className="p-4">White-Label Support</th>
              <th className="p-4">Automated Reporting</th>
              <th className="p-4">Report Formats</th>
              <th className="p-4">Client Limit</th>
              <th className="p-4">Trial Policy</th>
              <th className="p-4">Team Collaboration</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {tools.map((tool, i) => (
              <tr key={i}className="border-t even:bg-gray-50 transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-sm"
    >

                <td className="p-4 font-medium text-left">{tool.name}</td>
                <td className="p-4">{tool.price}</td>
                <td className="p-4">{iconMap[tool.ai]}</td>
                <td className="p-4">{iconMap[tool.whiteLabel]}</td>
                <td className="p-4">{iconMap[tool.auto]}</td>
                <td className="p-4">{iconMap[tool.format]}</td>
                <td className="p-4">{tool.clients}</td>
                <td className="p-4">{tool.trial}</td>
                <td className="p-4">{tool.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      {/* ✅ Mobile Cards (Optimized with spacing) */}
<div className="block md:hidden space-y-6 max-w-xl mx-auto">
  {tools.map((tool, i) => (
    <div key={i}   
    className="border border-gray-200 rounded-lg p-5 bg-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1" >
     

      <h3 className="text-lg font-semibold mb-4">{tool.name}</h3>
      <ul className="text-sm space-y-3">
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Starting Price:</span>
          <span>{tool.price}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">AI Analysis:</span>
          <span>{iconMap[tool.ai]}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">White-Label Support:</span>
          <span>{iconMap[tool.whiteLabel]}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Automated Reporting:</span>
          <span>{iconMap[tool.auto]}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Report Formats:</span>
          <span>{iconMap[tool.format]}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Client Limit:</span>
          <span>{tool.clients}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Trial Policy:</span>
          <span>{tool.trial}</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="font-medium min-w-[160px]">Team Collaboration:</span>
          <span>{tool.team}</span>
        </li>
      </ul>
    </div>
  ))}
</div>


    </section>
  );
}
