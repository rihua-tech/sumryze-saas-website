"use client";

import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Calendar, Shield, Download } from "lucide-react";
import jsPDF from "jspdf";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 space-y-4">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
  </section>
);

export default function PrivacyFullPolicyPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information", title: "2. Information We Collect" },
    { id: "lawful-basis", title: "3. Legal Basis for Processing (GDPR)" },
    { id: "usage", title: "4. How We Use Your Information" },
    { id: "cookies", title: "5. Cookies & Tracking Technologies" },
    { id: "retention", title: "6. Data Retention" },
    { id: "third-party", title: "7. Third-Party Processors" },
    { id: "international", title: "8. International Transfers" },
    { id: "automated", title: "9. Automated Decision Making & AI SEO" },
    { id: "your-rights", title: "10. Your Rights (GDPR & CCPA)" },
    { id: "california", title: "11. California Residents (CCPA)" },
    { id: "changes", title: "12. Changes to This Policy" },
    { id: "contact", title: "13. Contact Information" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [manualActive, setManualActive] = useState(false);

  // ✅ Scroll Spy
  useEffect(() => {
    if (manualActive) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [manualActive]);

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

  // ✅ Dynamic PDF Generation
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Full Privacy Policy - Sumryze", 40, 50);
    doc.setFontSize(12);
    doc.text(`Last Updated: ${lastUpdated}`, 40, 70);

    let y = 100;
    const allSections = document.querySelectorAll("section");
    allSections.forEach((section: any) => {
      const title = section.querySelector("h2")?.textContent || "";
      const content = section.querySelector("div")?.innerText || "";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
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

    doc.setFontSize(10);
    doc.text("© 2024 Sumryze Inc. | All rights reserved", 40, 800);
    doc.save("Sumryze-Privacy-Policy.pdf");
  };

  return (
    <>
      <Head>
        <title>Full Privacy Policy | Sumryze</title>
        <meta
          name="description"
          content="Full Privacy Policy including AI SEO disclaimers, GDPR & CCPA compliance, and data usage details."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Full Privacy Policy</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Learn how Sumryze collects, uses, and protects your data under GDPR & CCPA compliance.
              </p>
              <div className="mt-2 text-gray-500 text-sm flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last updated: {lastUpdated}
              </div>

              <div className="mt-6">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            </header>

            {/* ✅ Full Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-10 space-y-10">
              
              <Section id="introduction" title="1. Introduction">
                <p>
                  We value your privacy and process your data in accordance with GDPR, CCPA, and other applicable laws.
                  Our platform uses AI SEO tools and automated analytics to enhance user experience and deliver insights.
                  These AI features are for informational purposes only and should not replace human judgment or
                  professional advice.
                </p>
              </Section>

              <Section id="information" title="2. Information We Collect">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal data: Name, email, billing info</li>
                  <li>Technical data: IP, device, browser info</li>
                  <li>Cookies for authentication & analytics</li>
                </ul>
              </Section>

              <Section id="lawful-basis" title="3. Legal Basis for Processing (GDPR)">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consent (e.g., marketing emails)</li>
                  <li>Contract (service delivery)</li>
                  <li>Legal obligations (tax, compliance)</li>
                  <li>Legitimate interests (security, analytics)</li>
                </ul>
              </Section>

              <Section id="usage" title="4. How We Use Your Information">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve services, including AI SEO recommendations</li>
                  <li>Account management, billing, and reporting</li>
                  <li>Security and fraud prevention</li>
                </ul>
              </Section>


              {/* Remaining sections same as before */}

               

              {/* 5. Cookies */}
              <Section id="cookies" title="5. Cookies & Tracking">
                <p>
                  We use cookies for session management and analytics. You can manage cookies via your browser or our{" "}
                  <a href="/legal/cookies" className="text-blue-600 hover:underline">
                    Cookie Policy
                  </a>.
                </p>
              </Section>

              {/* 6. Retention */}
              <Section id="retention" title="6. Data Retention">
                <p>
                  We retain data only as long as necessary for legal, security, or service purposes.
                </p>
              </Section>

              {/* 7. Third-Party */}
              <Section id="third-party" title="7. Third-Party Processors">
                <p>
                  We share data with trusted providers like payment gateways and hosting partners under strict agreements.
                </p>
              </Section>

              {/* 8. International */}
              <Section id="international" title="8. International Transfers">
                <p>
                  Transfers outside the EU rely on Standard Contractual Clauses (SCCs) and adequate safeguards.
                </p>
              </Section>

              {/* 9. Automated */}
             

               <Section id="automated" title="9. Automated Decision Making & AI SEO">
                <p>
                  Our AI SEO system analyzes your website performance to provide insights and recommendations.
                  These recommendations are generated using large language models (LLMs) and data-driven algorithms.
                  <strong className="block mt-2">Disclaimer:</strong> AI-generated insights are not guaranteed to
                  improve rankings, conversions, or compliance. Please validate outputs before implementation.
                </p>
              </Section>


              {/* 10. Rights */}
              <Section id="your-rights" title="10. Your Rights (GDPR & CCPA)">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, correction, deletion</li>
                  <li>Data portability</li>
                  <li>Opt-out of marketing</li>
                  <li>“Do Not Sell My Info” for California residents</li>
                </ul>
              </Section>

              {/* 11. California */}
              <Section id="california" title="11. California Residents (CCPA)">
                <p>
                  You have the right to request disclosure of collected data and opt out of data sale.
                  <Link href="/legal/ccpa" className="text-blue-600 hover:underline"> Click here to exercise your rights.</Link>
                </p>
              </Section>

              {/* 12. Changes */}
              <Section id="changes" title="12. Changes to This Policy">
                <p>
                  We may update this policy and will notify users via email or dashboard notifications.
                </p>
              </Section>

              {/* 13. Contact */}
              <Section id="contact" title="13. Contact Information">
                <p>
                  Email: <a href="mailto:support@sumryze.com" className="text-blue-600">support@sumryze.com</a>
                </p>
                <p>
                  EU residents may lodge complaints with their local Data Protection Authority.
                </p>
              </Section>
             
            </div>

            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">Simplified Privacy Policy</a> |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</a> |{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">Cookie Policy</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
