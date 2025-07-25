"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Calendar, Shield, Download } from "lucide-react";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
      {children}
    </div>
  </section>
);

export default function PrivacyFullPolicyPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Your Information" },
    { id: "retention", title: "4. Data Retention" },
    { id: "third-party", title: "5. Third-Party Processors" },
    { id: "international", title: "6. International Transfers" },
    { id: "automated", title: "7. Automated Decision Making" },
    { id: "rights", title: "8. Your Rights & Contact Information" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [manualActive, setManualActive] = useState(false);

  // ✅ Scroll Spy with Manual Lock
  useEffect(() => {
    if (manualActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [manualActive]);

  // ✅ Scroll to Section with Lock
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
        <title>Full Privacy Policy | Sumryze</title>
        <meta
          name="description"
          content="Comprehensive Privacy Policy covering data collection, retention, GDPR/CCPA compliance, and your rights."
        />
        <link rel="canonical" href="https://sumryze.com/legal/privacy-full" />
        <meta property="og:title" content="Full Privacy Policy | Sumryze" />
        <meta
          property="og:description"
          content="Comprehensive Privacy Policy with GDPR & CCPA compliance details."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/privacy-og.png" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Table of Contents */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition",
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ✅ Main Content */}
          <div className="flex-1">
            <header className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Full Privacy Policy
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Learn how Sumryze collects, uses, and protects your data under GDPR & CCPA compliance.
              </p>
              <div className="mt-2 text-gray-500 text-sm flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last updated: {lastUpdated}
              </div>
              <div className="mt-6">
                <a
                  href="/docs/sumryze-privacy-policy.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </header>

            {/* ✅ Full Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              <Section id="introduction" title="1. Introduction">
                <p>
                  We value your privacy and ensure your personal information is processed securely and transparently.
                </p>
              </Section>

              <Section id="information" title="2. Information We Collect">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email, and contact information</li>
                  <li>Usage data (pages visited, analytics)</li>
                  <li>Cookies for session and performance</li>
                </ul>
              </Section>

              <Section id="usage" title="3. How We Use Your Information">
                <p>
                  Provide and improve services, personalize user experience, and ensure compliance with legal requirements.
                </p>
              </Section>

              <Section id="retention" title="4. Data Retention">
                <p>
                  We retain personal data only as long as necessary for legitimate business purposes or as required by law.
                </p>
              </Section>

              <Section id="third-party" title="5. Third-Party Processors">
                <p>
                  We share data only with trusted service providers under strict agreements.
                </p>
              </Section>

              <Section id="international" title="6. International Transfers">
                <p>
                  Data may be transferred internationally under GDPR safeguards.
                </p>
              </Section>

              <Section id="automated" title="7. Automated Decision Making">
                <p>
                  AI is used to generate SEO reports but does not make binding decisions.
                </p>
              </Section>

              <Section id="rights" title="8. Your Rights & Contact Information">
                <p>
                  You have the right to access, correct, or delete your data. Contact us at{" "}
                  <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
                    privacy@sumryze.com
                  </a>.
                </p>
              </Section>


                {/* ✅ Related Links */}
        
            
            </div>
  <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">
                Simplified Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              |{" "}
              <a href="/legal/cookies-full" className="text-blue-600 hover:underline">
                Cookie Policy
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
