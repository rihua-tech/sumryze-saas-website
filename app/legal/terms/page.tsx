import TermsOfServicePage from "@/components/Legal/TermsOfServicePage";
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <>
      <Navigation />
      
      <TermsOfServicePage/>

      <Footer />
    </>
  );
}
