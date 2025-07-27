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
    { id: "ai-tracking", title: "3. AI & Tracking Cookies" },
    { id: "gdpr", title: "4. GDPR Compliance" },
    { id: "ccpa", title: "5. CCPA Compliance" },
    { id: "manage", title: "6. How to Manage Cookies" },
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
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const els = document.querySelectorAll("section[id]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
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
          content="Learn how Sumryze uses cookies, including AI-powered tracking, to improve your experience and comply with GDPR & CCPA."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72">
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
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <header className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Cookie className="h-8 w-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy (Summary)</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Learn how we use cookies to enhance your experience, including AI-powered personalization, while
                complying with GDPR and CCPA.
              </p>
              <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              <Section id="intro" title="1. Introduction">
                <p>
                  We use cookies and similar technologies to operate our website, improve user experience, and provide
                  AI-powered SEO insights. Some cookies are essential for functionality; others require your consent.
                </p>
              </Section>

              <Section id="types" title="2. Types of Cookies We Use">
                <table className="w-full border border-gray-200 dark:border-gray-700 text-sm text-left">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">Essential</td>
                      <td className="py-3 px-4">Required for core functionality and security.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">Analytics</td>
                      <td className="py-3 px-4">Helps analyze performance and improve features.</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3 px-4">Advertising</td>
                      <td className="py-3 px-4">Used for personalized ads and retargeting.</td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Section id="ai-tracking" title="3. AI & Tracking Cookies">
                <p>
                  Some cookies enable AI-driven features, like content recommendations and SEO insights. These cookies
                  do not make automated legal or financial decisions but help personalize your experience.
                </p>
              </Section>

              <Section id="gdpr" title="4. GDPR Compliance">
                <p>EU users can accept or reject non-essential cookies at any time via our Cookie Settings page.</p>
              </Section>

              <Section id="ccpa" title="5. CCPA Compliance">
                <p>California residents can opt out of data sharing by adjusting their preferences in Cookie Settings.</p>
              </Section>

              <Section id="manage" title="6. How to Manage Cookies">
                <p>
                  Manage preferences in our{" "}
                  <a href="/cookie-preferences" className="text-blue-600 hover:underline">
                    Cookie Settings
                  </a>{" "}
                  or via your browser. Disabling cookies may limit functionality.
                </p>
              </Section>
            </div>

            <div className="text-center mt-8">
              <a
                href="/legal/cookies/cookies-full"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
              >
                View Full Cookie Policy →
              </a>
            </div>

            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
