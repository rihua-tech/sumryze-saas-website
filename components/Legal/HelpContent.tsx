"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Book,
  BarChart3,
  CreditCard,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const helpSections = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of Sumryze and set up your first project",
      articles: [
        "Quick Start Guide",
        "Setting up your first website",
        "Understanding your dashboard",
        "Connecting Google Analytics",
        "Adding team members",
      ],
    },
    {
      title: "SEO Reports",
      icon: BarChart3,
      description: "Master SEO analysis and reporting features",
      articles: [
        "Understanding SEO scores",
        "Reading traffic reports",
        "Keyword tracking setup",
        "Core Web Vitals explained",
        "Competitor analysis",
      ],
    },
    {
      title: "Billing & Account",
      icon: CreditCard,
      description: "Manage your subscription and account settings",
      articles: [
        "Upgrading your plan",
        "Managing billing information",
        "Team member permissions",
        "Account security settings",
        "Canceling your subscription",
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I connect my website to Sumryze?",
      answer:
        "Go to Settings → Integrations and add your site URL. We'll start tracking your SEO within 24 hours.",
    },
    {
      question: "What's included in the free plan?",
      answer:
        "Basic SEO monitoring for 1 site, monthly reports, and 10 keyword tracking.",
    },
    {
      question: "How often is my data updated?",
      answer:
        "Daily for most metrics; Core Web Vitals and alerts update in real time on premium plans.",
    },
    {
      question: "Can I export my reports?",
      answer:
        "Yes, export as PDF or CSV (paid plans). Free users can export basic reports monthly.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // ✅ Filtered Sections & FAQs
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return helpSections;
    return helpSections
      .map((section) => ({
        ...section,
        articles: section.articles.filter((a) =>
          a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((s) => s.articles.length > 0);
  }, [searchQuery]);

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    return faqs.filter((f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 space-y-10">
      {/* ✅ Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Search our guides, FAQs, and tutorials to get started.
        </p>

        {/* ✅ Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search articles or FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
          />
        </div>
      </section>

      {/* ✅ Help Sections */}
      {filteredSections.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <article
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.articles.map((a, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                      onClick={() => alert(`Open article: ${a}`)}
                    >
                      {a} <ChevronRight className="h-4 w-4" />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No articles found. Try a different keyword or{" "}
          <a href="#contact" className="text-blue-500 hover:underline">
            contact support
          </a>
          .
        </p>
      )}

      {/* ✅ FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Frequently Asked Questions
        </h2>
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4">
            {filteredFAQs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openFAQ === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-4 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No FAQs match your search.
          </p>
        )}
      </section>

      {/* ✅ Contact Support */}
      <section
        id="contact"
        className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 p-8"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Still need help?
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition">
            <MessageCircle className="h-5 w-5" /> Live Chat
          </button>
          <a
            href="mailto:support@sumryze.com"
            className="flex items-center gap-2 px-8 py-3 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Mail className="h-5 w-5" /> Email
          </a>
        </div>
      </section>
    </div>
  );
}
