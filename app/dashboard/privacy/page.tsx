




"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { Calendar, Shield, Eye, Database, Users, Lock, FileText, ChevronRight, Globe } from "lucide-react"


export default function PrivacyPolicyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("introduction")

  const lastUpdated = "January 15, 2024"

  const tableOfContents = [
    {
      id: "introduction",
      title: "Introduction",
      icon: FileText,
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: Database,
      subsections: [
        { id: "personal-information", title: "Personal Information" },
        { id: "usage-data", title: "Usage Data" },
        { id: "cookies-tracking", title: "Cookies & Tracking" },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: Eye,
      subsections: [
        { id: "service-provision", title: "Service Provision" },
        { id: "communication", title: "Communication" },
        { id: "improvement", title: "Service Improvement" },
      ],
    },
    {
      id: "data-storage-security",
      title: "Data Storage & Security",
      icon: Lock,
      subsections: [
        { id: "data-storage", title: "Data Storage" },
        { id: "security-measures", title: "Security Measures" },
        { id: "data-retention", title: "Data Retention" },
      ],
    },
    {
      id: "sharing-disclosure",
      title: "Information Sharing & Disclosure",
      icon: Users,
      subsections: [
        { id: "third-party-services", title: "Third-Party Services" },
        { id: "legal-requirements", title: "Legal Requirements" },
        { id: "business-transfers", title: "Business Transfers" },
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights & Choices",
      icon: Shield,
      subsections: [
        { id: "access-rights", title: "Access Rights" },
        { id: "data-portability", title: "Data Portability" },
        { id: "deletion-rights", title: "Deletion Rights" },
        { id: "opt-out", title: "Opt-Out Options" },
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: Globe,
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: Users,
    },
    {
      id: "policy-changes",
      title: "Changes to This Policy",
      icon: FileText,
    },
    {
      id: "contact-us",
      title: "Contact Us",
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
    
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        

        <div className="flex flex-1 pt-0">
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto">
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
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 lg:p-12">
              <Section id="introduction" title="Introduction">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  At Sumryze, we are committed to protecting your privacy and ensuring the security of your personal
                  information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you use our SEO analytics platform and related services.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By using Sumryze, you agree to the collection and use of information in accordance with this policy.
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Quick Summary:</strong> We collect minimal data necessary to provide our SEO analytics
                    services, never sell your personal information, and give you full control over your data.
                  </p>
                </div>
              </Section>

              <Section id="information-we-collect" title="Information We Collect">
                <Subsection id="personal-information" title="Personal Information">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                    <li>Create an account or register for our services</li>
                    <li>Subscribe to our newsletter or marketing communications</li>
                    <li>Contact us for support or inquiries</li>
                    <li>Participate in surveys or feedback forms</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    This may include your name, email address, company name, phone number, and billing information.
                  </p>
                </Subsection>

                <Subsection id="usage-data" title="Usage Data">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We automatically collect certain information when you use our services, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our platform</li>
                    <li>Referring website and search terms</li>
                    <li>Operating system and device identifiers</li>
                  </ul>
                </Subsection>

                <Subsection id="cookies-tracking" title="Cookies & Tracking Technologies">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to enhance your experience:
                  </p>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            Cookie Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            Purpose
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Essential</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            Authentication and security
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Session</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Analytics</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                            Usage statistics and improvements
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">2 years</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Preferences</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Remember your settings</td>
                          <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Subsection>
              </Section>

              <Section id="how-we-use-information" title="How We Use Your Information">
                <Subsection id="service-provision" title="Service Provision">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We use your information to provide, maintain, and improve our SEO analytics services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Process your account registration and manage your subscription</li>
                    <li>Generate SEO reports and analytics for your websites</li>
                    <li>Provide customer support and respond to your inquiries</li>
                    <li>Process payments and manage billing</li>
                  </ul>
                </Subsection>

                <Subsection id="communication" title="Communication">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We may use your contact information to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Send service-related notifications and updates</li>
                    <li>Provide technical support and customer service</li>
                    <li>Send marketing communications (with your consent)</li>
                    <li>Notify you about changes to our services or policies</li>
                  </ul>
                </Subsection>

                <Subsection id="improvement" title="Service Improvement">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We analyze usage data to understand how our services are used, identify areas for improvement, and
                    develop new features that better serve our users' needs.
                  </p>
                </Subsection>
              </Section>

              <Section id="data-storage-security" title="Data Storage & Security">
                <Subsection id="data-storage" title="Data Storage">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Your data is stored on secure servers located in the United States and European Union. We use
                    industry-standard cloud infrastructure providers with robust security measures and compliance
                    certifications.
                  </p>
                </Subsection>

                <Subsection id="security-measures" title="Security Measures">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We implement comprehensive security measures to protect your information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>AES-256 encryption for data at rest</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Multi-factor authentication for admin access</li>
                    <li>Employee background checks and security training</li>
                  </ul>
                </Subsection>

                <Subsection id="data-retention" title="Data Retention">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We retain your personal information only as long as necessary to provide our services and comply
                    with legal obligations. Account data is typically retained for 3 years after account closure, unless
                    you request earlier deletion.
                  </p>
                </Subsection>
              </Section>

              <Section id="sharing-disclosure" title="Information Sharing & Disclosure">
                <Subsection id="third-party-services" title="Third-Party Services">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    We may share your information with trusted third-party service providers who assist us in operating
                    our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Payment processors (Stripe, PayPal)</li>
                    <li>Cloud hosting providers (AWS, Google Cloud)</li>
                    <li>Analytics services (Google Analytics)</li>
                    <li>Customer support tools (Intercom, Zendesk)</li>
                  </ul>
                </Subsection>

                <Subsection id="legal-requirements" title="Legal Requirements">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We may disclose your information if required by law, court order, or government request, or to
                    protect our rights, property, or safety, or that of our users or the public.
                  </p>
                </Subsection>

                <Subsection id="business-transfers" title="Business Transfers">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred to the
                    new entity, subject to the same privacy protections outlined in this policy.
                  </p>
                </Subsection>
              </Section>

              <Section id="user-rights" title="Your Rights & Choices">
                <Subsection id="access-rights" title="Access Rights">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You have the right to access, review, and obtain a copy of your personal information. You can access
                    most of your data directly through your account dashboard.
                  </p>
                </Subsection>

                <Subsection id="data-portability" title="Data Portability">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You can export your data in common formats (CSV, JSON) through our platform or by contacting our
                    support team.
                  </p>
                </Subsection>

                <Subsection id="deletion-rights" title="Deletion Rights">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You can request deletion of your personal information at any time. Some information may be retained
                    for legal or legitimate business purposes.
                  </p>
                </Subsection>

                <Subsection id="opt-out" title="Opt-Out Options">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    You can opt out of marketing communications at any time by clicking the unsubscribe link in emails
                    or updating your preferences in your account settings.
                  </p>
                </Subsection>
              </Section>

              <Section id="international-transfers" title="International Data Transfers">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure
                  appropriate safeguards are in place, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Adequacy decisions for data transfers to approved countries</li>
                  <li>Certification under privacy frameworks like Privacy Shield successors</li>
                </ul>
              </Section>

              <Section id="children-privacy" title="Children's Privacy">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you become aware that a child has provided us with personal
                  information, please contact us immediately.
                </p>
              </Section>

              <Section id="policy-changes" title="Changes to This Policy">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your continued use of our services after any changes indicates your acceptance of the updated policy.
                </p>
              </Section>

              <Section id="contact-us" title="Contact Us">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h4>
                      <p className="text-gray-700 dark:text-gray-300">privacy@sumryze.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Mailing Address</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Sumryze Inc.
                        <br />
                        123 Privacy Street
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      For EU residents: You also have the right to lodge a complaint with your local data protection
                      authority.
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          </main>
        </div>

        {/* Footer */}
     

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
   
  )
}
