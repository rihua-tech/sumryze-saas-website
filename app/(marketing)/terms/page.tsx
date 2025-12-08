"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { Calendar, Scale, FileText, Users, CreditCard, Shield, AlertTriangle, ChevronRight, Gavel } from "lucide-react"

export default function TermsOfServicePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("acceptance")

  const lastUpdated = "January 15, 2024"

  const tableOfContents = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: FileText,
    },
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
    {
      id: "privacy-data",
      title: "7. Privacy and Data Protection",
      icon: Shield,
    },
    {
      id: "disclaimers",
      title: "8. Disclaimers and Warranties",
      icon: AlertTriangle,
      subsections: [
        { id: "service-disclaimers", title: "8.1 Service Disclaimers" },
        { id: "warranty-disclaimers", title: "8.2 Warranty Disclaimers" },
      ],
    },
    {
      id: "limitation-liability",
      title: "9. Limitation of Liability",
      icon: AlertTriangle,
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      icon: Shield,
    },
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
    {
      id: "contact-information",
      title: "14. Contact Information",
      icon: Users,
    },
  ]

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.flatMap((section) => [
        section.id,
        ...(section.subsections?.map((sub) => sub.id) || []),
      ])

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>
    </section>
  )

  const Subsection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div id={id} className="mb-8 scroll-mt-24">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="prose prose-gray dark:prose-invert max-w-none">{children}</div>
    </div>
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
   

        <div className="flex flex-1 pt-16">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Table of Contents</h3>
              <nav className="space-y-2">
                {tableOfContents.map((section) => {
                  const Icon = section.icon
                  return (
                    <div key={section.id}>
                      <button
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
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
              <Section id="acceptance" title="1. Acceptance of Terms">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Welcome to Sumryze. These Terms of Service ("Terms") govern your use of the Sumryze platform and
                  services ("Service") operated by Sumryze Inc. ("we," "us," or "our").
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                  of these terms, then you may not access the Service.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>Important:</strong> These Terms constitute a legally binding agreement between you and
                    Sumryze. Please read them carefully before using our services.
                  </p>
                </div>
              </Section>

              <Section id="description-of-service" title="2. Description of Service">
                <Subsection id="service-overview" title="2.1 Service Overview">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Sumryze provides SEO analytics, website monitoring, and performance optimization tools designed to
                    help businesses improve their online presence and search engine rankings.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our services include but are not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
                    <li>SEO performance monitoring and reporting</li>
                    <li>Website technical analysis and recommendations</li>
                    <li>Keyword tracking and competitive analysis</li>
                    <li>Core Web Vitals monitoring</li>
                    <li>AI-powered SEO suggestions and insights</li>
                  </ul>
                </Subsection>

                <Subsection id="service-availability" title="2.2 Service Availability">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We strive to maintain 99.9% uptime for our services. However, we do not guarantee uninterrupted
                    access and may experience downtime for maintenance, updates, or unforeseen circumstances.
                  </p>
                </Subsection>

                <Subsection id="service-modifications" title="2.3 Service Modifications">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any part of our Service at any time with or
                    without notice. We will make reasonable efforts to notify users of significant changes.
                  </p>
                </Subsection>
              </Section>

              <Section id="user-accounts" title="3. User Accounts">
                <Subsection id="account-creation" title="3.1 Account Creation">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    To access certain features of our Service, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Be responsible for all activities under your account</li>
                    <li>Not create accounts using automated means</li>
                  </ul>
                </Subsection>

                <Subsection id="account-security" title="3.2 Account Security">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account. You must:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication when available</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Not share your account credentials with others</li>
                  </ul>
                </Subsection>

                <Subsection id="account-termination" title="3.3 Account Termination">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You may terminate your account at any time through your account settings. We may terminate or
                    suspend your account for violations of these Terms or for any other reason at our sole discretion.
                  </p>
                </Subsection>
              </Section>

              <Section id="acceptable-use" title="4. Acceptable Use Policy">
                <Subsection id="permitted-uses" title="4.1 Permitted Uses">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You may use our Service for legitimate business purposes related to SEO analysis and website
                    optimization. Permitted uses include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Monitoring your own websites and those you have authorization to analyze</li>
                    <li>Generating reports for clients (with appropriate permissions)</li>
                    <li>Conducting competitive analysis within reasonable limits</li>
                    <li>Using our API within rate limits and terms</li>
                  </ul>
                </Subsection>

                <Subsection id="prohibited-activities" title="4.2 Prohibited Activities">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You agree not to engage in any of the following prohibited activities:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Violating any applicable laws or regulations</li>
                    <li>Infringing on intellectual property rights</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Distributing malware or harmful code</li>
                    <li>Scraping or harvesting data beyond permitted API usage</li>
                    <li>Reselling or redistributing our services without permission</li>
                    <li>Using the service to spam or send unsolicited communications</li>
                  </ul>
                </Subsection>

                <Subsection id="compliance" title="4.3 Compliance Requirements">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You must comply with all applicable laws, regulations, and third-party terms when using our Service,
                    including but not limited to data protection laws, privacy regulations, and website terms of
                    service.
                  </p>
                </Subsection>
              </Section>

              <Section id="payment-billing" title="5. Payment and Billing">
                <Subsection id="subscription-fees" title="5.1 Subscription Fees">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our Service is offered on a subscription basis with various pricing tiers. Subscription fees are:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Billed in advance on a monthly or annual basis</li>
                    <li>Non-refundable except as expressly stated in these Terms</li>
                    <li>Subject to change with 30 days' notice</li>
                    <li>Exclusive of applicable taxes, which are your responsibility</li>
                  </ul>
                </Subsection>

                <Subsection id="payment-methods" title="5.2 Payment Methods">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We accept major credit cards and other payment methods as displayed during checkout. You authorize
                    us to charge your payment method for all fees incurred.
                  </p>
                </Subsection>

                <Subsection id="refunds-cancellation" title="5.3 Refunds and Cancellation">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You may cancel your subscription at any time. Cancellations take effect at the end of your current
                    billing period. We offer:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>30-day money-back guarantee for new subscribers</li>
                    <li>Pro-rated refunds for annual subscriptions canceled within 30 days</li>
                    <li>No refunds for partial months or unused portions of subscriptions</li>
                  </ul>
                </Subsection>
              </Section>

              <Section id="intellectual-property" title="6. Intellectual Property Rights">
                <Subsection id="our-ip" title="6.1 Our Intellectual Property">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are owned by Sumryze and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                </Subsection>

                <Subsection id="user-content" title="6.2 User Content">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You retain ownership of any content you submit to our Service. By submitting content, you grant us a
                    worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content solely
                    for providing our services.
                  </p>
                </Subsection>

                <Subsection id="license-grant" title="6.3 License Grant">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We grant you a limited, non-exclusive, non-transferable license to access and use our Service in
                    accordance with these Terms. This license terminates upon termination of your account.
                  </p>
                </Subsection>
              </Section>

              <Section id="privacy-data" title="7. Privacy and Data Protection">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By using our Service, you consent to the collection, use, and disclosure of your information as
                  described in our Privacy Policy.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Privacy Policy:</strong> Please review our{" "}
                    <a href="/privacy" className="underline hover:no-underline">
                      Privacy Policy
                    </a>{" "}
                    for detailed information about how we handle your data.
                  </p>
                </div>
              </Section>

              <Section id="disclaimers" title="8. Disclaimers and Warranties">
                <Subsection id="service-disclaimers" title="8.1 Service Disclaimers">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Our Service is provided "as is" and "as available" without warranties of any kind. We do not
                    guarantee that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>The Service will be uninterrupted or error-free</li>
                    <li>All data will be accurate or complete</li>
                    <li>The Service will meet your specific requirements</li>
                    <li>Any defects will be corrected</li>
                  </ul>
                </Subsection>

                <Subsection id="warranty-disclaimers" title="8.2 Warranty Disclaimers">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To the fullest extent permitted by law, we disclaim all warranties, express or implied, including
                    but not limited to implied warranties of merchantability, fitness for a particular purpose, and
                    non-infringement.
                  </p>
                </Subsection>
              </Section>

              <Section id="limitation-liability" title="9. Limitation of Liability">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In no event shall Sumryze, its directors, employees, partners, agents, suppliers, or affiliates be
                  liable for any indirect, incidental, special, consequential, or punitive damages, including but not
                  limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Loss of profits, data, use, goodwill, or other intangible losses</li>
                  <li>Damages resulting from unauthorized access to your account</li>
                  <li>Damages resulting from any third-party conduct or content</li>
                  <li>Damages resulting from interruption or cessation of service</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our total liability to you for all claims arising from or relating to the Service shall not exceed the
                  amount you paid us in the 12 months preceding the claim.
                </p>
              </Section>

              <Section id="indemnification" title="10. Indemnification">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Sumryze and its affiliates from and against any
                  claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's
                  fees) arising from your use of the Service, violation of these Terms, or infringement of any third
                  party's rights.
                </p>
              </Section>

              <Section id="termination" title="11. Termination">
                <Subsection id="termination-by-user" title="11.1 Termination by User">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You may terminate your account and these Terms at any time by canceling your subscription through
                    your account settings or by contacting our support team.
                  </p>
                </Subsection>

                <Subsection id="termination-by-us" title="11.2 Termination by Sumryze">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We may terminate or suspend your account and access to the Service immediately, without prior notice
                    or liability, for any reason, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Breach of these Terms</li>
                    <li>Non-payment of fees</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Violation of our Acceptable Use Policy</li>
                  </ul>
                </Subsection>

                <Subsection id="effect-of-termination" title="11.3 Effect of Termination">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Upon termination, your right to use the Service will cease immediately. We may delete your account
                    and all associated data after a reasonable period, typically 30 days after termination.
                  </p>
                </Subsection>
              </Section>

              <Section id="governing-law" title="12. Governing Law and Disputes">
                <Subsection id="governing-law-clause" title="12.1 Governing Law">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    California, United States, without regard to its conflict of law provisions.
                  </p>
                </Subsection>

                <Subsection id="dispute-resolution" title="12.2 Dispute Resolution">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We encourage you to contact us first to resolve any disputes. If we cannot resolve a dispute
                    informally, any legal action must be filed within one year of the claim arising.
                  </p>
                </Subsection>

                <Subsection id="arbitration" title="12.3 Arbitration">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Any disputes arising from these Terms or your use of the Service will be resolved through binding
                    arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration
                    Association.
                  </p>
                </Subsection>
              </Section>

              <Section id="general-provisions" title="13. General Provisions">
                <Subsection id="entire-agreement" title="13.1 Entire Agreement">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                    Sumryze regarding the Service and supersede all prior agreements and understandings.
                  </p>
                </Subsection>

                <Subsection id="severability" title="13.2 Severability">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions
                    will remain in full force and effect.
                  </p>
                </Subsection>

                <Subsection id="force-majeure" title="13.3 Force Majeure">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We shall not be liable for any failure to perform our obligations under these Terms due to causes
                    beyond our reasonable control, including natural disasters, war, terrorism, or government actions.
                  </p>
                </Subsection>
              </Section>

              <Section id="contact-information" title="14. Contact Information">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h4>
                      <p className="text-gray-700 dark:text-gray-300">legal@sumryze.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mailing Address</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Sumryze Inc.
                        <br />
                        123 Legal Street
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For general support inquiries, please use our{" "}
                      <a href="/help" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Help Center
                      </a>{" "}
                      or contact support@sumryze.com.
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          </main>
        </div>

     

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
