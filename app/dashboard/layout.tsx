
import ClientLayout from "@/app/dashboard/ClientLayout";
import { ThemeProvider } from "next-themes";
import { UrlProvider } from "@/app/context/UrlContext";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ClientLayout>
        <UrlProvider>{children}</UrlProvider>
      </ClientLayout>
    </ThemeProvider>
  );
}

