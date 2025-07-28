"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Shield, ChevronRight, ArrowUpCircle, Download } from "lucide-react";
import jsPDF from "jspdf";

export default function DashboardPrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "introduction", title: "Introduction" },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      subsections: [
        { id: "personal-info", title: "Personal Information" },
        { id: "usage-data", title: "Usage Data" },
        { id: "cookies-tracking", title: "Cookies & Tracking" },
      ],
    },
    {
      id: "how-we-use-info",
      title: "How We Use Your Information",
      subsections: [
        { id: "service-provision", title: "Service Provision" },
        { id: "communication", title: "Communication" },
        { id: "improvement", title: "Service Improvement" },
      ],
    },
    { id: "data-security", title: "Data Storage & Security" },
    { id: "sharing-disclosure", title: "Information Sharing & Disclosure" },
    { id: "ai-disclosure", title: "AI-Powered SEO & Automated Insights" },
    { id: "user-rights", title: "Your Rights (GDPR & CCPA)" },
    { id: "international", title: "International Transfers" },
    { id: "children", title: "Children's Privacy" },
    { id: "policy-changes", title: "Changes to This Policy" },
    { id: "contact-us", title: "Contact Us" },
  ];

  // ✅ Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const allIds = sections.flatMap((sec) => [
        sec.id,
        ...(sec.subsections?.map((s) => s.id) || []),
      ]);
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  // ✅ Dynamic PDF Generation
  
  const downloadPDF = () => {
  const doc = new jsPDF("p", "pt", "a4");
  const margin = 40;
  let y = margin;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Dashboard Privacy Policy - Sumryze", margin, y);
  y += 25;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Last Updated: ${lastUpdated}`, margin, y);
  y += 30;

  // Loop Sections from DOM
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const title = section.querySelector("h2")?.textContent || "";
    const contentDiv = section.querySelector("div");
    const content = contentDiv ? contentDiv.innerText : "";

    // ✅ Print Title Once
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, margin, y);
    y += 18;

    // ✅ Divider
    doc.setDrawColor(200);
    doc.line(margin, y, 555, y);
    y += 10;

    // ✅ Content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitText = doc.splitTextToSize(content, 500);

    splitText.forEach((line: string) => {
      if (y > 750) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 14;
    });

    y += 18; // Extra space after each section
  });

  // Footer
  doc.setFontSize(10);
  doc.text("© 2024 Sumryze Inc. | All rights reserved", margin, 820);

  doc.save("Sumryze-Dashboard-Privacy-Policy.pdf");
};


  // ✅ Section Components
  const Section = ({ id, title, children }: any) => (
    <section id={id} className="scroll-mt-24 mb-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">
        {title}
      </h2>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

  const Subsection = ({ id, title, children }: any) => (
    <div id={id} className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{children}</p>
    </div>
  );

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* ✅ Sidebar */}
      <aside className="hidden lg:block w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contents</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {section.title}
                </button>
                {section.subsections && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className={`block text-xs px-3 py-1 rounded ${
                          activeSection === sub.id
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        <ChevronRight className="inline w-3 h-3 mr-1" />
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* ✅ Main Content */}
      
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mt-1">
            <Calendar className="w-4 h-4" /> Last updated: {lastUpdated}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
              GDPR Compliant
            </span>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs">
              CCPA Compliant
            </span>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200 mb-6">
          ✅ We collect only essential data. ✅ No selling of personal data. ✅ AI-powered insights are for
          recommendations only, not legal decisions.
        </div>

        {/* Download PDF */}
        <div className="flex justify-center md:justify-end mb-6">
          <button
            onClick={downloadPDF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        {/* ✅ Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sm:p-8 space-y-8">
          <Section id="introduction" title="Introduction">
            <p>
              At Sumryze, your privacy is our priority. This policy explains what we collect, how we use it, and your rights under GDPR and CCPA.
            </p>
          </Section>

          <Section id="information-we-collect" title="Information We Collect">
            <Subsection id="personal-info" title="Personal Information">
              Name, email, billing info, company details during registration or subscription.
            </Subsection>
            <Subsection id="usage-data" title="Usage Data">
              IP address, browser type, device, and analytics for service performance and security.
            </Subsection>
            <Subsection id="cookies-tracking" title="Cookies & Tracking">
              We use cookies for analytics, security, and personalization. See our{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>.
            </Subsection>
          </Section>

          <Section id="how-we-use-info" title="How We Use Your Information">
            <Subsection id="service-provision" title="Service Provision">
              To provide and improve services, process payments, and generate automated SEO reports.
            </Subsection>
            <Subsection id="communication" title="Communication">
              For legal updates, account notices, and consent-based marketing.
            </Subsection>
            <Subsection id="improvement" title="Service Improvement">
              Enhance AI recommendations and ensure security compliance.
            </Subsection>
          </Section>

          <Section id="data-security" title="Data Storage & Security">
            Data stored securely with encryption and strict access controls. No system is 100% secure.
          </Section>

          <Section id="sharing-disclosure" title="Information Sharing & Disclosure">
            Shared only with trusted vendors (payment processors, hosting providers). Never sold.
          </Section>

          <Section id="ai-disclosure" title="AI-Powered SEO & Automated Insights">
            AI features provide suggestions for SEO optimization and reports but do not make binding decisions or affect user legal rights.
          </Section>

          <Section id="user-rights" title="Your Rights (GDPR & CCPA)">
            Access, delete, correct, or export your data anytime. California users can opt out via{" "}
            <a href="/legal/ccpa" className="text-blue-600 hover:underline">
              Do Not Sell My Info
            </a>.
          </Section>

          <Section id="international" title="International Transfers">
            Transfers comply with GDPR Standard Contractual Clauses (SCCs).
          </Section>

          <Section id="children" title="Children's Privacy">
            Services are not intended for children under 13 (US) or 16 (EU).
          </Section>

          <Section id="policy-changes" title="Changes to This Policy">
            Updates will be notified via dashboard or email.
          </Section>

          <Section id="contact-us" title="Contact Us">
            <p>
              Support:{" "}
              <a href="mailto:support@sumryze.com" className="text-blue-600 hover:underline">
                support@sumryze.com
              </a>{" "}
              | Privacy:{" "}
              <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
                privacy@sumryze.com
              </a>
            </p>
            <p>
              View full details:{" "}
              <a href="/legal/privacy/privacy-full" className="text-blue-600 hover:underline">
                Full Privacy Policy
              </a>
            </p>
          </Section>
        </div>

        {/* Related Links */}
        <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Related:{" "}
          <a href="/legal/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/legal/cookies-full" className="text-blue-600 hover:underline">
            Full Cookie Policy
          </a>
        </div>
        </div>
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
