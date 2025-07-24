// app/dashboard/api-docs/page.tsx
import type { Metadata } from "next";
import ApiDocsContent from "@/components/Legal/ApiDocsContent";

export const metadata: Metadata = {
  title: "API Documentation | Sumryze Dashboard",
  description:
    "Integrate Sumryze's SEO analytics into your application with our comprehensive REST API documentation.",
  keywords: ["Sumryze API", "SEO API", "analytics API", "API documentation"],
  openGraph: {
    title: "Sumryze API Documentation",
    description:
      "Full API reference for developers to integrate Sumryze SEO and analytics.",
    url: "https://yourdomain.com/dashboard/api-docs",
    siteName: "Sumryze",
    images: [
      {
        url: "/images/api-docs-og.png",
        width: 1200,
        height: 630,
        alt: "Sumryze API Docs",
      },
    ],
    type: "website",
  },
};

export default function ApiDocsPage() {
  return <ApiDocsContent />;
}
