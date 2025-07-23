"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, TrendingUp } from "lucide-react";

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const languageOptions = [
    { code: "EN", name: "English" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
    { code: "DE", name: "Deutsch" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="bg-white dark:bg-[#12141C] border-t border-gray-200 dark:border-[#2C2F36] transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ✅ Desktop & Tablet */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
          {/* Left */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
            <span>© 2024 Sumryze. All rights reserved.</span>
          </div>

          {/* Center */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/help" className="hover:text-gray-700 dark:hover:text-gray-200">Help Center</a>
            <a href="/api-docs" className="hover:text-gray-700 dark:hover:text-gray-200">API Docs</a>
            <a href="/status" className="hover:text-gray-700 dark:hover:text-gray-200">Status</a>
            <a href="/blog" className="hover:text-gray-700 dark:hover:text-gray-200">Blog</a>
            <a href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-200">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-700 dark:hover:text-gray-200">Terms</a>
            <a href="/support" className="hover:text-gray-700 dark:hover:text-gray-200">Support</a>
          </div>

          {/* Right - Language */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1C1F27]"
            >
              <Globe className="h-4 w-4" />
              <span>{selectedLanguage}</span>
              <svg className={`h-3 w-3 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-40 bg-white dark:bg-[#1C1F27] border rounded-lg shadow-lg">
                {languageOptions.map(option => (
                  <button
                    key={option.code}
                    onClick={() => { setSelectedLanguage(option.code); setIsLanguageDropdownOpen(false); }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-[#2C2F36]"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
