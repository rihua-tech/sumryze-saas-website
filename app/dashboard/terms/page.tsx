"use client";

import { useState, useEffect } from "react";
import { Calendar, Scale, ChevronRight, Download, ArrowUpCircle, Mail } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";



export default function DashboardTermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const lastUpdated = "January 15, 2024";
  const effectiveDate = "January 1, 2024";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    {
      id: "description-of-service",
      title: "2. Description of Service",
      subsections: [
        { id: "service-overview", title: "2.1 Service Overview" },
        { id: "service-availability", title: "2.2 Service Availability" },
        { id: "service-modifications", title: "2.3 Service Modifications" },
      ],
    },
    {
      id: "user-accounts",
      title: "3. User Accounts",
      subsections: [
        { id: "account-creation", title: "3.1 Account Creation" },
        { id: "account-security", title: "3.2 Account Security" },
        { id: "account-termination", title: "3.3 Account Termination" },
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      subsections: [
        { id: "permitted-uses", title: "4.1 Permitted Uses" },
        { id: "prohibited-activities", title: "4.2 Prohibited Activities" },
        { id: "compliance", title: "4.3 Compliance Requirements" },
      ],
    },
    {
      id: "payment-billing",
      title: "5. Payment and Billing",
      subsections: [
        { id: "subscription-fees", title: "5.1 Subscription Fees" },
        { id: "payment-methods", title: "5.2 Payment Methods" },
        { id: "refunds-cancellation", title: "5.3 Refunds and Cancellation" },
      ],
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      subsections: [
        { id: "our-ip", title: "6.1 Our Intellectual Property" },
        { id: "user-content", title: "6.2 User Content" },
        { id: "license-grant", title: "6.3 License Grant" },
      ],
    },
    { id: "privacy-data", title: "7. Privacy and Data Protection" },
    {
      id: "disclaimers",
      title: "8. Disclaimers and Warranties",
      subsections: [
        { id: "service-disclaimers", title: "8.1 Service Disclaimers" },
        { id: "warranty-disclaimers", title: "8.2 Warranty Disclaimers" },
      ],
    },
    { id: "limitation-liability", title: "9. Limitation of Liability" },
    { id: "indemnification", title: "10. Indemnification" },
    {
      id: "termination",
      title: "11. Termination",
      subsections: [
        { id: "termination-by-user", title: "11.1 Termination by User" },
        { id: "termination-by-us", title: "11.2 Termination by Sumryze" },
        { id: "effect-of-termination", title: "11.3 Effect of Termination" },
      ],
    },
    {
      id: "governing-law",
      title: "12. Governing Law and Disputes",
      subsections: [
        { id: "governing-law-clause", title: "12.1 Governing Law" },
        { id: "dispute-resolution", title: "12.2 Dispute Resolution" },
        { id: "arbitration", title: "12.3 Arbitration" },
      ],
    },
    {
      id: "general-provisions",
      title: "13. General Provisions",
      subsections: [
        { id: "entire-agreement", title: "13.1 Entire Agreement" },
        { id: "severability", title: "13.2 Severability" },
        { id: "force-majeure", title: "13.3 Force Majeure" },
      ],
    },
    { id: "contact-information", title: "14. Contact Information" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const allIds = sections.flatMap((sec) => [sec.id, ...(sec.subsections?.map((s) => s.id) || [])]);
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

  // ✅ PDF Generator


const downloadPDF = async () => {
  const doc = new jsPDF("p", "pt", "a4");
  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - margin * 2;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = margin;

  // ✅ Title & Dates
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Sumryze Terms of Service", pageWidth / 2, y + 10, { align: "center" });

  y += 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Effective Date: January 1, 2024", pageWidth / 2, y, { align: "center" });
  y += 16;
  doc.text("Last Updated: January 15, 2024", pageWidth / 2, y, { align: "center" });
  y += 40; // space before sections

  // ✅ Footer helper
  let pageNumber = 1;
  const addFooter = () => {
    doc.setFontSize(10);
    doc.setTextColor(80);
    doc.text(`Page ${pageNumber}`, pageWidth / 2, pageHeight - 20, { align: "center" });
    doc.text("© 2024 Sumryze Inc. | All rights reserved", pageWidth / 2, pageHeight - 35, { align: "center" });
  };

  // ✅ Section rendering with page-break handling
  const addContent = (textArray: string[], fontStyle = "normal", extraSpacing = 6) => {
    doc.setFont("helvetica", fontStyle);
    doc.setFontSize(11);
    doc.setTextColor(0);
    textArray.forEach((line) => {
      const wrappedLines = doc.splitTextToSize(line, usableWidth);
      wrappedLines.forEach((l: string) => {
        if (y > 750) {
          addFooter();
          doc.addPage();
          pageNumber++;
          y = margin;
        }
        doc.text(l, margin, y);
        y += 14;
      });
      y += extraSpacing;
    });
  };

  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTitle = section.querySelector("h2")?.textContent?.trim() || "";
    const elements = section.querySelectorAll("p, li");

    // ✅ Check if new section fits current page (title + divider + content estimate)
    if (y > 700) {
      addFooter();
      doc.addPage();
      pageNumber++;
      y = margin;
    }

    // ✅ Section Heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(sectionTitle, margin, y);
    y += 14;

    // Divider
    doc.setDrawColor(180);
    doc.line(margin, y, margin + usableWidth, y);
    y += 12;

    // ✅ Section Content
    elements.forEach((el) => {
      let text = el.textContent?.trim() || "";
      if (!text) return;

      // Handle bullets
      if (el.tagName === "LI") {
        text = `• ${text}`;
      }

      // Highlight "Important:"
      if (text.toLowerCase().startsWith("important")) {
        addContent([text], "bold");
      } else {
        addContent([text], "normal");
      }
    });

    y += 12; // space after section
  });

  // ✅ Add footer on last page
  addFooter();

  // ✅ Save PDF
  doc.save("Sumryze-Terms-of-Service.pdf");
};





  const Section = ({ id, title, children }: any) => (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-4 text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

 

  const Subsection = ({ id, title, children }: any) => (
  <div id={id} className="mb-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
    <div className="space-y-3 text-gray-700 dark:text-gray-300">{children}</div> {/* ✅ FIXED */}
  </div>
);


  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Sidebar */}
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

      {/* Main */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Scale className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mt-1">
              <Calendar className="w-4 h-4" /> Effective: {effectiveDate} | Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Download PDF */}
          <div className="flex justify-center md:justify-end mb-6">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

        {/* ✅ All 14 Sections */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sm:p-8 space-y-8">

  {/* -------------------- Section 1: Acceptance of Terms -------------------- */}
 {/* -------------------- Section 1: Acceptance of Terms -------------------- */}
<Section id="acceptance" title="1. Acceptance of Terms">
  <p>
    Welcome to <strong>Sumryze</strong>. These Terms of Service (“Terms”) govern your use of the Sumryze platform and related services (“Service”) provided by Sumryze Inc. (“we,” “us,” or “our”).
  </p>

  <p>
    By accessing or using our Service, you agree to these Terms. If you do not agree, do not use the Service. You represent that you are at least <strong>18 years old</strong> (or the age of majority in your jurisdiction) and have the legal authority to enter into this agreement. If acting on behalf of an entity, you confirm you are authorized to bind that entity.
  </p>

  <p>
    By using <strong>AI-powered features</strong> within the Service, you acknowledge and agree that AI outputs are for informational purposes only. These suggestions do not constitute legal, financial, or professional advice, and you are solely responsible for any actions or decisions based on such outputs.
  </p>

  <p>
    We may update these Terms periodically. Continued use after updates constitutes your acceptance. If you access the Service outside the U.S., you are responsible for complying with local laws and regulations.
  </p>

  {/* Highlighted Important Note */}
  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
    <p className="text-amber-700 dark:text-amber-200 font-semibold">
      <strong>Important:</strong> These Terms form a legally binding agreement between you and Sumryze.
    </p>
  </div>
</Section>

{/* -------------------- Section 2: Description of Service -------------------- */}
<Section id="description-of-service" title="2. Description of Service">
  {/* Subsection 2.1 */}
  <div id="service-overview" className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">2.1 Service Overview</h3>
    <p>
      Sumryze provides <strong>analytics and optimization tools</strong> for website performance monitoring, SEO analysis, and AI-powered recommendations.
    </p>

    <p>Our Service may include, but is not limited to:</p>
    <ul className="list-disc list-inside space-y-2">
      <li>SEO performance monitoring and automated reporting</li>
      <li>Website technical audits and optimization suggestions</li>
      <li>Keyword tracking and competitive benchmarking</li>
      <li>Core Web Vitals and performance metrics analysis</li>
      <li>AI-powered SEO insights, trend forecasts, and automation suggestions</li>
    </ul>

    <p className="font-semibold text-amber-600 dark:text-amber-400 mt-3">
      Important: AI-generated insights are for informational purposes only and do not guarantee results.
    </p>
  </div>

  {/* Subsection 2.2 */}
  <div id="service-availability" className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">2.2 Service Availability</h3>
    <p>
      We strive to maintain high service uptime and reliability; however, occasional downtime may occur for maintenance or unforeseen issues.
    </p>
  </div>

  {/* Subsection 2.3 */}
  <div id="service-modifications">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">2.3 Service Modifications</h3>
    <p>
      We reserve the right to update, enhance, suspend, or discontinue any part of the Service at any time with or without notice.
    </p>
  </div>
</Section>


  {/* -------------------- Section 3: User Accounts -------------------- */}
  <Section id="user-accounts" title="3. User Accounts">
    <Subsection id="account-creation" title="3.1 Account Creation">
      <p>You agree to:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Provide accurate and current information</li>
        <li>Not impersonate another person or entity</li>
        <li>Not use the Service for unlawful purposes</li>
      </ul>
    </Subsection>
    <Subsection id="account-security" title="3.2 Account Security">
      <p>You are responsible for maintaining account confidentiality and for all activity under your credentials. You agree to:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Use strong, unique passwords</li>
        <li>Enable two-factor authentication where available</li>
        <li>Notify us immediately of any unauthorized access</li>
      </ul>
    </Subsection>
    <Subsection id="account-termination" title="3.3 Account Termination">
      <p>
        You may terminate your account anytime via dashboard settings. We may suspend or terminate your account without notice for violations, fraud, legal requirements, or security risks.
      </p>
    </Subsection>
  </Section>

  {/* -------------------- Section 4: Acceptable Use Policy -------------------- */}
  <Section id="acceptable-use" title="4. Acceptable Use Policy">
    <Subsection id="permitted-uses" title="4.1 Permitted Uses">
      <ul className="list-disc list-inside space-y-2">
        <li>Monitoring authorized websites</li>
        <li>Generating reports for clients with consent</li>
        <li>Using our API within documented limits</li>
      </ul>
    </Subsection>
    <Subsection id="prohibited-activities" title="4.2 Prohibited Activities">
      <ul className="list-disc list-inside space-y-2">
        <li>Violating any applicable law or regulation</li>
        <li>Scraping beyond permitted API limits</li>
        <li>Spamming or distributing harmful content</li>
        <li>Using AI features to generate unlawful or defamatory content</li>
        <li>Engaging in fraudulent or abusive activities</li>
      </ul>
    </Subsection>
    <Subsection id="compliance" title="4.3 Compliance Requirements">
      <p>You must comply with GDPR, CCPA, and all applicable data protection and privacy laws.</p>
    </Subsection>
  </Section>
  {/* ✅ Continue Sections 5–14 in this same format... */}
  {/* -------------------- Section 5: Payment and Billing -------------------- */}

  {/* -------------------- Section 5: Payment and Billing -------------------- */}
<Section id="payment-billing" title="5. Payment and Billing">
  <Subsection id="subscription-fees" title="5.1 Subscription Fees">
    <ul className="list-disc list-inside space-y-2">
      <li>All subscription fees are billed in advance on a recurring basis (monthly or annually).</li>
      <li>Your plan will automatically renew unless canceled before the renewal date.</li>
      <li>Applicable taxes and fees will be added as required by law.</li>
    </ul>
  </Subsection>
  <Subsection id="payment-methods" title="5.2 Payment Methods">
    <p>
      By providing payment details, you authorize us to charge your designated payment method on a recurring basis until you cancel your subscription.
      It is your responsibility to maintain valid payment details and sufficient funds.
    </p>
  </Subsection>
  <Subsection id="refunds-cancellation" title="5.3 Refunds and Cancellation">
    <p>You may cancel your subscription at any time via your account dashboard. Our refund policy:</p>
    <ul className="list-disc list-inside space-y-2">
      <li>A full refund is available within 30 days of your first subscription payment.</li>
      <li>No refunds are provided after 30 days or for partial billing periods.</li>
    </ul>
  </Subsection>
</Section>

{/* -------------------- Section 6: Intellectual Property -------------------- */}
<Section id="intellectual-property" title="6. Intellectual Property Rights">
  <Subsection id="our-ip" title="6.1 Our Intellectual Property">
    <p>
      All rights, title, and interest in the Service, including trademarks, content, software, and technology, are owned by Sumryze or its licensors and protected by copyright and other intellectual property laws. Unauthorized use is prohibited.
    </p>
  </Subsection>
  <Subsection id="user-content" title="6.2 User Content">
    <p>
      You retain ownership of your content. By submitting content, you grant us a limited, non-exclusive, revocable license to store, process, and display such content solely to provide the Service.
    </p>
  </Subsection>
  <Subsection id="license-grant" title="6.3 License Grant">
    <p>
      We grant you a limited, revocable, non-transferable license to access and use the Service in accordance with these Terms. Feedback you provide may be used without obligation or attribution.
    </p>
  </Subsection>
</Section>

{/* -------------------- Section 7: Privacy and Data Protection -------------------- */}
<Section id="privacy-data" title="7. Privacy and Data Protection">
  <p>
    Your privacy is a core priority at Sumryze. The collection, processing, and storage of your personal data are governed by our{" "}
    <a href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>. This includes details on the types of data we collect, how it is used, and your choices.
  </p>
  <p className="mt-4">
    <strong>Data Protection Rights:</strong> If you are located in the European Union (EU) or European Economic Area (EEA), you are entitled to rights under the General Data Protection Regulation (GDPR), including:
  </p>
  <ul className="list-disc list-inside space-y-1 mt-2">
    <li>The right to access, correct, or delete your personal data</li>
    <li>The right to restrict or object to processing</li>
    <li>The right to data portability</li>
    <li>The right to lodge a complaint with your local data protection authority</li>
  </ul>
  <p className="mt-4">If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA), including:</p>
  <ul className="list-disc list-inside space-y-1 mt-2">
    <li>The right to know what personal data we collect and how we use it</li>
    <li>The right to request deletion of your personal data</li>
    <li>The right to opt-out of the sale or sharing of personal information (we do not sell your data)</li>
  </ul>
  <p className="mt-4">
    <strong>AI-Powered Features:</strong> Any data processed for AI-driven insights (e.g., automated SEO suggestions) is used solely to generate reports and recommendations for your account.
  </p>
  <p className="mt-4">
    By using our Service, you consent to the transfer and processing of your data in the United States and other jurisdictions as necessary to deliver the Service in compliance with applicable laws.
  </p>
  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mt-4">
    <p>
      <strong>Need a Data Processing Addendum (DPA)?</strong> Businesses requiring a DPA for GDPR compliance can request one by contacting us at{" "}
      <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">privacy@sumryze.com</a>.
    </p>
  </div>
