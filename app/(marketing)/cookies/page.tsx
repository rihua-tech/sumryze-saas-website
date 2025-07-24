"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Cookie, Shield, Settings, BarChart3, Target, Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState("what-are-cookies")

  const sections = [
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "how-we-use", title: "How We Use Cookies" },
    { id: "types-of-cookies", title: "Types of Cookies" },
    { id: "manage-cookies", title: "How to Manage Cookies" },
    { id: "contact", title: "Contact Information" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
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
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <a href="/dashboard" className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Dashboard
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white font-medium">Cookie Policy</span>
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Cookie className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              How we use cookies and similar technologies to improve your experience.
            </p>

            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="h-4 w-4" />
              Last updated: January 15, 2024
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Table of Contents - Desktop Only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-12">
              {/* Section 1: What Are Cookies? */}
              <section id="what-are-cookies" className="scroll-mt-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Are Cookies?</h2>

                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Cookies are small text files that are stored on your device when you visit our website. They help
                      us provide you with a better experience by remembering your preferences, keeping you signed in,
                      and helping us understand how you use Sumryze.
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      At Sumryze, we use cookies and similar technologies to enhance your experience, provide
                      personalized content, analyze our traffic, and improve our services. We are committed to being
                      transparent about how we collect and use your data.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Your Consent Matters</h4>
                          <p className="text-blue-800 dark:text-blue-200 text-sm">
                            By continuing to use Sumryze, you consent to our use of cookies as described in this policy.
                            You can manage your cookie preferences at any time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Section 2: How We Use Cookies */}
              <section id="how-we-use" className="scroll-mt-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How We Use Cookies</h2>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                    We use cookies for several important purposes to ensure Sumryze works properly and provides you with
                    the best possible experience:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Authentication */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-semibold text-green-900 dark:text-green-100">Authentication</h3>
                      </div>
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        Keep you signed in securely and remember your login status across sessions.
                      </p>
                    </div>

                    {/* Preferences */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Preferences</h3>
                      </div>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        Remember your settings like theme preferences, language, and dashboard customizations.
                      </p>
                    </div>

                    {/* Analytics */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-purple-900 dark:text-purple-100">Analytics</h3>
                      </div>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">
                        Understand how you use our platform to improve features and user experience.
                      </p>
                    </div>

                    {/* Performance */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="font-semibold text-orange-900 dark:text-orange-100">Performance</h3>
                      </div>
                      <p className="text-orange-800 dark:text-orange-200 text-sm">
                        Monitor and optimize the performance and reliability of our services.
                      </p>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Section 3: Types of Cookies */}
              <section id="types-of-cookies" className="scroll-mt-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Types of Cookies</h2>

                  <div className="space-y-6">
                    {/* Functional Cookies */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Functional Cookies</h3>
                        <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                          Essential
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        These cookies are essential for the website to function properly. They enable core functionality
                        such as security, network management, and accessibility. You cannot opt-out of these cookies.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Examples:</strong> Authentication tokens, session management, security preferences
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics Cookies</h3>
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          Optional
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        These cookies help us understand how visitors interact with our website by collecting and
                        reporting information anonymously. This helps us improve our services and user experience.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Examples:</strong> Google Analytics, usage statistics, performance monitoring
                      </div>
                    </div>

                    {/* Advertising Cookies */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advertising Cookies</h3>
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          Optional
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        These cookies are used to make advertising messages more relevant to you and your interests.
                        They perform functions like preventing the same ad from continuously reappearing and ensuring
                        ads are properly displayed.
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Examples:</strong> Targeted advertising, conversion tracking, remarketing
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Section 4: How to Manage Cookies */}
              <section id="manage-cookies" className="scroll-mt-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Manage Cookies</h2>

                  <div className="space-y-6">
                    {/* Cookie Preferences */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Cookie Preferences Center
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200 mb-4">
                        The easiest way to manage your cookie preferences is through our Cookie Preferences Center. You
                        can access it at any time to update your choices.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Cookie Preferences
                      </Button>
                    </div>

                    {/* Browser Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browser Settings</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        You can also control cookies through your browser settings. Here's how to manage cookies in
                        popular browsers:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Google Chrome</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Settings → Privacy and security → Cookies and other site data
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mozilla Firefox</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Options → Privacy & Security → Cookies and Site Data
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Safari</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Preferences → Privacy → Manage Website Data
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Microsoft Edge</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Settings → Cookies and site permissions → Cookies and site data
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Important Notice</h4>
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        Please note that disabling certain cookies may affect the functionality of Sumryze. Essential
                        cookies cannot be disabled as they are necessary for the website to function properly.
                      </p>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Section 5: Contact Information */}
              <section id="contact" className="scroll-mt-8">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    If you have any questions about our Cookie Policy or how we handle your data, please don't hesitate
                    to contact us:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email Support */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          For privacy and cookie-related questions:
                        </p>
                        <a
                          href="mailto:privacy@sumryze.com"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          privacy@sumryze.com
                        </a>
                        <br />
                        <a
                          href="mailto:support@sumryze.com"
                          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                        >
                          support@sumryze.com
                        </a>
                      </div>
                    </div>

                    {/* Phone Support */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone Support</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Speak with our support team:</p>
                        <a
                          href="tel:+15551234567"
                          className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
                        >
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Monday - Friday: 9:00 AM - 6:00 PM EST
                          <br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>

                    {/* Mailing Address */}
                    <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Mailing Address</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Sumryze Inc.
                          <br />
                          123 Business Ave, Suite 100
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* CTA Section */}
              <section className="scroll-mt-8">
                <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                      Take Control of Your Cookie Preferences
                    </h2>
                    <p className="text-blue-800 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                      You have the right to control how cookies are used on your device. Manage your preferences to
                      customize your Sumryze experience while maintaining your privacy.
                    </p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Settings className="h-5 w-5 mr-2" />
                      Manage Cookie Preferences
                    </Button>
                  </div>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
