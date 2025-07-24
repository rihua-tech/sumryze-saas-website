import type { Metadata } from "next";
import PrivacyContent from "@/components/Legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Sumryze",
  description:
    "Read Sumryze's Privacy Policy to understand how we collect, use, and protect your data. Your privacy is our top priority.",
  keywords: [
    "Privacy Policy",
    "Sumryze privacy",
    "data protection",
    "user rights",
    "data security",
    "GDPR compliance",
  ],
  openGraph: {
    title: "Privacy Policy | Sumryze",
    description:
      "Learn how Sumryze protects your data and ensures transparency in data usage, storage, and security.",
    url: "https://yourdomain.com/privacy",
    type: "website",
    siteName: "Sumryze",
    images: [
      {
        url: "/images/privacy-og.png", // ✅ Place your OG image in /public/images/
        width: 1200,
        height: 630,
        alt: "Sumryze Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sumryze",
    description:
      "Explore Sumryze's commitment to your privacy and data protection.",
    images: ["/images/privacy-og.png"],
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
