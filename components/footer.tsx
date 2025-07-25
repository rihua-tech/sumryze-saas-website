"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import { fetchFromAPI } from "@/lib/utils";


export function Footer() {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `text-xs font-medium ${
      pathname === path ? "text-indigo-600 font-bold" : "text-gray-600 hover:text-indigo-600"
    }`

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ✅ Grid with 5 columns */}
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-x-3 gap-y-4 items-start">


          
          {/* Column 1: Logo + Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/images/logo-icon.svg"
                alt="Sumryze Logo"
                className="w-10 h-9 transition-transform duration-200 group-hover:scale-105 align-middle"
              />
              <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
                Sumryze
              </span>
            </Link>

            <p className="mt-6 text-xs text-gray-600 max-w-xs leading-relaxed">
              White-Label AI Reporting platform providing automated SEO + AI-powered analytics reports for agencies,
              consultants, and SaaS businesses.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 mt-6">
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-gray-500 hover:text-indigo-600 w-5 h-5 transition" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-500 hover:text-indigo-600 w-5 h-5 transition" />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub className="text-gray-500 hover:text-indigo-600 w-5 h-5 transition" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-2">Product</h3>
            
              <ul className="pt-3 space-y-3">

              <li><Link href="/features" className={linkClass("/features")}>Features</Link></li>
              <li><Link href="/pricing" className={linkClass("/pricing")}>Pricing</Link></li>
              
             
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-2">Company</h3>
           <ul className="pt-3 space-y-3 ">
              <li><Link href="/blog" className={linkClass("/blog")}>Blog</Link></li>
              <li><Link href="/about" className={linkClass("/about")}>About</Link></li>
              <li><Link href="/contact" className={linkClass("/contact")}>Contact</Link></li>
              

            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-2">Legal</h3>
           <ul className="pt-3 space-y-3">
              <li><Link href="/legal/privacy" className={linkClass("/legal/privacy")}>Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className={linkClass("/legal/terms")}>Terms of Service</Link></li>
              <li><Link href="/legal/cookies" className={linkClass("/legal/cookies")}>Cookie Policy</Link></li>
            </ul>
          </div>

          {/* ✅ Column 5: Newsletter (Now correctly placed inside the grid) */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-5">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-3">Subscribe to get tips & updates in your inbox.</p>
            

            <form className="flex items-center space-x-2">
             <input
               type="email"
                placeholder="Your email"
                 className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2 rounded-md transition"
                  >
         Subscribe
            </button>
            </form>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Sumryze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
