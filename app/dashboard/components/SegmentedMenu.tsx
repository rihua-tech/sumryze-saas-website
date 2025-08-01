"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SegmentedMenu() {
  const pathname = usePathname();

  const links = [
    { label: "Overview", href: "/dashboard" },
    { label: "Reports", href: "/dashboard/reports" },
    { label: "Analytics", href: "/dashboard/analytics" },
    { label: "AI SEO", href: "/dashboard/ai-seo" },
    { label: "Clients", href: "/dashboard/clients" },
  ];

  return (
    <div className="w-full flex justify-center mt-3">
      <div className="flex gap-5 text-[9px] md:gap-8 md:text-sm text-gray-800 dark:text-gray-200">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href}>
              <span
                className={`cursor-pointer transition-all font-medium ${
                  isActive
                    ? "text-green-600 border-b-2 border-green-600"
                    : "hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
