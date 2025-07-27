"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Calendar,
  Scale,
  FileText,
  Users,
  CreditCard,
  Shield,
  AlertTriangle,
  ChevronRight,
  Gavel,
  Mail,
} from "lucide-react";

export default function TermsOfServicePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("acceptance");

  const lastUpdated = "January 15, 2024";
  const effectiveDate = "January 1, 2024";

  const tableOfContents = [
    { id: "acceptance", title: "1. Acceptance of Terms", icon: FileText },
    {
      id: "description-of-service",
      title: "2. Description of Service",
      icon: Users,
      subsections: [
        { id: "service-overview", title: "2.1 Service Overview" },
        { id: "service-availability", title: "2.2 Service Availability" },
        { id: "service-modifications", title: "2.3 Service Modifications" },
      ],
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      icon: Users,
      subsections: [
        { id: "account-creation", title: "3.1 Account Creation" },
        { id: "account-security", title: "3.2 Account Security" },
        { id: "account-termination", title: "3.3 Account Termination" },
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      icon: Shield,
      subsections: [
        { id: "permitted-uses", title: "4.1 Permitted Uses" },
        { id: "prohibited-activities", title: "4.2 Prohibited Activities" },
        { id: "compliance", title: "4.3 Compliance Requirements" },
      ],
    },
    {
      id: "payment-billing",
      title: "5. Payment and Billing",
      icon: CreditCard,
      subsections: [
        { id: "subscription-fees", title: "5.1 Subscription Fees" },
        { id: "payment-methods", title: "5.2 Payment Methods" },
        { id: "refunds-cancellation", title: "5.3 Refunds and Cancellation" },
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      icon: Scale,
      subsections: [
        { id: "our-ip", title: "6.1 Our Intellectual Property" },
        { id: "user-content", title: "6.2 User Content" },
        { id: "license-grant", title: "6.3 License Grant" },
      ],
    },
    { id: "privacy-data", title: "7. Privacy and Data Protection", icon: Shield },
    {
      id: "disclaimers",
      title: "8. Disclaimers and Warranties",
      icon: AlertTriangle,
      subsections: [
        { id: "service-disclaimers", title: "8.1 Service Disclaimers" },
        { id: "warranty-disclaimers", title: "8.2 Warranty Disclaimers" },
      ],
    },
    { id: "limitation-liability", title: "9. Limitation of Liability", icon: AlertTriangle },
    { id: "indemnification", title: "10. Indemnification", icon: Shield },
    {
      id: "termination",
      title: "11. Termination",
      icon: AlertTriangle,
      subsections: [
        { id: "termination-by-user", title: "11.1 Termination by User" },
        { id: "termination-by-us", title: "11.2 Termination by Sumryze" },
        { id: "effect-of-termination", title: "11.3 Effect of Termination" },
      ],
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Disputes",
      icon: Gavel,
      subsections: [
        { id: "governing-law-clause", title: "12.1 Governing Law" },
        { id: "dispute-resolution", title: "12.2 Dispute Resolution" },
        { id: "arbitration", title: "12.3 Arbitration" },
      ],
    },
    {
      id: "general-provisions",
      title: "13. General Provisions",
      icon: FileText,
      subsections: [
        { id: "entire-agreement", title: "13.1 Entire Agreement" },
        { id: "severability", title: "13.2 Severability" },
        { id: "force-majeure", title: "13.3 Force Majeure" },
      ],
    },
    { id: "contact-information", title: "14. Contact Information", icon: Users },
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
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>
    </section>
  );

  const Subsection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div id={id} className="mb-8 scroll-mt-24">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>
    </div>
  );

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Terms of Service | Sumryze</title>
        <meta
          name="description"
          content="Read Sumryze's Terms of Service for legal agreements, usage guidelines, and compliance policies."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex flex-1 pt-0">
          {/* Sidebar */}
          <aside className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Table of Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div key={section.id}>
                      <button
                        aria-label={`Scroll to ${section.title}`}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                      {section.subsections && (
                        <div className="ml-7 mt-1 space-y-1">
                          {section.subsections.map((subsection) => (
                            <button
                              key={subsection.id}
                              aria-label={`Scroll to ${subsection.title}`}
                              onClick={() => scrollToSection(subsection.id)}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left transition-all duration-200 ${
                                activeSection === subsection.id
                                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              }`}
                            >
                              <ChevronRight className="h-3 w-3 flex-shrink-0" />
                              <span className="text-sm">{subsection.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              </div>
              <div className="flex flex-col items-center text-gray-600 dark:text-gray-400 text-sm">
                <p>
                  <Calendar className="inline h-4 w-4 mr-1" /> Effective: {effectiveDate} | Last Updated: {lastUpdated}
                </p>
              </div>
            </div>

            {/* ✅ Insert improved legal sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
              {/* ✅ Use the full improved section block from previous message */}

                      {/* Section 1: Acceptance of Terms */}
<Section id="acceptance" title="1. Acceptance of Terms">
  <p>
    Welcome to Sumryze. These Terms of Service (“Terms”) govern your use of the Sumryze platform and
    services (“Service”) operated by Sumryze Inc. (“we,” “us,” or “our”).
  </p>
  <p>
    By using our Service, you confirm that you are at least 18 years old (or the age of majority in your jurisdiction),
    have the legal capacity to enter into this agreement, and, if you act on behalf of an entity, that you have authority
    to bind that entity. If you do not agree to these Terms, do not use our Service.
  </p>
  <p>
    Continued use after changes means you accept the updated Terms. If you access the Service from outside the U.S.,
    you are responsible for compliance with local laws.
  </p>
  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 mt-4">
    <p className="text-amber-700 dark:text-amber-200">
      <strong>Important:</strong> These Terms form a legally binding contract between you and Sumryze.
    </p>
  </div>
</Section>

{/* Section 2: Description of Service */}
<Section id="description-of-service" title="2. Description of Service">
  <Subsection id="service-overview" title="2.1 Service Overview">
    <p>
      Sumryze provides analytics and optimization tools to assist businesses in monitoring SEO performance
      and website health. We do not guarantee specific ranking improvements, traffic increases, or financial outcomes.
    </p>
    <p>Our services include but are not limited to:</p>
    <ul className="list-disc list-inside space-y-2 mt-4">
      <li>SEO performance monitoring and reporting</li>
      <li>Website technical analysis and recommendations</li>
      <li>Keyword tracking and competitive analysis</li>
      <li>Core Web Vitals monitoring</li>
      <li>AI-powered SEO insights and recommendations</li>
    </ul>
  </Subsection>
  <Subsection id="service-availability" title="2.2 Service Availability">
    <p>
      We aim for high availability but do not guarantee uninterrupted access. Downtime may occur for maintenance,
      security updates, or circumstances beyond our control.
    </p>
  </Subsection>
  <Subsection id="service-modifications" title="2.3 Service Modifications">
    <p>
      We may modify, suspend, or discontinue any part of the Service at any time, with or without notice.
      Significant changes will be communicated where feasible.
    </p>
  </Subsection>
</Section>

{/* Section 3: User Accounts */}
<Section id="user-accounts" title="3. User Accounts">
  <Subsection id="account-creation" title="3.1 Account Creation">
    <p>You agree to:</p>
    <ul className="list-disc list-inside space-y-2">
      <li>Provide accurate and up-to-date information</li>
      <li>Not impersonate another person or entity</li>
      <li>Not use the Service for unlawful purposes</li>
    </ul>
  </Subsection>
  <Subsection id="account-security" title="3.2 Account Security">
    <p>
      You are responsible for all activity under your account, even if performed by others with your credentials.
      You must:
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication where available</li>
      <li>Notify us immediately of unauthorized access</li>
    </ul>
  </Subsection>
  <Subsection id="account-termination" title="3.3 Account Termination">
    <p>
      You may terminate your account anytime via settings. We may suspend or terminate without liability for
      violations, fraud, legal compliance, or risk concerns.
    </p>
  </Subsection>
</Section>

{/* Section 4: Acceptable Use */}
<Section id="acceptable-use" title="4. Acceptable Use Policy">
  <Subsection id="permitted-uses" title="4.1 Permitted Uses">
    <ul className="list-disc list-inside space-y-2">
      <li>Monitoring your own or authorized websites</li>
      <li>Generating reports for clients with consent</li>
      <li>Using our API within documented limits</li>
    </ul>
  </Subsection>
  <Subsection id="prohibited-activities" title="4.2 Prohibited Activities">
    <ul className="list-disc list-inside space-y-2">
      <li>Violating any law or regulation</li>
      <li>Scraping beyond API allowances</li>
      <li>Using Service to spam or distribute harmful content</li>
      <li>Generating illegal, infringing, or defamatory AI outputs</li>
      <li>Breaching export control or sanctions laws</li>
    </ul>
  </Subsection>
  <Subsection id="compliance" title="4.3 Compliance Requirements">
    <p>
      You must comply with all privacy, security, and data protection laws (including GDPR and CCPA).
    </p>
  </Subsection>
</Section>

{/* Section 5: Payment and Billing */}
<Section id="payment-billing" title="5. Payment and Billing">
  <Subsection id="subscription-fees" title="5.1 Subscription Fees">
    <ul className="list-disc list-inside space-y-2">
      <li>Billed in advance monthly or annually</li>
      <li>Auto-renews unless canceled before renewal date</li>
      <li>Taxes applied where applicable</li>
    </ul>
  </Subsection>
  <Subsection id="payment-methods" title="5.2 Payment Methods">
    <p>
      You authorize recurring charges to your payment method until canceled.
    </p>
  </Subsection>
  <Subsection id="refunds-cancellation" title="5.3 Refunds and Cancellation">
    <p>Cancel anytime in your dashboard. Refund policy:</p>
    <ul className="list-disc list-inside space-y-2">
      <li>30-day money-back for first subscription</li>
      <li>No refunds after 30 days or for partial periods</li>
    </ul>
  </Subsection>
</Section>

{/* Section 6: Intellectual Property */}
<Section id="intellectual-property" title="6. Intellectual Property Rights">
  <Subsection id="our-ip" title="6.1 Our Intellectual Property">
    <p>
      The Service and related IP belong to Sumryze and are protected by law.
    </p>
  </Subsection>
  <Subsection id="user-content" title="6.2 User Content">
    <p>
      You own your content but grant us a limited license to operate the Service. Ends when account closes.
    </p>
  </Subsection>
  <Subsection id="license-grant" title="6.3 License Grant">
    <p>
      We grant you a limited, revocable, non-transferable license to use the Service. Feedback may be used without obligation.
    </p>
  </Subsection>
</Section>

{/* Section 7: Privacy */}
<Section id="privacy-data" title="7. Privacy and Data Protection">
  <p>
    Our Privacy Policy explains how we handle your data. If you are in the EU or California, you have specific rights
    under GDPR and CCPA. A Data Processing Addendum (DPA) is available upon request. By using our Service, you consent to data transfer to the U.S.
  </p>
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
    <p>
      <strong>Privacy Policy:</strong>{" "}
      <a href="/privacy" className="underline hover:no-underline">
        View here
      </a>
    </p>
  </div>
</Section>

{/* Section 8: Disclaimers */}
<Section id="disclaimers" title="8. Disclaimers and Warranties">
  <Subsection id="service-disclaimers" title="8.1 Service Disclaimers">
    <ul className="list-disc list-inside space-y-2">
      <li>Service is provided “as is” and “as available.”</li>
      <li>No guarantee of accuracy, uptime, or error-free performance</li>
      <li>We do not guarantee AI-generated content legality or accuracy</li>
      <li>No compatibility guarantee for third-party integrations</li>
    </ul>
  </Subsection>
  <Subsection id="warranty-disclaimers" title="8.2 Warranty Disclaimers">
    <p>
      To the fullest extent permitted by law, we disclaim all warranties, including merchantability, fitness for a
      particular purpose, and non-infringement.
    </p>
  </Subsection>
</Section>

{/* Section 9: Limitation of Liability */}
<Section id="limitation-liability" title="9. Limitation of Liability">
  <p>
    Our liability for any claims shall not exceed the amount you paid us in the past 12 months. You waive the right to
    participate in class actions or jury trials. Nothing limits liability for gross negligence or fraud. Certain jurisdictions may not allow these limitations, in which case they apply to the maximum extent permitted.
  </p>
</Section>

{/* Section 10: Indemnification */}
<Section id="indemnification" title="10. Indemnification">
  <p>
    You agree to indemnify Sumryze against any claims or damages from your misuse of the Service or breach of these
    Terms.
  </p>
</Section>

{/* Section 11: Termination */}
<Section id="termination" title="11. Termination">
  <Subsection id="termination-by-user" title="11.1 Termination by User">
    <p>You may cancel anytime via your dashboard.</p>
  </Subsection>
  <Subsection id="termination-by-us" title="11.2 Termination by Sumryze">
    <p>We may terminate access immediately for violations or legal risk without liability.</p>
  </Subsection>
  <Subsection id="effect-of-termination" title="11.3 Effect of Termination">
    <p>Access ends immediately; data may be deleted after 30 days. We may retain aggregated or anonymized data for analytics.</p>
  </Subsection>
</Section>

{/* Section 12: Governing Law */}
<Section id="governing-law" title="12. Governing Law and Disputes">
  <Subsection id="governing-law-clause" title="12.1 Governing Law">
    <p>These Terms follow California law.</p>
  </Subsection>
  <Subsection id="dispute-resolution" title="12.2 Dispute Resolution">
    <p>Contact us first for resolution. Claims must be filed within 1 year.</p>
  </Subsection>
  <Subsection id="arbitration" title="12.3 Arbitration">
    <p>
      Disputes will be resolved individually by binding arbitration under AAA rules. You may opt out within 30 days by
      emailing legal@sumryze.com. You waive the right to a jury trial.
    </p>
  </Subsection>
</Section>

{/* Section 13: General */}
<Section id="general-provisions" title="13. General Provisions">
  <Subsection id="entire-agreement" title="13.1 Entire Agreement">
    <p>These Terms and our Privacy Policy are the entire agreement.</p>
  </Subsection>
  <Subsection id="severability" title="13.2 Severability">
    <p>If any part is invalid, the rest remains enforceable.</p>
  </Subsection>
  <Subsection id="force-majeure" title="13.3 Force Majeure">
    <p>We are not liable for events beyond our control.</p>
  </Subsection>
</Section>

{/* Section 14: Contact */}
<Section id="contact-information" title="14. Contact Information">
  <p>Questions? Contact us:</p>
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h4>
    <div className="flex items-center gap-3">
      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      <a
        href="mailto:support@sumryze.com"
        aria-label="Send an email to Sumryze Support"
        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
      >
        support@sumryze.com
      </a>
    </div>
  </div>
</Section>


            </div>
          </main>
        </div>
      </div>
    </>
  );
}
