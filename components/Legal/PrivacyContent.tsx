"use client";


import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import {
  Calendar,
  Shield,
  FileText,
  Database,
  Eye,
  Lock,
  Users,
  Globe,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";

interface TOCItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

const TOCLinks = ({
  items,
  activeSection,
  onClick,
}: {
  items: TOCItem[];
  activeSection: string;
  onClick: (id: string) => void;
}) => (
  <nav role="navigation" aria-label="Table of Contents" className="space-y-2">
    {items.map((item) => {
      const Icon = item.icon;
      return (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            onClick(item.id);
          }}
          aria-label={`Go to ${item.title}`}
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-left border-l-4 transition text-sm font-medium tracking-tight",
            activeSection === item.id
              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600"
              : "border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
        >
          <Icon className="h-4 w-4" />
          {item.title}
        </a>
      );
    })}
  </nav>
);

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
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
      {title}
    </h2>
    <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const lastUpdated = "January 15, 2024";

  const tableOfContents: TOCItem[] = [
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "data-we-collect", title: "Data We Collect", icon: Database },
    { id: "how-we-use", title: "How We Use Data", icon: Eye },
    { id: "your-rights", title: "Your Rights (GDPR/CCPA)", icon: Shield },
    { id: "data-security", title: "Data Security", icon: Lock },
    { id: "sharing", title: "Third-Party Sharing", icon: Users },
    { id: "children", title: "Children’s Privacy", icon: Users },
    { id: "policy-changes", title: "Policy Changes", icon: FileText },
    { id: "contact", title: "Contact Us", icon: Globe },
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (const item of tableOfContents) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = document.querySelector("header")?.clientHeight || 80;
    const position = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: "smooth" });
    setSidebarOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  return (
    <>
      {/* ✅ SEO */}
      <Head>
        <title>Privacy Policy | Sumryze</title>
        <meta
          name="description"
          content="Learn how Sumryze collects, uses, and protects your data. GDPR and CCPA compliant privacy practices."
        />
        <link rel="canonical" href="https://sumryze.com/legal/privacy" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-1">
          {/* ✅ Desktop Sidebar */}
          <aside className="hidden lg:block w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Table of Contents
            </h3>
            <TOCLinks
              items={tableOfContents}
              activeSection={activeSection}
              onClick={scrollToSection}
            />
          </aside>

          {/* ✅ Main Content */}
          <main className="flex-1 max-w-5xl mx-auto px-6 py-10">
            {/* ✅ Mobile TOC Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800"
              aria-label="Open Table of Contents"
            >
              <Menu className="h-5 w-5" /> Table of Contents
            </button>

            {/* ✅ Header */}
            <header className="text-center mb-12">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy (Simplified)
              </h1>
              <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400 mt-2 text-sm">
                <Calendar className="h-4 w-4" /> Last updated: {lastUpdated}
              </div>
            </header>

            {/* ✅ Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-10 space-y-10 border border-gray-200 dark:border-gray-700">
              <Section id="introduction" title="Introduction">
                <p>
                  We respect your privacy and are committed to protecting your personal
                  data. This policy provides a simplified summary of our practices under
                  GDPR and CCPA.
                </p>
              </Section>

              <Section id="data-we-collect" title="Data We Collect">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Account details: name, email, login info</li>
                  <li>Billing details (for subscriptions)</li>
                  <li>Usage data (analytics, cookies)</li>
                </ul>
              </Section>

              <Section id="how-we-use" title="How We Use Data">
                <p>
                  To provide and improve services, process payments, ensure security, and
                  comply with legal requirements.
                </p>
              </Section>

              <Section id="your-rights" title="Your Rights (GDPR & CCPA)">
                <p>
                  You can request access, correction, deletion, or data export. California
                  residents can opt out of “data sale” (we do not sell data). Contact us
                  anytime.
                </p>
              </Section>

              <Section id="data-security" title="Data Security">
                <p>
                  We use encryption, secure servers, and strict access controls to
                  safeguard your information.
                </p>
              </Section>

              <Section id="sharing" title="Third-Party Sharing">
                <p>
                  We share data only with trusted partners (e.g., payment processors) under
                  strict agreements. We never sell personal data.
                </p>
              </Section>

              <Section id="children" title="Children’s Privacy">
                <p>
                  Our services are not directed to children under 13 (or 16 in the EU). We
                  do not knowingly collect their data.
                </p>
              </Section>

              <Section id="policy-changes" title="Changes to This Policy">
                <p>
                  Updates will be posted here and significant changes communicated by email
                  or platform notice.
                </p>
              </Section>

              <Section id="contact" title="Contact Us">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:privacy@sumryze.com"
                    className="text-blue-600 hover:underline"
                  >
                    privacy@sumryze.com
                  </a>
                </p>
                <p>
                  Full details:{" "}
                  <a
                    href="/legal/privacy/privacy-full"
                    className="text-blue-600 hover:underline"
                  >
                    View Full Privacy Policy
                  </a>
                </p>
              </Section>
            </div>

            {/* ✅ Footer Links */}
            <div className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookies Policy
              </a>{" "}
              |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
            </div>
          </main>
        </div>

        {/* ✅ Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden flex">
            <div className="bg-white dark:bg-gray-800 w-80 p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Table of Contents
                </h3>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                  <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <TOCLinks
                items={tableOfContents}
                activeSection={activeSection}
                onClick={scrollToSection}
              />
            </div>
          </div>
        )}
      </div>

      {/* ✅ Global Smooth Scroll */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
