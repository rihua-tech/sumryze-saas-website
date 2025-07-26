"use client";

import { useState } from "react";
import { MessageCircle, Mail, HelpCircle, ExternalLink, Send, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", issue: "", message: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!form.name || !form.email || !form.issue || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("✅ Your request has been submitted!");
        setForm({ name: "", email: "", issue: "", message: "" });
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      toast.error("❌ Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ✅ Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-500" />
            Need Help?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're here to help you get the most out of Sumryze. Choose how you'd like to get in touch with our support team.
          </p>
        </div>

        {/* ✅ Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Chat */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="text-blue-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Chat</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get instant help from our AI assistant or support team. Average response time: ~2 mins.
            </p>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              Start Live Chat
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-green-500 w-6 h-6" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Support</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Send us your queries, and we'll respond within 4 hours during business days.
            </p>
            <a
              href="mailto:support@sumryze.com"
              className="w-full inline-block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* ✅ Support Request Form */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Submit a Support Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@company.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Issue Type *</label>
              <select
                name="issue"
                value={form.issue}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an issue type</option>
                <option value="billing">Billing</option>
                <option value="technical">Technical Issue</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                placeholder="Please describe your issue in detail..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"} <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* ✅ Quick Resources & FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-500 hover:underline">
                  Help Center & Documentation <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-blue-500 hover:underline">
                  API Documentation <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a href="/dashboard/status" className="flex items-center gap-2 text-blue-500 hover:underline">
                  System Status Page <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                <strong>How do I reset my password?</strong>
                <p>Click "Forgot Password" on the login page or contact support for help.</p>
              </li>
              <li>
                <strong>Can I export my data?</strong>
                <p>Yes, export options are available in your account settings.</p>
              </li>
              <li>
                <strong>How do I upgrade my plan?</strong>
                <p>Go to Billing & Subscription in your account settings to upgrade.</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
