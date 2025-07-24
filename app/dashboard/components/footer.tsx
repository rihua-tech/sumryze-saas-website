"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";

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
      
        <div className="max-w-7xl mx-auto px-5 py-5 space-y-8">

        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-gray-500 dark:text-gray-400">

          
          {/* ✅ Left: Logo + Brand + Copyright */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md shadow-md shadow-purple-500/20">
                <Image
                  src="/images/Logo/Sumryze-Logo.svg"
                  alt="Sumryze Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                Sumryze
              </span>
            </Link>
            <span>© {new Date().getFullYear()} Sumryze. All rights reserved.</span>
          </div>

          {/* ✅ Center: Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6">
           {[
             { name: "Help Center", href: "/dashboard/help" },
             { name: "API Docs", href: "/dashboard/api-docs" },
             { name: "Status", href: "/status" },         
             { name: "Privacy Policy", href: "/dashboard/privacy" },
             { name: "Terms", href: "/terms" },
             { name: "Support", href: "/support" },
             ].map((link) => (
            <Link
             key={link.name}
             href={link.href}
            prefetch={false}
            className="hover:underline hover:text-blue-500 dark:hover:text-blue-400"
       >

            {link.name}
          </Link>
  ))}


          </div>

          {/* ✅ Right: Language Selector */}
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              aria-label="Select Language"
              className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1C1F27]"
            >
              <Globe className="h-4 w-4" />
              <span>{selectedLanguage}</span>
              <svg
                className={`h-3 w-3 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
