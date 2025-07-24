"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, MessageCircle, Mail, Phone, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const issueTypes = [
    "Technical Issue",
    "Billing & Account",
    "Feature Request",
    "General Question",
    "API & Integrations",
    "Team Management",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.issueType) newErrors.issueType = "Please select an issue type"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", issueType: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
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
            <span className="text-gray-900 dark:text-white font-medium">Support</span>
          </div>

          {/* Hero Section */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Need Help?</h1>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We're here to help you get the most out of Sumryze. Choose how you'd like to get in touch with our support
              team.
            </p>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">Live Chat</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">~2 min response</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div>
                  <div className="font-medium text-green-900 dark:text-green-100">Email Support</div>
                  <div className="text-sm text-green-700 dark:text-green-300">~4 hour response</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="font-medium text-purple-900 dark:text-purple-100">Phone Support</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Mon-Fri 9AM-6PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Submit a Support Request
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>

              <CardContent className="px-0 pb-0">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      We've received your support request and will respond within 4 hours.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        <strong>Ticket ID:</strong> #SUP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={`${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                          placeholder="your.email@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Issue Type */}
                    <div>
                      <label
                        htmlFor="issueType"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Issue Type *
                      </label>
                      <select
                        id="issueType"
                        value={formData.issueType}
                        onChange={(e) => handleInputChange("issueType", e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                          errors.issueType ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      >
                        <option value="">Select an issue type</option>
                        {issueTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.issueType && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.issueType}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className={`${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, or relevant information that might help us assist you better."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                          Privacy Policy
                        </a>
                        . We'll only use your information to respond to your support request.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Chat Widget */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">Online</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Get instant help from our support team. Average response time is under 2 minutes.
              </p>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email Support</div>
                    <a
                      href="mailto:support@sumryze.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      support@sumryze.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Phone Support</div>
                    <a href="tel:+15551234567" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Business Hours</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Monday - Friday
                      <br />
                      9:00 AM - 6:00 PM EST
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Response Times */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Response Times</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Live Chat</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">~2 minutes</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Email Support</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">~4 hours</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Phone Support</span>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Immediate</span>
                </div>
              </div>
            </Card>

            {/* Quick Resources */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Resources</h3>

              <div className="space-y-3">
                <a href="/help" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Help Center & Documentation
                </a>
                <a href="/api-docs" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  API Documentation
                </a>
                <a href="/status" className="block text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  System Status Page
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How do I reset my password?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  You can reset your password by clicking the "Forgot Password" link on the login page, or contact our
                  support team for assistance.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How do I upgrade my plan?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Go to your account settings and click on "Billing & Subscription" to view and upgrade your current
                  plan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can I export my data?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Yes, you can export your data in various formats from the dashboard. Look for the export options in
                  each section.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How do I add team members?</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Navigate to Team Settings in your account menu to invite and manage team members with different
                  permission levels.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
