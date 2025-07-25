"use client";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import clsx from "clsx";
import {
  Calendar,
  Scale,
  FileText,
  Users,
  Shield,
  AlertTriangle,
  CreditCard,
  Gavel,
  ChevronRight,
  Menu,
  X,
  Download,
} from "lucide-react";

export default function TermsFullPage() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "description-of-service", title: "2. Description of Service" },
    { id: "user-accounts", title: "3. User Accounts" },
    { id: "acceptable-use", title: "4. Acceptable Use Policy" },
    { id: "payment-billing", title: "5. Payment and Billing" },
    { id: "intellectual-property", title: "6. Intellectual Property Rights" },
    { id: "privacy-data", title: "7. Privacy and Data Protection" },
    { id: "disclaimers", title: "8. Disclaimers and Warranties" },
    { id: "limitation-liability", title: "9. Limitation of Liability" },
    { id: "indemnification", title: "10. Indemnification" },
    { id: "termination", title: "11. Termination" },
    { id: "governing-law", title: "12. Governing Law and Disputes" },
    { id: "general-provisions", title: "13. General Provisions" },
    { id: "contact-information", title: "14. Contact Information" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [manualActive, setManualActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Scroll Spy with IntersectionObserver
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
    setMobileMenuOpen(false);
  }, []);

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="scroll-mt-24 space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</div>
    </section>
  );

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Full Terms of Service | Sumryze</title>
        <meta
          name="description"
          content="Read the full Terms of Service for Sumryze, including user obligations, billing, and compliance with GDPR & CCPA."
        />
        <link rel="canonical" href="https://sumryze.com/legal/terms-full" />
        <meta property="og:title" content="Full Terms of Service | Sumryze" />
        <meta
          property="og:description"
          content="Comprehensive Terms of Service including subscription, data protection, and legal clauses."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Full Terms of Service",
              url: "https://sumryze.com/legal/terms-full",
              description: "Comprehensive Terms of Service for Sumryze.",
            }),
          }}
        />
      </Head>

      {/* ✅ Main Layout */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
          {/* ✅ Desktop TOC */}
          <aside className="hidden lg:block w-72">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg font-medium transition border-l-4",
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mt-2 text-sm">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
              <div className="mt-4">
                <a
                  href="/docs/terms-of-service.pdf"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
                >
                  <Download className="h-4 w-4" /> Download PDF
                </a>
              </div>
            </header>

            {/* ✅ Full Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-10 space-y-10">
              <Section id="acceptance" title="1. Acceptance of Terms">
                <p>
                  By using Sumryze, you agree to these Terms. If you do not agree, you must discontinue using our
                  services.
                </p>
              </Section>

              <Section id="description-of-service" title="2. Description of Service">
                <p>Sumryze provides SEO analytics, AI-powered recommendations, and automated reports for businesses.</p>
              </Section>

              <Section id="user-accounts" title="3. User Accounts">
                <p>You are responsible for maintaining account security and complying with our policies.</p>
              </Section>

              <Section id="acceptable-use" title="4. Acceptable Use Policy">
                <p>Use our service legally and responsibly. Prohibited activities include fraud, abuse, and misuse.</p>
              </Section>

              <Section id="payment-billing" title="5. Payment and Billing">
                <p>Our services are subscription-based, billed in advance monthly or annually.</p>
              </Section>

              <Section id="intellectual-property" title="6. Intellectual Property Rights">
                <p>All content and features of Sumryze remain our intellectual property.</p>
              </Section>

              <Section id="privacy-data" title="7. Privacy and Data Protection">
                <p>
                  We handle your data according to our{" "}
                  <a href="/legal/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </Section>

              <Section id="disclaimers" title="8. Disclaimers and Warranties">
                <p>Our services are provided "as is" without warranties of any kind.</p>
              </Section>

              <Section id="limitation-liability" title="9. Limitation of Liability">
                <p>Sumryze is not liable for indirect or consequential damages.</p>
              </Section>

              <Section id="indemnification" title="10. Indemnification">
                <p>You agree to indemnify Sumryze for any claims arising from your use of the service.</p>
              </Section>

              <Section id="termination" title="11. Termination">
                <p>We reserve the right to suspend or terminate accounts violating these Terms.</p>
              </Section>

              <Section id="governing-law" title="12. Governing Law and Disputes">
                <p>These Terms are governed by California law and subject to arbitration.</p>
              </Section>

              <Section id="general-provisions" title="13. General Provisions">
                <p>These Terms constitute the entire agreement between you and Sumryze.</p>
              </Section>

              <Section id="contact-information" title="14. Contact Information">
                <p>
                  For questions, email us at{" "}
                  <a href="mailto:legal@sumryze.com" className="text-blue-600 hover:underline">
                    legal@sumryze.com
                  </a>
                  .
                </p>
              </Section>
            </div>

            {/* ✅ Related Links */}
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/privacy-full" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="/legal/cookies-full" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Mobile TOC Drawer */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end lg:hidden">
            <div className="w-72 bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={clsx(
                      "block w-full text-left px-3 py-2 rounded-lg font-medium transition",
                      activeSection === item.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
