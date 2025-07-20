import { Globe } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors lg:pl-64">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left - Logo and Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/images/sumryze-logo.png" alt="Sumryze" className="h-5 w-auto" />
              <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 Sumryze. All rights reserved.</span>
            </div>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex items-center gap-8">
            <a
              href="/help"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Help Center
            </a>
            <a
              href="/api-docs"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              API Docs
            </a>
            <a
              href="/status"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Status
            </a>
            <a
              href="/blog"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Blog
            </a>
          </div>

          {/* Right - Legal Links + Language Selector */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Terms of Service
            </a>
            <a
              href="/support"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
            >
              Support
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center gap-1.5 px-2 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                <Globe className="h-3.5 w-3.5" />
                <span>EN</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2">
            <img src="/images/sumryze-logo.png" alt="Sumryze" className="h-5 w-auto" />
            <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 Sumryze. All rights reserved.</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <a
                href="/help"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Help Center
              </a>
              <a
                href="/api-docs"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                API Docs
              </a>
              <a
                href="/status"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Status
              </a>
              <a
                href="/blog"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Blog
              </a>
            </div>

            <div className="space-y-3">
              <a
                href="/privacy"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Terms of Service
              </a>
              <a
                href="/support"
                className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:underline underline-offset-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded-sm"
              >
                Support
              </a>
            </div>
          </div>

          {/* Language Selector - Mobile */}
          <div className="flex justify-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
              <Globe className="h-3.5 w-3.5" />
              <span>English</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
