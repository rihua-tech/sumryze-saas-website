"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Calendar, Shield, Settings } from "lucide-react";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 space-y-6">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </section>
);

export default function PrivacyFullPolicyPage() {
  const lastUpdated = "June 1, 2024";

  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "collect", title: "2. Information We Collect" },
    { id: "use", title: "3. How We Use Your Information" },
    { id: "storage", title: "4. Data Storage & Security" },
    { id: "sharing", title: "5. Information Sharing" },
    { id: "rights", title: "6. Your Rights & Choices" },
    { id: "transfers", title: "7. International Transfers" },
    { id: "children", title: "8. Children’s Privacy" },
    { id: "changes", title: "9. Changes to This Policy" },
    { id: "contact", title: "10. Contact Us" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [manualActive, setManualActive] = useState(false);

  // ✅ Scroll Spy with Manual Lock
  useEffect(() => {
    if (manualActive) return;

    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [manualActive, sections]);

  // ✅ Scroll to Section with Lock
  const scrollToSection = useCallback((id: string) => {
    setManualActive(true);
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      const offset = document.querySelector("header")?.clientHeight || 80;
      const position = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }

    // ✅ Unlock after smooth scroll
    setTimeout(() => setManualActive(false), 1000);
  }, []);

  return (
    <>
      {/* ✅ SEO Metadata */}
      <Head>
        <title>Privacy Policy | Sumryze</title>
        <meta
          name="description"
          content="Full Privacy Policy of Sumryze. Learn how we collect, use, and protect your data in compliance with GDPR and CCPA."
        />
        <link rel="canonical" href="https://sumryze.com/legal/privacy-full" />
        <meta property="og:title" content="Privacy Policy | Sumryze" />
        <meta
          property="og:description"
          content="Full Privacy Policy for GDPR & CCPA compliance. Learn about data collection, rights, and security practices."
        />
        <meta property="og:url" content="https://sumryze.com/legal/privacy-full" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Sidebar Table of Contents */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition",
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

          {/* ✅ Main Content */}
          <div className="flex-1">
            <header className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Learn how we collect, use, and protect your data in compliance with global privacy regulations.
              </p>
              <div className="mt-2 text-gray-500 dark:text-gray-400 text-sm flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
            </header>

            {/* ✅ Policy Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              <Section id="intro" title="1. Introduction">
                <p>
                  At Sumryze, your privacy is our priority. This policy explains how we handle your personal information responsibly.
                </p>
              </Section>

              <Section id="collect" title="2. Information We Collect">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal details (name, email, account info)</li>
                  <li>Usage data (logs, analytics)</li>
                  <li>Device & browser information</li>
                </ul>
              </Section>

              <Section id="use" title="3. How We Use Your Information">
                <p>We use your data to improve services, personalize experiences, and ensure security compliance.</p>
              </Section>

              <Section id="storage" title="4. Data Storage & Security">
                <p>We use encryption and secure hosting for all user data, adhering to industry standards.</p>
              </Section>

              <Section id="sharing" title="5. Information Sharing">
                <p>We do not sell your data. Limited sharing occurs with trusted partners for operational purposes.</p>
              </Section>

              <Section id="rights" title="6. Your Rights & Choices">
                <p>Access, correct, delete, or export your data anytime. Opt out of marketing emails easily.</p>
              </Section>

              <Section id="transfers" title="7. International Transfers">
                <p>Your data may be processed globally but under strict compliance measures.</p>
              </Section>

              <Section id="children" title="8. Children’s Privacy">
                <p>Our services are not directed to children under 13. We do not knowingly collect their data.</p>
              </Section>

              <Section id="changes" title="9. Changes to This Policy">
                <p>We may update this policy periodically. Significant changes will be notified via email or app alert.</p>
              </Section>

              <Section id="contact" title="10. Contact Us">
                <p>
                  Email us at{" "}
                  <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
                    privacy@sumryze.com
                  </a>
                </p>
              </Section>
            </div>
          </div>
        </div>

        {/* ✅ Sticky Manage Preferences CTA */}
        <div className="fixed bottom-6 right-6">
          <a
            href="/cookie-preferences"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg transition"
          >
            <Settings className="h-5 w-5" />
            Manage Cookie Preferences
          </a>
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