</Section>

{/* -------------------- Section 8: Disclaimers and Warranties -------------------- */}
<Section id="disclaimers" title="8. Disclaimers and Warranties">
  <Subsection id="service-disclaimers" title="8.1 Service Disclaimers">
    <ul className="list-disc list-inside space-y-2">
      <li>The Service is provided on an “as is” and “as available” basis without warranties of any kind.</li>
      <li>We do not guarantee uninterrupted or error-free operation, accuracy of reports, or specific SEO results.</li>
      <li>AI-powered features provide insights and suggestions only. They do not constitute legal, financial, or professional advice.</li>
      <li><strong>Important:</strong> <em>AI-powered features cannot predict future results with certainty. Use at your discretion.</em></li>
      <li>No guarantee of compatibility with third-party tools or integrations.</li>
    </ul>
  </Subsection>
  <Subsection id="warranty-disclaimers" title="8.2 Warranty Disclaimers">
    <p>To the fullest extent permitted by law, we disclaim all implied warranties, including merchantability, fitness for a particular purpose, and non-infringement.</p>
  </Subsection>
</Section>

{/* -------------------- Section 9: Limitation of Liability -------------------- */}
<Section id="limitation-liability" title="9. Limitation of Liability">
  <p>To the maximum extent permitted by law, Sumryze and its affiliates shall not be liable for indirect, incidental, special, or consequential damages, including loss of profits or data, arising from use of the Service.</p>
  <p>Our total liability for any claims will not exceed the amount you paid for the Service in the last 12 months.</p>
