"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Calendar, Cookie } from "lucide-react";

export default function CookieSummaryPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "types", title: "2. Types of Cookies We Use" },
    { id: "gdpr", title: "3. GDPR Compliance" },
    { id: "ccpa", title: "4. CCPA Compliance" },
    { id: "manage", title: "5. How to Manage Cookies" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

  
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible && window.scrollY > 100) {
        setActiveSection(visible.target.id);
      }
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  const els = document.querySelectorAll("section[id]");
  els.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);



  const scrollToSection = (id: string) => {
  setActiveSection(id); // ✅ Set active immediately
  const el = document.getElementById(id);
  if (el) {
    const offset = 80; // Adjust if you have a sticky header
    const position = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: "smooth" });
  }
};


  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">{children}</div>
    </section>
  );

  return (
    <>
      <Head>
        <title>Cookie Policy (Summary) | Sumryze</title>
        <meta
          name="description"
          content="Understand how Sumryze uses cookies, types of cookies, and how you can manage them in compliance with GDPR & CCPA."
        />
        <link rel="canonical" href="https://sumryze.com/legal/cookies" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Summary Sections</h3>
              <nav className="space-y-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg font-medium transition",
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
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
              <div className="flex items-center justify-center gap-3 mb-4">
                <Cookie className="h-8 w-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy (Summary)</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Learn how we use cookies to improve user experience and comply with privacy regulations.
              </p>
              <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
            </header>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              <Section id="intro" title="1. Introduction">
                <p>
                  We use cookies to enhance your experience, analyze site performance, and ensure compliance with
                  privacy laws such as GDPR and CCPA.
                </p>
              </Section>

              <Section id="types" title="2. Types of Cookies We Use">
                <table className="w-full border border-gray-200 dark:border-gray-700 text-sm text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                      <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium">Essential</td>
                      <td className="py-3 px-4">Required for core site functionality.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium">Analytics</td>
                      <td className="py-3 px-4">Tracks usage and helps improve performance.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4 font-medium">Advertising</td>
                      <td className="py-3 px-4">Provides personalized ads and marketing.</td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Section id="gdpr" title="3. GDPR Compliance">
                <p>
                  EU users can consent to or withdraw cookie usage at any time, and request deletion of personal data.
                </p>
              </Section>

              <Section id="ccpa" title="4. CCPA Compliance">
                <p>
                  California residents have the right to opt out of data sales and request disclosure of data collected.
                </p>
              </Section>

              <Section id="manage" title="5. How to Manage Cookies">
                <p>
                  Manage your preferences via our{" "}
                  <a href="/cookie-preferences" className="text-blue-600 hover:underline">
                    Cookie Settings
                  </a>{" "}
                  or adjust your browser settings. Disabling some cookies may affect functionality.
                </p>
              </Section>
            </div>

            <div className="text-center mt-8">
              <a
              href="/legal/cookies/cookies-full"
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-gray-100 font-medium rounded-lg transition"
             >
           View Full Cookies
            </a>
           </div>

            {/* Footer Links */}
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              |{" "}
              <a href="/legal/privacy/privacy-full" className="text-blue-600 hover:underline">
                Full privacy
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
