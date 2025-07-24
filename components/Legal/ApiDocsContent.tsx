"use client";

import { useState } from "react";
import { Book, Key, Globe, Code, Menu, X, ExternalLink } from "lucide-react";
import CodeBlock from "./CodeBlock";

export default function ApiDocsContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  const navigationItems = [
    { id: "introduction", title: "Introduction", icon: Book },
    { id: "authentication", title: "Authentication", icon: Key },
    { id: "endpoints", title: "Endpoints", icon: Globe },
    { id: "examples", title: "Examples", icon: Code },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The Sumryze API allows you to programmatically access SEO data,
              manage websites, and integrate our analytics into your
              applications.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "RESTful API",
                  color: "blue",
                  desc: "Standard HTTP methods with JSON responses",
                },
                {
                  title: "Real-time Data",
                  color: "green",
                  desc: "Access live SEO metrics and analytics",
                },
                {
                  title: "Webhooks",
                  color: "purple",
                  desc: "Get notified of important changes",
                },
              ].map(({ title, color, desc }) => (
                <div
                  key={title}
                  className={`p-6 rounded-lg border bg-${color}-50 dark:bg-${color}-900/20 border-${color}-200 dark:border-${color}-800/30`}
                >
                  <h3
                    className={`font-semibold text-${color}-900 dark:text-${color}-100 mb-2`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm text-${color}-700 dark:text-${color}-300`}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Base URL */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Base URL</h3>
              <CodeBlock code="https://api.sumryze.com/v1" language="URL" id="base-url" />
            </div>
          </section>
        );

      case "authentication":
        return (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold mb-4">Authentication</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sumryze API uses API keys for authentication. Include your API key
              in the Authorization header.
            </p>

            <CodeBlock
              code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
https://api.sumryze.com/v1/websites`}
              language="bash"
              id="auth-example"
            />

            <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-700 rounded-lg">
              <strong className="text-red-700 dark:text-red-300">
                ⚠️ Security:
              </strong>{" "}
              Never expose your API key in client-side code.
            </div>
          </section>
        );

      case "endpoints":
        return (
          <section>
            <h2 className="text-3xl font-bold mb-4">Endpoints</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Complete reference of all available endpoints in the Sumryze API.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 space-y-2">
              <p className="font-mono text-sm">GET /websites — List all websites</p>
              <p className="font-mono text-sm">POST /websites — Add new website</p>
              <p className="font-mono text-sm">GET /reports/{`{website_id}`} — SEO Report</p>
            </div>
          </section>
        );

      case "examples":
        return (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold mb-4">Examples</h2>
            <CodeBlock
              code={`fetch('https://api.sumryze.com/v1/websites', {
  method: 'GET',
  headers: { Authorization: 'Bearer YOUR_API_KEY' }
});`}
              language="javascript"
              id="example-js"
            />
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-74 bg-white  dark:bg-[#12141C] border-t border-gray-200 dark:border-[#2C2F36] z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <span className="font-semibold text-gray-900 dark:text-white">
            API Docs
          </span>
          <button onClick={() => setSidebarOpen(false)} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="p-4 pt-10 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      

          
            <main className="flex-1 px-5 py-6">
            <div className="max-w-7xl mx-auto space-y-8">

          {/* Mobile Toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border rounded-lg"
          >
            <Menu className="h-5 w-5" /> Navigation
          </button>

          {/* Dynamic Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            {renderContent()}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Ready to get started?</h2>
            <button className="px-6 py-3 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center mx-auto">
              View Full API Reference <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