</Section>

{/* -------------------- Section 10: Indemnification -------------------- */}
<Section id="indemnification" title="10. Indemnification">
  <p>You agree to indemnify and hold harmless Sumryze, its officers, employees, and affiliates from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising from:</p>
  <ul className="list-disc list-inside space-y-2 mt-2">
    <li>Your violation of these Terms</li>
    <li>Misuse of the Service or API</li>
    <li>Content you submit or actions you perform using our Service</li>
    <li>Infringement of any third-party rights</li>
  </ul>
</Section>

{/* -------------------- Section 11: Termination -------------------- */}
<Section id="termination" title="11. Termination">
  <Subsection id="termination-by-user" title="11.1 Termination by User">
    <p>You may terminate your account at any time through your dashboard settings. Upon termination, subscription fees already paid are non-refundable unless covered by our refund policy.</p>
  </Subsection>
  <Subsection id="termination-by-us" title="11.2 Termination by Sumryze">
    <p>We reserve the right to suspend or terminate your access immediately, without liability, for:</p>
    <ul className="list-disc list-inside space-y-2 mt-2">
      <li>Violation of these Terms</li>
      <li>Legal or regulatory compliance</li>
      <li>Fraudulent, abusive, or harmful activity</li>
      <li>Security threats to the platform or other users</li>
    </ul>
  </Subsection>
  <Subsection id="effect-of-termination" title="11.3 Effect of Termination">
    <p>Upon termination, your access to the Service will cease immediately. We may permanently delete your account data within 30 days unless otherwise required by law.</p>
  </Subsection>
