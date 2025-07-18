"use client";

import { Globe } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm sticky bottom-0 shadow-sm">
      <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4">
        
        {/* ✅ Left: Quick Links */}
        <div className="flex flex-wrap gap-5">
          {["Help Center", "API Docs", "Status", "Privacy Policy", "Terms"].map((link, idx) => (
            <a
              key={idx}
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* ✅ Middle: Status + Language Selector */}
        <div className="flex items-center gap-6">
          {/* Status */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>All systems operational</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 shadow-sm hover:shadow transition cursor-pointer">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <select className="bg-transparent outline-none text-gray-600 dark:text-gray-300 text-sm cursor-pointer">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        {/* ✅ Right: Version + Branding */}
        <div className="text-center sm:text-right">
          <span className="mr-2">v1.0.0</span>
          <span className="mr-2">•</span>
          <span className="mr-2">© {new Date().getFullYear()}</span>
          <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sumryze
          </span>
        </div>

      </div>
    </footer>
  );
}
