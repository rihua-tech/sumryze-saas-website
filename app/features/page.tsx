import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  FileText,
  Zap,
  Globe,
  TrendingUp,
  Clock,
  Palette,
  Mail,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      

             <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 text-center">

              <Badge 
                className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs px-3 py-1.5 font-medium rounded-full shadow-sm transition-all duration-200">  
               ✨ Powerful Features
              </Badge>

            <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
               Automate SEO Reports in Minutes
              </h1>

                <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-5 leading-tight">
                From templates to AI-powered insights, built for agencies & pros
             </h2>

              <p className="text-sm sm:text-sm lg:text-sm text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
               Deliver stunning, client-ready SEO reports — with full automation, smart metrics, and customizable branding — all in one place.
            </p>

              
              {/* CTA Buttons */}

             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">

                {/* Primary Button */}
                <a
                href="/signup"
                className="w-full sm:w-auto px-10 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md text-center transition duration-300"
                >
                Start Free Trial
               </a>

               {/* Secondary Button */}
               <a
               href="#feature-cards"
               className="w-full sm:w-auto px-8 py-2 text-sm font-semibold text-indigo-600 bg-white border border-indigo-300 hover:bg-gray-50 rounded-lg shadow-sm text-center transition duration-300"
              >
               Explore Features
             </a>

          </div>         
            
     </div>
</section>



      {/* Core Features */}
      <section  id="feature-cards"className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
            <div>
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-5">
                <Zap className="h-7 w-7 text-indigo-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">SEO Automation</h2>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                Automatically crawl and analyze websites to identify technical SEO issues, track keyword rankings, and
                monitor performance metrics.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Technical SEO audits</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Keyword ranking tracking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Competitor analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Performance monitoring</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-20 w-20 text-indigo-600 mx-auto mb-4" />
                <p className="text-indigo-700 font-semibold text-lg">Automated SEO Analysis</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-12 h-80 flex items-center justify-center lg:order-1">
              <div className="text-center">
                <TrendingUp className="h-20 w-20 text-emerald-600 mx-auto mb-4" />
                <p className="text-emerald-700 font-semibold text-lg">AI-Powered Insights</p>
              </div>
            </div>
            <div className="lg:order-2">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">AI Insights</h2>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                Leverage advanced AI algorithms to uncover hidden opportunities, predict trends, and provide actionable
                recommendations.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Predictive analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Opportunity identification</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Trend analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Smart recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-purple-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Flexible Report Delivery</h2>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                Deliver reports in the format your clients prefer - Notion pages, PDF documents, or interactive HTML
                reports.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Notion integration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">PDF generation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Interactive HTML</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Automated scheduling</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-20 w-20 text-purple-600 mx-auto mb-4" />
                <p className="text-purple-700 font-semibold text-lg">Flexible Report Formats</p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Additional Features Grid */}
<section className="pt-6 pb-10 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-5 lg:px-5">
    <div className="text-center mb-10">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">More powerful features</h2>
      <p className="text-base text-gray-600">Enhance your reporting workflow with automation, branding, and intelligence</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* 1. White-Label Branding */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
            <Palette className="h-7 w-7 text-indigo-600" />
          </div>
          <CardTitle className="text-xl font-bold">White-Label Branding</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Apply your agency’s branding, logo, and colors for a seamless and professional client experience.
          </p>
        </CardContent>
      </Card>

      {/* 2. Automated Scheduling */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
            <Clock className="h-7 w-7 text-emerald-600" />
          </div>
          <CardTitle className="text-xl font-bold">Automated Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Schedule recurring reports to be generated and delivered automatically — no manual work needed.
          </p>
        </CardContent>
      </Card>

      {/* 3. Email Integration */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
            <Mail className="h-7 w-7 text-purple-600" />
          </div>
          <CardTitle className="text-xl font-bold">Email Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Send reports via email using custom templates and flexible delivery schedules.
          </p>
        </CardContent>
      </Card>

      {/* 4. Multi-Site Management */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <Globe className="h-7 w-7 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-bold">Multi-Site Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Manage and generate reports across multiple websites from a single dashboard.
          </p>
        </CardContent>
      </Card>

      {/* 5. Historical Data */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp className="h-7 w-7 text-yellow-600" />
          </div>
          <CardTitle className="text-xl font-bold">Historical Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Monitor performance trends over time with access to full historical analytics data.
          </p>
        </CardContent>
      </Card>

      {/* 6. Smart KPI Templates — REPLACED Custom Metrics */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4">
        <CardHeader>
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle className="h-7 w-7 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold">Smart KPI Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 leading-relaxed">
            Choose from ready-made KPI sets for SEO, content, and traffic goals — or let AI recommend what matters most.
          </p>
        </CardContent>
      </Card>

    </div>
  </div>
</section>



        {/* CTA Section */}
     

            <section className="py-16 bg-indigo-600">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">

                 Ready to experience these features?
                 </h2>
                 <p className="text-base text-indigo-100 mb-8 leading-relaxed">
                   Start your free trial today and see how Sumryze can transform your reporting workflow.
                 </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">


                {/* Primary CTA */}
               <a
                href="/signup"
                className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 text-base px-7 py-1 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
               Try It Free
              <ArrowRight className="ml-2 h-5 w-5" />
              </a>

             {/* Secondary CTA */}
               <a
               href="/pricing"
               className="inline-flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-indigo-600 text-base px-7 py-1 font-semibold rounded-lg border border-white transition-all duration-300"
               >
                View Pricing
              </a>
             </div>

             {/* Social Proof */}
             <p className="text-sm text-indigo-100 mt-6">
             No credit card required. Cancel anytime.
             </p>
            </div>
           </section>


    </div>
  )
}
