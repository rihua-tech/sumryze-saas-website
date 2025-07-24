"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function FooterMarketing() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `text-sm ${
      pathname === path
        ? "text-indigo-600 font-semibold"
        : "text-gray-600 hover:text-indigo-600"
    } transition-colors duration-200`;

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* ✅ Grid with 5 sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* 1️⃣ Brand + Description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/images/logo-icon.svg"
                alt="Sumryze Logo"
                className="w-10 h-10 transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sumryze
              </span>
            </Link>

            <p className="mt-5 text-sm text-gray-600 max-w-sm leading-relaxed">
              White-Label AI Reporting platform providing automated SEO + AI-powered analytics for agencies, consultants, and SaaS businesses.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 mt-5">
              <a href="#" aria-label="Twitter" className="hover:text-indigo-600">
                <FaTwitter className="w-5 h-5 text-gray-500" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600">
                <FaLinkedin className="w-5 h-5 text-gray-500" />
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-indigo-600">
                <FaGithub className="w-5 h-5 text-gray-500" />
              </a>
            </div>
          </div>

          {/* 2️⃣ Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className={linkClass("/features")}>Features</Link></li>
              <li><Link href="/pricing" className={linkClass("/pricing")}>Pricing</Link></li>
              <li><Link href="/demo" className={linkClass("/demo")}>Demo</Link></li>
              <li><Link href="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link></li>
            </ul>
          </div>

          {/* 3️⃣ Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className={linkClass("/blog")}>Blog</Link></li>
              <li><Link href="/about" className={linkClass("/about")}>About</Link></li>
              <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>
              <li><Link href="/affiliate" className={linkClass("/affiliate")}>Affiliate</Link></li>
            </ul>
          </div>

          {/* 4️⃣ Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className={linkClass("/privacy")}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClass("/terms")}>Terms of Service</Link></li>
              <li><Link href="/cookies" className={linkClass("/cookies")}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* ✅ Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sumryze. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
