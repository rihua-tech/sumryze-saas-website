"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import {
  Calendar,
  Shield,
  FileText,
  Database,
  Eye,
  Lock,
  Users,
  Globe,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import Header from "@/app/dashboard/components/Header";
import Footer from "@/app/dashboard/components/Footer";


export default function PrivacyPolicyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  const lastUpdated = "January 15, 2024";

  const tableOfContents = [
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

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => item.id);
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
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const position = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: position, behavior: "smooth" });
    setSidebarOpen(false); // Close mobile menu
  };

  const Section = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* ✅ Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 pt-16">
          {/* ✅ Desktop Sidebar */}
          <aside className="hidden lg:block w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition ${
                        activeSection === item.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ✅ Main Content */}
          <main className="flex-1 max-w-4xl mx-auto px-6 py-10">
            {/* ✅ Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mb-6 flex items-center gap-2 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Menu className="h-5 w-5" /> Table of Contents
            </button>

            {/* ✅ Page Header */}
            <div className="text-center mb-12">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                <Calendar className="h-4 w-4" />
                Last updated: {lastUpdated}
              </div>
            </div>

            {/* ✅ Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-10 space-y-10">
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
                <ul className="list-disc list-inside">
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
          </main>
        </div>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden flex">
            <div className="bg-white dark:bg-gray-800 w-80 p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Table of Contents
                </h3>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <nav className="space-y-2">
                {tableOfContents.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                        activeSection === item.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
