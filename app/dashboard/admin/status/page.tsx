"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function AdminStatusPage() {
  const { data: session, status } = useSession();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [form, setForm] = useState({ status: "operational", message: "" });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    if (status !== "loading") {
      setLoadingAuth(false);
    }
  }, [status]);

  // ✅ Show loading while checking auth
  if (loadingAuth) {
    return <p className="text-center mt-10 text-gray-500">Checking access...</p>;
  }

  // ✅ If not logged in → Show Sign In button
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">Access Denied</p>
        <button
          onClick={() => signIn()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  // ✅ If user is logged in but NOT admin
  if (session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setResponseMsg("✅ Status updated successfully!");
      } else {
        setResponseMsg("❌ Failed to update status.");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg("❌ An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Admin: Update System Status
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status Dropdown */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="partial">Partial Outage</option>
            <option value="outage">Major Outage</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Message
          </label>
          <input
            type="text"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter status message"
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>

      {responseMsg && (
        <p className="mt-4 text-center text-sm">{responseMsg}</p>
      )}
    </div>
  );
}
