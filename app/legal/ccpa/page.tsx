"use client";

import { useState } from "react";
import { Shield, Send } from "lucide-react";

export default function CCPAPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("Access My Data");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // ✅ Basic Validation
    if (!fullName.trim() || !email.trim()) {
      setErrorMessage("Full Name and Email are required.");
      return;
    }

    setLoading(true);

    try {
      // ✅ API Integration Placeholder
      const response = await fetch("/api/ccpa-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, requestType, details }),
      });

      if (response.ok) {
        setSuccessMessage("Your CCPA request has been submitted successfully.");
        setFullName("");
        setEmail("");
        setDetails("");
        setRequestType("Access My Data");
      } else {
        throw new Error("Failed to submit request.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* ✅ Header */}
        <div className="text-center mb-6">
          <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            California Consumer Privacy Act (CCPA)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Use this page to exercise your privacy rights under CCPA.
          </p>
        </div>

        {/* ✅ Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg mb-6 text-sm text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-1">Under the <strong>CCPA</strong>, California residents have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request disclosure of collected personal information</li>
            <li>Request deletion of personal data</li>
            <li>Opt out of the sale of personal information</li>
          </ul>
        </div>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Request Type */}
          <div>
            <label htmlFor="requestType" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Request Type
            </label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option>Access My Data</option>
              <option>Delete My Data</option>
              <option>Opt Out of Data Sale</option>
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label htmlFor="details" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Provide any extra details about your request..."
              rows={4}
            />
          </div>

          {/* ✅ Error / Success Messages */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            <Send className="w-5 h-5" />
            {loading ? "Submitting..." : "Submit CCPA Request"}
          </button>
        </form>

        {/* ✅ Footer Note */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
          For additional assistance, email us at{" "}
          <a href="mailto:privacy@sumryze.com" className="text-blue-600 hover:underline">
            privacy@sumryze.com
          </a>.
        </p>
      </div>
    </main>
  );
}
