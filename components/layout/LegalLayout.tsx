"use client";

import React from "react";

import Header from "@/app/dashboard/components/Header00";
import Footer from "@/app/dashboard/components/Footer";


interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ✅ Global Header */}
      <Header userName="" userEmail="" />

      {/* ✅ Main Content (Centered, Responsive) */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-10">{children}</main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
