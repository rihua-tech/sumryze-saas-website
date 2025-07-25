"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { Calendar, Scale } from "lucide-react";
import clsx from "clsx";

export default function TermsSummaryPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By using Sumryze, you agree to our Terms. If you do not agree, please discontinue use of our platform.",
    },
    {
      id: "service",
      title: "2. Description of Service",
      content:
        "Sumryze provides SEO analytics, AI-powered recommendations, and automated reports for agencies and businesses.",
    },
    {
      id: "billing",
      title: "3. Payment and Billing",
      content:
        "Services are subscription-based. Fees are billed monthly or annually in advance. Refund policy applies as per your plan.",
    },
    {
      id: "privacy",
      title: "4. Privacy and Data Protection",
      content:
        'Your data is handled per our <a href="/legal/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.',
    },
    {
      id: "law",
      title: "5. Governing Law",
      content:
        "These Terms are governed by California law and subject to arbitration.",
    },
  ];

  const [activeSection, setActiveSection] = useState("acceptance");
  const [manualActive, setManualActive] = useState(false);

  // ✅ Scroll Spy
  useEffect(() => {
    if (manualActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [manualActive]);

  // ✅ Scroll to Section
  const scrollToSection = useCallback((id: string) => {
    setManualActive(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }

    setTimeout(() => setManualActive(false), 1000);
  }, []);

  return (
    <>
      {/* ✅ SEO */}
      <Head>
        <title>Terms of Service | Sumryze</title>
        <meta
          name="description"
          content="Summary of Sumryze's Terms of Service: Learn your rights and responsibilities when using our SEO automation tools."
        />
        <link rel="canonical" href="https://sumryze.com/legal/terms" />
        <meta property="og:title" content="Terms of Service | Sumryze" />
        <meta
          property="og:description"
          content="Understand Sumryze's Terms of Service including payment, privacy, and compliance details."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms of Service",
              url: "https://sumryze.com/legal/terms",
              description:
                "Summary of Sumryze's Terms of Service: Learn your rights and responsibilities when using our SEO automation tools.",
            }),
          }}
        />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Table of Contents */}
          <aside className="hidden lg:block w-72">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Summary Sections
              </h3>
              <nav className="space-y-2" aria-label="Table of contents">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition border-l-4",
                      activeSection === item.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-semibold border-blue-500"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-transparent"
                    )}
                    aria-current={activeSection === item.id ? "true" : undefined}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ✅ Main Content */}
          <div className="flex-1">
            {/* Header */}
            <header className="text-center mb-10">
              <Scale className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Terms of Service (Summary)
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mt-2 text-sm">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
            </header>

            {/* Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 space-y-10">
              {sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {sec.title}
                  </h2>
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-4 mt-2"></div>
                  <p
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </section>
              ))}
            </div>

            {/* ✅ CTA */}
            <div className="text-center mt-8">
              <a
                href="/legal/terms/terms-full"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-all"
              >
                View Full Terms →
              </a>
            </div>

            {/* ✅ Related Links */}
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>{" "}
              |{" "}
              <a href="/legal/privacy/privacy-full" className="text-blue-600 hover:underline">
                Full Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
