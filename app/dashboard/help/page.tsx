// app/dashboard/help/page.tsx
import type { Metadata } from "next";
import HelpContent from "@/components/Legal/HelpContent";

export const metadata: Metadata = {
  title: "Help Center | Sumryze Dashboard",
  description:
    "Find answers to your questions, explore FAQs, and access tutorials for Sumryze SEO automation. Learn how to set up projects, analyze SEO, and manage billing.",
  keywords: [
    "Help Center",
    "Sumryze Help",
    "SEO reporting support",
    "Sumryze dashboard guide",
    "FAQs",
  ],
  openGraph: {
    title: "Sumryze Help Center",
    description:
      "Explore Sumryze's help center for tutorials, FAQs, and troubleshooting guides.",
    url: "https://yourdomain.com/dashboard/help",
    siteName: "Sumryze",
    images: [
      {
        url: "/images/help-center-og.png",
        width: 1200,
        height: 630,
        alt: "Sumryze Help Center",
      },
    ],
    type: "website",
  },
};

export default function HelpPage() {
  return <HelpContent />;
}
