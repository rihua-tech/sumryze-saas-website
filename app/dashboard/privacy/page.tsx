"use client";

import { useState, useEffect } from "react";
import { Calendar, Shield, ChevronRight, ArrowUpCircle, Download, Mail } from "lucide-react";
import jsPDF from "jspdf";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const lastUpdated = "January 15, 2024";

  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      subsections: [
        { id: "personal-information", title: "Personal Information" },
        { id: "usage-data", title: "Usage Data" },
        { id: "cookies-tracking", title: "Cookies & Tracking" },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      subsections: [
        { id: "service-provision", title: "Service Provision" },
        { id: "communication", title: "Communication" },
        { id: "improvement", title: "Service Improvement" },
      ],
    },
    { id: "data-storage-security", title: "Data Storage & Security" },
    { id: "sharing-disclosure", title: "Information Sharing & Disclosure" },
    { id: "user-rights", title: "Your Rights & Choices" },
    { id: "international-transfers", title: "International Data Transfers" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "policy-changes", title: "Changes to This Policy" },
    { id: "contact-us", title: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.flatMap((section) => [
        section.id,
        ...(section.subsections?.map((sub) => sub.id) || []),
      ]);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.text("Privacy Policy - Sumryze", 40, 50);
    doc.text("Full GDPR & CCPA-compliant policy available at sumryze.com/legal/privacy", 40, 80);
    doc.save("Sumryze-Privacy-Policy.pdf");
  };

  const Section = ({ id, title, children }: any) => (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

  const Subsection = ({ id, title, children }: any) => (
    <div id={id} className="mb-8 scroll-mt-24">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-2 text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:block w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Table of Contents</h3>
          <nav className="space-y-2">
            {tableOfContents.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
          <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> Last updated: {lastUpdated}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs">
              GDPR Compliant
            </span>
            <span className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs">
              CCPA Compliant
            </span>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg text-blue-800 dark:text-blue-200 text-sm mb-6">
          ✅ We collect only essential data. ✅ No selling of personal data. ✅ You control your data anytime.
        </div>

        {/* Download PDF */}
        <div className="flex justify-end mb-6">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        {/* Full Sections */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
          {/* Introduction */}
          <Section id="introduction" title="Introduction">
            <p>
              At Sumryze, we prioritize your privacy. This policy explains what data we collect, how we use it, and your
              rights under GDPR and CCPA.
            </p>
          </Section>

          {/* Information We Collect */}
          <Section id="information-we-collect" title="Information We Collect">
            <Subsection id="personal-information" title="Personal Information">
              Includes your name, email address, billing info, and company name when you register or subscribe.
            </Subsection>
            <Subsection id="usage-data" title="Usage Data">
              We automatically collect IP address, browser type, device details, and pages visited for analytics and
              security.
            </Subsection>
            <Subsection id="cookies-tracking" title="Cookies & Tracking">
              We use cookies for authentication, analytics, and performance. See our{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>
              .
            </Subsection>
          </Section>

          {/* How We Use Info */}
          <Section id="how-we-use-information" title="How We Use Your Information">
            <Subsection id="service-provision" title="Service Provision">
              To operate our platform, process transactions, and deliver analytics reports.
            </Subsection>
            <Subsection id="communication" title="Communication">
              We send account updates, legal notices, and (with consent) marketing emails.
            </Subsection>
            <Subsection id="improvement" title="Service Improvement">
              Analyze usage to improve our services and security.
            </Subsection>
          </Section>

          {/* Data Storage & Security */}
          <Section id="data-storage-security" title="Data Storage & Security">
            Your data is stored securely in the U.S. and EU. We use encryption, MFA, and strict access control. While we
            implement industry standards, no method is 100% secure.
          </Section>

          {/* Sharing & Disclosure */}
          <Section id="sharing-disclosure" title="Information Sharing & Disclosure">
            We share data only with:
            <ul className="list-disc ml-6">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Cloud providers (AWS, Google Cloud)</li>
              <li>Analytics tools (Google Analytics)</li>
            </ul>
            We never sell your personal data.
          </Section>

          {/* User Rights */}
          <Section id="user-rights" title="Your Rights & Choices">
            Under GDPR/CCPA, you can:
            <ul className="list-disc ml-6">
              <li>Access, correct, or delete your data</li>
              <li>Request a portable copy</li>
              <li>Opt-out of marketing emails anytime</li>
            </ul>
          </Section>

          {/* International Transfers */}
          <Section id="international-transfers" title="International Data Transfers">
            We may transfer data outside your country under GDPR-approved SCCs. You may request a copy by emailing{" "}
            <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
              privacy@sumryze.com
            </a>
            .
          </Section>

          {/* Children's Privacy */}
          <Section id="children-privacy" title="Children's Privacy">
            Our services are not intended for children under 13 in the U.S. or under 16 in the EU without parental
            consent.
          </Section>

          {/* Policy Changes */}
          <Section id="policy-changes" title="Changes to This Policy">
            We update the “Last Updated” date and notify you of significant changes via email or dashboard alerts.
          </Section>

          {/* Contact Us */}
          <Section id="contact-us" title="Contact Us">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
              <p>If you have any questions, contact us:</p>
              <p>
                General Support:{" "}
                <a href="mailto:support@sumryze.com" className="text-blue-600 hover:underline">
                  support@sumryze.com
                </a>
              </p>
              <p>
                Privacy Matters:{" "}
                <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
                  privacy@sumryze.com
                </a>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 pt-4 border-t">
                For EU users: We do not require a DPO at this stage, but provide a dedicated privacy contact at{" "}
                <strong>privacy@sumryze.com</strong>.
              </p>
            </div>
          </Section>
        </div>
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
