// components/SidebarGetStarted.tsx
"use client"
import { CheckCircle, Link, CalendarClock, Paintbrush } from "lucide-react"

const steps = [
  {
    title: "Connect Google Search Console",
    icon: Link,
    href: "/connect-gsc",
  },
  {
    title: "Schedule Reports",
    icon: CalendarClock,
    href: "/schedule-report",
  },
  {
    title: "Branding Setup",
    icon: Paintbrush,
    href: "/branding",
  },
]

export function SidebarGetStarted() {
  return (
    <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200 text-sm">
      <h3 className="text-green-800 font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="w-4 h-4" />
        Get Started
      </h3>

      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-2">
            <step.icon className="w-4 h-4 text-green-600 mt-0.5" />
            <a href={step.href} className="hover:underline text-green-700">
              {step.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
