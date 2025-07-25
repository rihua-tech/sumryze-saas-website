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

// ✅ Define TOC item type
interface TOCItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

// ✅ TOC Component
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

// ✅ Section Component
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
    <div className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </section>
);

export default function PrivacyPolicyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const lastUpdated = "June 1, 2024";

  const tableOfContents: TOCItem[] = [
    { id: "introduction", title: "Introduction", icon: FileText },
    { id: "information-we-collect", title: "Information We Collect", icon: Database },
    { id: "how-we-use-information", title: "How We Use Your Information", icon: Eye },
    { id: "data-storage-security", title: "Data Storage & Security", icon: Lock },
    { id: "sharing-disclosure", title: "Information Sharing", icon: Users },
    { id: "user-rights", title: "Your Rights & Choices", icon: Shield },
    { id: "international-transfers", title: "International Transfers", icon: Globe },
    { id: "children-privacy", title: "Children's Privacy", icon: Users },
    { id: "policy-changes", title: "Changes to This Policy", icon: FileText },
    { id: "contact-us", title: "Contact Us", icon: Users },
  ];

  // ✅ Scroll Highlight
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

  // ✅ Lock background scroll when sidebar open
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
          content="Learn how Sumryze collects, uses, and protects your personal information. Read our Privacy Policy for details on data handling and your rights."
        />
        <meta property="og:title" content="Privacy Policy | Sumryze" />
        <meta
          property="og:description"
          content="Learn how Sumryze collects, uses, and protects your personal information."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://sumryze.com/legal/privacy" />
        <meta property="og:image" content="/images/privacy-og.png" />
        <link rel="canonical" href="https://sumryze.com/legal/privacy" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <div className="flex flex-1">
          {/* ✅ Desktop Sidebar */}
          <aside className="hidden lg:block w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 h-screen overflow-y-auto p-6">
            <h3 className="text-lg font-semibold tracking-tight mt-6 mb-6 text-gray-900 dark:text-gray-100">
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

            {/* ✅ Page Header */}
            <header className="text-center mb-16">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mt-2 text-sm">
                <Calendar className="h-4 w-4" />
                Last updated: {lastUpdated}
              </div>
            </header>

            {/* ✅ Content Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 lg:p-10 space-y-10">
              <Section id="introduction" title="Introduction">
                <p>
                  At Sumryze, we are committed to protecting your privacy and ensuring the
                  security of your personal information. This policy explains how we
                  collect, use, and protect your data when you use our services.
                </p>
              </Section>

              <Section id="information-we-collect" title="Information We Collect">
                <p>
                  We collect personal details like name, email, and usage data to improve
                  our services.
                </p>
              </Section>

              <Section id="how-we-use-information" title="How We Use Your Information">
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate important updates</li>
                  <li>Ensure security and compliance</li>
                </ul>
              </Section>

              <Section id="data-storage-security" title="Data Storage & Security">
                <p>We implement advanced encryption and secure hosting to protect data.</p>
              </Section>

              <Section id="sharing-disclosure" title="Information Sharing">
                <p>We never sell your personal data. We only share with trusted partners.</p>
              </Section>

              <Section id="user-rights" title="Your Rights & Choices">
                <p>You have the right to access, correct, or delete your data anytime.</p>
              </Section>

              <Section id="international-transfers" title="International Transfers">
                <p>
                  Your data may be stored in the US/EU with full compliance to privacy
                  laws.
                </p>
              </Section>

              <Section id="children-privacy" title="Children's Privacy">
                <p>Our services are not intended for children under 13 years old.</p>
              </Section>

              <Section id="policy-changes" title="Changes to This Policy">
                <p>We will notify you of significant updates via email or platform notice.</p>
              </Section>

              <Section id="contact-us" title="Contact Us">
                <p>Email: privacy@sumryze.com</p>
              </Section>

            
            </div>
             <div className="text-center mt-8">
              <a
              href="/legal/privacy/privacy-full"
             className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-gray-100 font-medium rounded-lg transition"
             >
           View Full Privacy Policy
            </a>
           </div>

            {/* Footer Links */}
            <div className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
              Related:{" "}
              <a href="/legal/cookies" className="text-blue-600 hover:underline">
                Cookies Policy
              </a>{" "}
              |{" "}
              <a href="/legal/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              |{" "}
              <a href="/legal/cookies/cookies-full" className="text-blue-600 hover:underline">
                Full Cookies
              </a>
            </div>

          </main>
        </div>

        {/* ✅ Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden flex">
            <div className="bg-white dark:bg-gray-800 w-80 p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
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
