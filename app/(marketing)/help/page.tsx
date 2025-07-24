// app/help/page.tsx
import type { Metadata } from "next";
import HelpContent from "@/components/Legal/HelpContent";

export const metadata: Metadata = {
  title: "Help Center | Sumryze",
  description:
    "Access the Sumryze Help Center for FAQs, quick start guides, and tutorials. Learn how to set up your SEO dashboard, manage reports, and optimize your workflow.",
  keywords: [
    "Help Center",
    "Sumryze Help",
    "SEO support",
    "Sumryze tutorials",
    "FAQs",
  ],
  openGraph: {
    title: "Sumryze Help Center",
    description:
      "Explore FAQs, tutorials, and resources to make the most of Sumryze SEO automation tools.",
    url: "https://yourdomain.com/help",
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
