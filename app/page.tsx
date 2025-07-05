import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, FileText, Zap, Star } from "lucide-react"
import Link from "next/link"
import { HeroCarousel } from "@/components/HeroCarousel"
import Testimonials from "@/components/ui/Testimonials"
import ComparePlans from "@/components/ComparePlans"





export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-6 sm:py-8 md:py-10 lg:py-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8">
          
          {/* ✅ Grid now switches to 1 column on mobile, 2 columns on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-center">

            {/* LEFT: Text content */}
            {/* ✅ Added `space-y-8` for clean vertical spacing between elements */}
            {/* ✅ `text-center` for mobile, `lg:text-left` for desktop alignment */}
              <div className="text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-5 lg:space-y-5">



              {/* 🔁 No change here — badge stays the same */}
              <Badge className="text-xs px-2  bg-indigo-100 text-indigo-700 rounded-full font-sm">
                🚀 White-Label AI Reporting Platform
              </Badge>

              {/* ✅ Headline and subheadline keep same size, no change */}
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                Automated SEO Reports
              </h1>

      
              <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent leading-tight">
                Powered by AI
              </h2>

              {/* ✅ `max-w-xl` keeps line width readable */}
              {/* ✅ `mx-auto lg:mx-0` centers text on mobile, aligns left on desktop */}
              <p className="text-sm lg:text-sm text-gray-700 max-w-xl mx-auto lg:mx-0">
                Generate beautifully branded SEO reports in minutes — not hours.
                Wow your clients, save hours of manual work, and grow your agency with AI-driven insights.
              </p>

              {/* ✅ Buttons now stack on mobile (`flex-col`) and align side-by-side on tablet/desktop (`sm:flex-row`) */}
              {/* ✅ `justify-center` on mobile, `lg:justify-start` on large screens */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">

                {/* ✅ Button font-size, padding, and animation cleaned up */}
                <Link href="/demo">
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 hover:scale-105 text-lg px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Try It Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {/* ✅ Secondary button adjusted to be slightly smaller, lighter padding */}
                <Link href="/demo">
                  <Button
                   size="sm"
                    variant="outline"
                    className="text-base px-6 py-3 font-semibold hover:bg-indigo-50"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>

              {/* 🔁 Subtitle note below buttons — unchanged but moved below spacing for clarity */}
           
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                No credit card required · Cancel anytime
              </p>
            </div>

            {/* RIGHT: Carousel */}
            {/* ✅ Carousel wrapped in responsive width container */}
            {/* ✅ `aspect-[16/9]` guarantees correct image ratio on all screens */}
            {/* ✅ `max-w-full` allows it to shrink gracefully on phones */}
            {/* ✅ `sm:max-w-md` prevents it from getting too wide on small tablets */}
            <div className="w-full max-w-full sm:max-w-md lg:max-w-none mx-auto aspect-[16/9]">
            
            <HeroCarousel />
            </div>
            
          </div>
        </div>
      </section>
    
  
{/* Features Overview */}
<section className="py-10 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
        Everything you need to scale your reporting
      </h2>
        <p className="text-sm lg:text-base text-gray-700 max-w-xl mx-auto leading-relaxed text-center">

        Powerful features designed to save time and impress clients
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* SEO Automation */}
      <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-xl">
        <CardContent className="p-4 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-200 transition-colors">
            <Zap className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Automation</h3>
         
          <p className="text-sm text-gray-700 mb-2 leading-relaxed">
            Get a full audit of your site’s SEO health in seconds — no technical skills needed.
          </p>
          <a href="/features#seo-automation" className="text-indigo-600 font-medium hover:underline">
            Learn More →
          </a>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-xl">
        <CardContent className="p-4 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
            <BarChart3 className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI Insights</h3>
          
          <p className="text-sm text-gray-700 mb-2 leading-relaxed">
            Uncover trends and get data-backed recommendations to boost your rankings and traffic.
          </p>
          <a href="/features#ai-insights" className="text-emerald-600 font-medium hover:underline">
            Learn More →
          </a>
        </CardContent>
      </Card>

      {/* Multi-Format Delivery */}
      <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-0 shadow-xl">
        <CardContent className="p-4 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Format Delivery</h3>
          
        <p className="text-sm text-gray-700 mb-2 leading-relaxed">
            Send reports via Notion, PDF, or HTML — fully branded and delivered automatically.
          </p>
          <a href="/features#multi-format-delivery" className="text-purple-600 font-medium hover:underline">
            Learn More →
          </a>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

<section className="w-full  bg-white py-8">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Who It's For</h2>
    
        <p className="text-sm lg:text-base text-gray-700 max-w-xl mx-auto mb-6 leading-relaxed text-center">
      Sumryze helps a wide range of professionals deliver beautiful SEO reports — without the busywork.
      </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
      {/* Agencies */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">📈</span>
          <h3 className="text-xl font-bold text-purple-900">Agencies</h3>
        </div>
        <p className= "text-sm text-gray-700 mb-2 leading-relaxed">
          Automate client reporting. Impress with white-labeled SEO reports delivered in minutes.
        </p>
      </div>

      {/* Freelancers */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">👩‍💻</span>
          <h3 className="text-xl font-bold text-green-700">Freelancers</h3>
        </div>
        
         <p className= "text-sm text-gray-700 mb-2 leading-relaxed">
          Look like a pro. Deliver premium AI-powered insights with zero manual effort or coding skills.
        </p>
      </div>

      {/* eCommerce Teams */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🛒</span>
          <h3 className="text-xl font-bold text-blue-700">eCommerce Teams</h3>
        </div>
       
         <p className= "text-sm text-gray-700 mb-2 leading-relaxed">
          Identify traffic issues, monitor keywords, and boost product visibility with automated reporting.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Light 3-column benefit comparison table */}
<ComparePlans />

<Testimonials />

      {/* CTA Section */}
      <section className="py-12 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to transform your reporting?</h2>
          <p className="text-base text-indigo-100 mb-5 leading-relaxed">
            Join thousands of agencies and consultants who trust Sumryze for their client reporting needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button
                size="sm"
                className="bg-white text-indigo-600 hover:bg-gray-100 text-base px-6 py-1 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              
              <Button
              size="sm"
              className="bg-white/10 text-white hover:bg-white hover:text-indigo-600 text-base px-6 py-1 font-medium transition-all duration-300 border border-white"
>
               View Pricing
              </Button>

            </Link>
          </div>

            {/* ✅ Social Proof Line */}
           <p className="text-sm text-indigo-100 mt-6">
            💜 Trusted by early adopters from top SEO and marketing agencies.
            </p>


        </div>
      </section>

    </div>
  )
}