</Section>

{/* -------------------- Section 12: Governing Law and Disputes -------------------- */}
<Section id="governing-law" title="12. Governing Law and Disputes">
  <Subsection id="governing-law-clause" title="12.1 Governing Law">
    <p>These Terms are governed by and construed in accordance with the laws of the State of California, U.S.A.</p>
  </Subsection>
  <Subsection id="dispute-resolution" title="12.2 Dispute Resolution">
    <p>Before initiating any legal action, you agree to attempt to resolve disputes informally by contacting us at <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">privacy@sumryze.com</a>.</p>
  </Subsection>
  <Subsection id="arbitration" title="12.3 Arbitration and Class-Action Waiver">
    <p>Any disputes arising out of these Terms shall be resolved exclusively through binding arbitration under the American Arbitration Association (AAA) rules. <strong>You waive your right to a jury trial and agree that all claims must be brought individually.</strong></p>
    <p>Arbitration shall take place in California, U.S.A. You may opt out within 30 days by emailing <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">privacy@sumryze.com</a>.</p>
  </Subsection>
</Section>

{/* -------------------- Section 13: General Provisions -------------------- */}
<Section id="general-provisions" title="13. General Provisions">
  <Subsection id="entire-agreement" title="13.1 Entire Agreement">
    <p>These Terms, together with our Privacy Policy and any supplemental agreements, represent the entire agreement between you and Sumryze.</p>
  </Subsection>
  <Subsection id="severability" title="13.2 Severability">
    <p>If any provision of these Terms is found to be invalid, the remaining provisions shall continue in full force.</p>
  </Subsection>
  <Subsection id="force-majeure" title="13.3 Force Majeure">
    <p>We are not liable for delays caused by events beyond our control, including natural disasters, war, pandemics, cyberattacks, or government actions.</p>
  </Subsection>
</Section>

{/* -------------------- Section 14: Contact Information -------------------- */}
<Section id="contact-information" title="14. Contact Information">
  <p>If you have any questions about these Terms, please contact us:</p>
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mt-4">
    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h4>
    <div className="flex items-center gap-3">
      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      <a href="mailto:support@sumryze.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">support@sumryze.com</a>
    </div>
  </div>
  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 font-medium">Related Links:</p>
    <ul className="space-y-2 text-sm">
      <li><a href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</a></li>
      <li><a href="/legal/cookies" className="text-blue-600 hover:underline">Cookie Policy</a></li>
      <li><a href="/legal/refund" className="text-blue-600 hover:underline">Refund & Cancellation Policy</a></li>
    </ul>
  </div>
</Section>


          
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
