"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  AlertCircle,
  BarChart4,
  Globe,
  Bell,
  LineChart,
  ClipboardCheck,
  LayoutTemplate,
  FileText,
  Users,
} from "lucide-react";

export default function QuickSetup() {
  const [clientName, setClientName] = useState("Acme Inc.");
  const [gaConnected, setGaConnected] = useState(false);
  const [siteUrl, setSiteUrl] = useState("https://acme.com");
  const [reportReady, setReportReady] = useState(false);

  const statusBg = {
    completed: "bg-green-50 border border-green-200",
    active: "bg-blue-50 border border-blue-200",
    inactive: "bg-gray-50 border border-gray-200",
  };

  const steps = [
    {
      title: "Add New Client",
      description: clientName ? `Client: ${clientName}` : "Not set",
      icon: <Globe className="w-5 h-5 text-green-600" />,
      status: "completed",
      action: null,
    },
    {
      title: "Connect GA4",
      description: gaConnected ? "Linked" : "Not Connected",
      icon: gaConnected ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <BarChart4 className="w-5 h-5 text-blue-600" />
      ),
      status: gaConnected ? "completed" : "active",
      action: (
        <button
          onClick={() => setGaConnected(true)}
          className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-700"
        >
          Connect
        </button>
      ),
    },
    {
      title: "Add Website URL",
      description: siteUrl ? `${siteUrl} added` : "Missing",
      icon: siteUrl ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <AlertCircle className="w-5 h-5 text-gray-500" />
      ),
      status: siteUrl ? "completed" : "inactive",
      action: null,
    },
    {
      title: "Choose Report Template",
      description: "Select SEO Audit, KPI Summary, or Custom",
      icon: <LayoutTemplate className="w-5 h-5 text-indigo-500" />,
      status: "inactive",
      action: (
        <button className="text-xs font-semibold text-indigo-600 underline">
          Pick
        </button>
      ),
    },
    {
      title: "Choose Output Format",
      description: "PDF, Notion, Email, or SVG",
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      status: "inactive",
      action: (
        <button className="text-xs font-semibold text-indigo-600 underline">
          Choose
        </button>
      ),
    },
    {
      title: "Add Email Recipients",
      description: "Who should get these reports?",
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      status: "inactive",
      action: (
        <button className="text-xs font-semibold text-indigo-600 underline">
          Add
        </button>
      ),
    },
    {
      title: "Generate First Report",
      description: reportReady ? "Report ready" : "Missing data",
      icon: reportReady ? (
        <ClipboardCheck className="w-5 h-5 text-green-600" />
      ) : (
        <LineChart className="w-5 h-5 text-gray-500" />
      ),
      status: reportReady ? "completed" : "inactive",
      action: !reportReady ? (
        <button
          onClick={() => setReportReady(true)}
          className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-indigo-700"
        >
          Run
        </button>
      ) : null,
    },
    {
      title: "Enable White-Label Branding",
      description: "Optional customization",
      icon: <Bell className="w-5 h-5 text-gray-500" />,
      status: "inactive",
      action: (
        <button className="bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-gray-300">
          Setup
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-1">
        💡 Quick Setup
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        Complete these steps to get the most out of Sumryze
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-4 py-3 rounded-lg ${statusBg[step.status as keyof typeof statusBg]}`}
          >
            <div className="flex items-center gap-3">
              {step.icon}
              <div>
                <h4 className="text-sm font-medium text-slate-800">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500">{step.description}</p>
              </div>
            </div>
            {step.action && <div>{step.action}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
