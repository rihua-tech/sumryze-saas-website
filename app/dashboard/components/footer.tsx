"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function DashboardFooter() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const languageOptions = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
  ];

  const navLinksTop = [
    { name: "Help Center", href: "/dashboard/help" },
    { name: "Support", href: "/dashboard/support" },
    { name: "API Docs", href: "/dashboard/api-docs" },
  ];

  const navLinksBottom = [
    { name: "Status", href: "/dashboard/status" },
    { name: "Privacy", href: "/dashboard/privacy" },
    { name: "Terms", href: "/dashboard/terms" },
  ];

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="w-full mt-auto bg-white dark:bg-[#12141C] border-t border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ✅ First Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* ✅ Logo (No Scale, Gradient Text) */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-90 transition"
          >
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 ">
              <Image
                src="/images/Logo/Sumryze-Logo.svg"
                alt="Sumryze Logo"
                width={32}
                height={32}
              />
            </div>
            <span className="font-extrabold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
              Sumryze
            </span>
          </Link>

          {/* ✅ Top Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {navLinksTop.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ✅ Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLanguage}</span>
              <svg
                className={`w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-40 bg-white dark:bg-[#1C1F27] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setSelectedLanguage(option.code);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ✅ Second Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm">
          
          {/* ✅ Copyright */}
          <div className="text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Sumryze. All rights reserved.
          </div>

          {/* ✅ Bottom Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {navLinksBottom.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
