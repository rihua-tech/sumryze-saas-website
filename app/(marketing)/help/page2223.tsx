"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import {
  Search,
  Book,
  BarChart3,
  CreditCard,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react"
import Header from "../dashboard/components/header"
import Sidebar from "../dashboard/components/sidebar"
import Footer from "../dashboard/components/footer"

export default function HelpCenter() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const helpSections = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of Sumryze and set up your first project",
      articles: [
        "Quick Start Guide",
        "Setting up your first website",
        "Understanding your dashboard",
        "Connecting Google Analytics",
        "Adding team members",
      ],
    },
    {
      title: "SEO Reports",
      icon: BarChart3,
      description: "Master SEO analysis and reporting features",
      articles: [
        "Understanding SEO scores",
        "Reading traffic reports",
        "Keyword tracking setup",
        "Core Web Vitals explained",
        "Competitor analysis",
      ],
    },
    {
      title: "Billing & Account",
      icon: CreditCard,
      description: "Manage your subscription and account settings",
      articles: [
        "Upgrading your plan",
        "Managing billing information",
        "Team member permissions",
        "Account security settings",
        "Canceling your subscription",
      ],
    },
  ]

  const faqs = [
    {
      question: "How do I connect my website to Sumryze?",
      answer:
        "You can connect your website by going to Settings > Integrations and adding your website URL. We'll automatically start tracking your SEO metrics within 24 hours.",
    },
    {
      question: "What's included in the free plan?",
      answer:
        "The free plan includes basic SEO monitoring for 1 website, monthly reports, and access to our core features. You can track up to 10 keywords and get basic performance insights.",
    },
    {
      question: "How often is my data updated?",
      answer:
        "Most data is updated daily, with some metrics like Core Web Vitals updated in real-time. Premium plans get more frequent updates and real-time alerts.",
    },
    {
      question: "Can I export my reports?",
      answer:
        "Yes! You can export reports as PDF or CSV files. This feature is available on all paid plans. Free users can export basic reports once per month.",
    },
    {
      question: "How do I invite team members?",
      answer:
        "Go to Settings > Team and click 'Invite Member'. You can set different permission levels for each team member, from viewer access to full admin rights.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay via bank transfer or invoice.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16 transition-colors">
          <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  How can we help you today?
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Find answers, guides, and resources to get the most out of Sumryze
                </p>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for articles, guides, or FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Help Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {helpSections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 group"
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-200">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">{section.description}</p>

                    {/* Articles List */}
                    <div className="space-y-3">
                      {section.articles.map((article, articleIndex) => (
                        <a
                          key={articleIndex}
                          href="#"
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group/article"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 group-hover/article:text-blue-600 dark:group-hover/article:text-blue-400 transition-colors duration-200">
                            {article}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover/article:text-blue-500 group-hover/article:translate-x-1 transition-all duration-200" />
                        </a>
                      ))}
                    </div>

                    {/* View All Link */}
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-2 group/viewall"
                      >
                        View all {section.title.toLowerCase()} articles
                        <ChevronRight className="h-3 w-3 group-hover/viewall:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Quick answers to common questions about Sumryze
                </p>
              </div>

              {/* FAQ Accordion */}
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                          openFAQ === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openFAQ === index && (
                      <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                        <p className="text-gray-600 dark:text-gray-400 pt-4 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Still need help?</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Can't find what you're looking for? Our support team is here to help you succeed.
                  </p>
                </div>

                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group">
                    <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Start Live Chat
                  </button>

                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md group">
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Email Support
                  </button>

                  <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-all duration-200 hover:shadow-md group">
                    <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    Schedule Call
                  </button>
                </div>

                {/* Response Time */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>💬 Live chat: Instant response • 📧 Email: Within 2 hours • 📞 Calls: Same day</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

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
