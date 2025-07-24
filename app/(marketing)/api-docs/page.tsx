import Head from "next/head";
import ApiDocsContent from "@/components/Legal/ApiDocsContent";

export const metadata = {
  title: "API Documentation | Sumryze",
  description:
    "Explore Sumryze's API documentation to integrate automated SEO reports and analytics into your applications. Access endpoints, examples, and authentication details.",
  openGraph: {
    title: "API Documentation | Sumryze",
    description:
      "Explore Sumryze's API documentation to integrate automated SEO reports and analytics into your applications.",
    url: "https://yourdomain.com/api-docs",
    siteName: "Sumryze",
    type: "website",
  },
};

export default function ApiDocsPage() {
  return (
    <>
      <Head>
        {/* ✅ SEO Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* ✅ Page Layout */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ApiDocsContent />
      </main>
    </>
  );
}
