"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { Download, Cookie, GlobeLock, Settings } from "lucide-react";
import clsx from "clsx";
import jsPDF from "jspdf";

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
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
  </section>
);

export default function CookiesFullPolicyPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "types", title: "2. Types of Cookies We Use" },
    { id: "ai-cookies", title: "3. AI & Tracking Cookies" },
    { id: "gdpr", title: "4. GDPR Compliance" },
    { id: "ccpa", title: "5. CCPA Compliance" },
    { id: "manage", title: "6. How to Manage Cookies" },
    { id: "contact", title: "7. Contact Information" },
  ];

  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  // ✅ Scroll Spy
  useEffect(() => {
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
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = document.querySelector("header")?.clientHeight || 80;
    const position = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: "smooth" });
  }, []);

  // ✅ Dynamic PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Full Cookie Policy - Sumryze", 40, 50);
    doc.setFontSize(12);
    doc.text(`Last Updated: ${lastUpdated}`, 40, 70);

    let y = 100;

    // Extract from DOM dynamically
    const allSections = document.querySelectorAll("section");
    allSections.forEach((section: any) => {
      const title = section.querySelector("h2")?.textContent || "";
      const content = section.querySelector("div")?.innerText || "";

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 40, y);
      y += 20;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const splitContent = doc.splitTextToSize(content, 500);
      splitContent.forEach((line: string) => {
        if (y > 750) {
          doc.addPage();
          y = 40;
        }
        doc.text(line, 40, y);
        y += 15;
      });
      y += 15;
    });

    // Footer
    doc.setFontSize(10);
    doc.text("© 2024 Sumryze Inc. | All rights reserved", 40, 800);

    doc.save("Sumryze-Cookie-Policy.pdf");
  };

  return (
    <>
      <Head>
        <title>Full Cookie Policy | Sumryze</title>
        <meta
          name="description"
          content="Comprehensive Cookie Policy for Sumryze covering GDPR & CCPA compliance, AI cookie usage, and user rights."
        />
        <link rel="canonical" href="https://sumryze.com/legal/cookies-full" />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ TOC */}
          <aside className="hidden lg:block w-64">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 transition",
                      activeSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900 text-blue-600 font-semibold border-l-4 border-blue-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
                <Cookie className="h-8 w-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Full Cookie Policy</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                How Sumryze uses cookies for functionality, analytics, and AI-driven personalization.
              </p>
              <div className="mt-2 text-gray-500 text-sm flex justify-center items-center gap-2">
                <GlobeLock className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
              <div className="mt-6">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            </header>

            {/* ✅ Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              <Section id="introduction" title="1. Introduction">
                <p>
                  This Cookie Policy explains how Sumryze uses cookies and similar technologies to deliver services,
                  including AI-powered features, improve performance, and comply with applicable laws.
                </p>
              </Section>

              <Section id="types" title="2. Types of Cookies We Use">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential:</strong> Core functionality (login, security).</li>
                  <li><strong>Analytics:</strong> Monitor usage and improve performance.</li>
                  <li><strong>Advertising:</strong> Deliver relevant ads and marketing.</li>
                </ul>
              </Section>

              <Section id="ai-cookies" title="3. AI & Tracking Cookies">
                <p>
                  Some cookies enable AI-driven SEO recommendations and personalization. These cookies do not make
                  legally significant decisions but enhance your experience. You can disable them anytime.
                </p>
              </Section>

              <Section id="gdpr" title="4. GDPR Compliance">
                <p>
                  We only use non-essential cookies with your consent. EU users can withdraw consent anytime in{" "}
                  <a href="/cookie-preferences" className="text-blue-600 hover:underline">
                    Cookie Settings
                  </a>.
                </p>
              </Section>

              <Section id="ccpa" title="5. CCPA Compliance">
                <p>
                  California residents can opt out of data sharing for advertising by visiting our{" "}
                  <a href="/legal/ccpa" className="text-blue-600 hover:underline">
                    Do Not Sell My Info
                  </a> page.
                </p>
              </Section>

              <Section id="manage" title="6. How to Manage Cookies">
                <p>
                  Manage preferences via our{" "}
                  <a href="/cookie-preferences" className="text-blue-600 hover:underline">
                    Cookie Preferences Center
                  </a>{" "}
                  or your browser. Disabling essential cookies may impact site functionality.
                </p>
              </Section>

              <Section id="contact" title="7. Contact Information">
                <p>
                  For questions, email us at{" "}
                  <a href="mailto:support@sumryze.com" className="text-blue-600 hover:underline">
                    support@sumryze.com
                  </a>
                </p>
              </Section>
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

        <div className="fixed bottom-6 right-6">
          <a
            href="/cookie-preferences"
            className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg"
          >
            <Settings className="h-5 w-5" /> Manage Cookie Preferences
          </a>
        </div>
      </main>
    </>
  );
}
