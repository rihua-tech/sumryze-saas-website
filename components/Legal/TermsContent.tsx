"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import { Calendar, Scale, Download } from "lucide-react";
import jsPDF from "jspdf";

export default function TermsFullPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By using Sumryze, you agree to these Terms. If you do not agree, discontinue use immediately.",
    },
    {
      id: "description-of-service",
      title: "2. Description of Service",
      content:
        "Sumryze provides automated SEO analytics, AI-powered recommendations using Large Language Models (LLMs), and automated reports. AI insights are for informational purposes only and do not replace professional advice.",
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      content: "You must maintain account security. You are responsible for all activity under your account.",
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      content: "Do not misuse our platform for illegal, abusive, or harmful activities.",
    },
    {
      id: "payment-billing",
      title: "5. Payment and Billing",
      content: "Subscriptions are billed in advance. Refunds follow the plan-specific refund policy.",
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      content: "All platform content, code, and trademarks are the property of Sumryze.",
    },
    {
      id: "privacy-data",
      title: "7. Privacy and Data Protection",
      content: "Your data is handled per our Privacy Policy. We ensure compliance with GDPR & CCPA.",
    },
    {
      id: "disclaimers",
      title: "8. Disclaimers and Warranties",
      content:
        'Services, including AI-generated recommendations, are provided "as is" without warranties. We do not guarantee SEO improvements. Verify AI outputs before implementation.',
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      content: "Sumryze shall not be liable for indirect or consequential damages.",
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      content: "You agree to indemnify and hold Sumryze harmless from claims related to your use.",
    },
    {
      id: "termination",
      title: "11. Termination",
      content: "We may suspend or terminate your access for policy violations or misuse of AI features.",
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Disputes",
      content: "These Terms are governed by California law. Disputes are resolved via binding arbitration.",
    },
    {
      id: "general-provisions",
      title: "13. General Provisions",
      content: "These Terms constitute the entire agreement between you and Sumryze.",
    },
    {
      id: "contact-information",
      title: "14. Contact Information",
      content: (
        <>
          For any questions, email us at{" "}
          <a href="mailto:support@sumryze.com" className="text-blue-600 font-semibold hover:underline">
            support@sumryze.com
          </a>
          .
        </>
      ),
      pdfContent: "For any questions, email us at support@sumryze.com.",
    },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

  // ✅ Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const position = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
  };

  // ✅ Dynamic PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Full Terms of Service - Sumryze", 40, 50);
    doc.setFontSize(12);
    doc.text(`Last Updated: ${lastUpdated}`, 40, 70);

    let y = 100;
    sections.forEach((section) => {
      const textContent = typeof section.content === "string" ? section.content : section.pdfContent || "";
      doc.setFontSize(14).setFont("helvetica", "bold");
      doc.text(section.title, 40, y);
      y += 20;

      doc.setFontSize(11).setFont("helvetica", "normal");
      const splitContent = doc.splitTextToSize(textContent, 500);
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
    doc.save("Sumryze-Terms-of-Service.pdf");
  };

  return (
    <>
      <Head>
        <title>Full Terms of Service | Sumryze</title>
        <meta name="description" content="Comprehensive Terms of Service including AI SEO usage and data privacy compliance." />
      </Head>

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Sidebar */}
          <aside className="hidden lg:block w-72">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
              <nav className="space-y-1">
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
              <Scale className="h-10 w-10 text-blue-600 mx-auto mb-2" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              <p className="text-gray-500 mt-1 flex justify-center items-center gap-2">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </p>
              <div className="mt-4">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </button>
              </div>
            </header>

            {/* ✅ Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 space-y-10">
              {sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{sec.title}</h2>
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-4 mt-2"></div>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{sec.content}</div>
                </section>
              ))}
            </div>

            {/* ✅ Related Links */}
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy-full" className="text-blue-600 hover:underline">
                Full Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/privacy" className="text-blue-600 hover:underline">
                Simplified Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
