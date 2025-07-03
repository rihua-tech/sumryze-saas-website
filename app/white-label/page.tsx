"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, ArrowRight, Zap, Crown, Shield } from "lucide-react"
import { ReportPreview } from "@/components/ReportPreview";





export default function WhiteLabelPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}

<section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-12 sm:py-20">
  
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <Badge className="mb-4 md:mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs sm:text-sm md:text-base px-3 sm:px-4 py-2 font-semibold">
        👑 White-Label Solution
      </Badge>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 leading-tight md:leading-snug">
        Sell SEO Reports Under
      </h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-indigo-600 mb-6 md:mb-8 leading-tight md:leading-snug">
        Your Own Brand
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
        Use your logo, domain, and custom branding to deliver professional SEO reports that look like they came
        directly from your team.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 md:mb-12">
        <Button
          size="lg"
          className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-10 py-4 md:py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 text-center whitespace-normal break-words"
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          Get Licensing Info
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-10 py-4 md:py-5 font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 bg-transparent"
          onClick={() => document.getElementById("demo-section")?.scrollIntoView({ behavior: "smooth" })}
        >
          View Demo
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm md:text-base text-gray-600">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
          <span>Your branding</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
          <span>Custom domain</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
          <span>Full customization</span>
        </div>
      </div>
    </div>
  </div>
</section>




{/* Key Benefits */}
<section className=" pt-10 pb-6 sm:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center pt-0 pb-0 mb-3 sm:mb-3">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Choose White-Label?
      </h2>
      <p className="text-base sm:text-lg text-gray-600">
        Build your brand while we handle the technology
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {/* Card 1 */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 sm:p-8 text-left">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 sm:mb-6">
            <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
            Your Brand, Your Success
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
            Every report displays your logo, colors, and branding. Your clients see you as the expert—our name stays invisible.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Custom logo placement
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Brand color scheme
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Custom domain option
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Card 2 */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 sm:p-8 text-left">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 sm:mb-6">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
            Scale Without Limits
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
            Generate unlimited reports for all your clients without the overhead of building your own platform.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Unlimited report generation
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Multi-client management
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Automated scheduling
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Card 3 */}
      <Card className="border-0 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 sm:p-8 text-left">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 sm:mb-6">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
            Enterprise Support
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
            Dedicated account management and priority support to ensure your success.
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Dedicated account manager
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Priority technical support
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
              Custom integrations
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>



 {/* Demo Section */} 


<section id="demo-section" className="pt-6 pb-6 sm:pt-10 sm:pb-12 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center pt-2 pb-2 sm:pb-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-900 leading-snug mb-3 sm:mb-4">
        White-Label Report Sample
      </h2>
    </div>
     
    <Tabs defaultValue="standard" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-4 px-2">
        <TabsTrigger value="standard">Standard Report</TabsTrigger>
        <TabsTrigger value="whitelabel">White-Label Report</TabsTrigger>
      </TabsList>

      {/* Standard Report */}
      <TabsContent value="standard">
  <Card className="border-0 shadow-xl max-w-5xl lg:max-w-6xl mx-auto w-full">
    <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          <div className="text-lg sm:text-xl font-bold text-indigo-600">Sumryze</div>
          <div className="text-sm sm:text-base text-gray-600">SEO Report</div>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
          Website Analysis Report
        </h3>
        <p className="text-sm sm:text-base text-gray-600">Generated by Sumryze AI Platform</p>
      </div>
      <p className="text-center text-gray-600 italic text-sm sm:text-base">
        Standard reports show our branding and platform name
      </p>
    </CardContent>
  </Card>
</TabsContent>


      {/* White-Label Report */}
      <TabsContent value="whitelabel">
        <Card className="border-0 shadow-xl max-w-5xl lg:max-w-6xl mx-auto w-full">
          <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
            <ReportPreview
              agencyName="Your Agency"
              reportType="Professional SEO Report"
              summary="Comprehensive SEO Analysis"
              siteScore={89}
              pagesAnalyzed={42}
              criticalIssues={7}
              date="July 1, 2025"
            />
            <p className="text-center text-emerald-600 font-semibold text-sm sm:text-base">
              ✨ White-label reports feature your branding exclusively
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</section>



    

{/* Pricing Tiers */}
<section className="py-12 sm:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-10 sm:mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">White-Label Licensing Options</h2>
      <p className="text-lg sm:text-xl text-gray-600">Choose the plan that fits your agency size</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Starter License */}
      <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[540px]">
        <CardContent className="p-6 sm:p-8 text-center flex flex-col h-full">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Starter License</h3>
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">$299</div>
            <div className="text-gray-500 mb-6">/month</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Up to 50 reports/month
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Basic white-label branding (logo only)
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Email support
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Standard report formats
              </li>
            </ul>
          </div>
          <Button className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
        </CardContent>
      </Card>

      {/* Professional License - Most Popular */}
      <Card className="border-2 border-indigo-600 shadow-lg hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between min-h-[540px]">
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1.5 text-sm font-semibold shadow-md">
          Most Popular
        </Badge>
        <CardContent className="p-6 sm:p-8 text-center flex flex-col h-full">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Professional License</h3>
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">$599</div>
            <div className="text-gray-500 mb-6">/month</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Up to 200 reports/month
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Full white-label customization
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Custom domain option
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Priority support
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
              Access to all report templates
              </li>
            </ul>
          </div>
          <Button className="w-full mt-auto bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
        </CardContent>
      </Card>

      {/* Enterprise License */}
      <Card className="border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[540px]">
        <CardContent className="p-6 sm:p-8 text-center flex flex-col h-full">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Enterprise License</h3>
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">Custom</div>
            <div className="text-gray-500 mb-6">pricing</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Unlimited reports
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Complete customization
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Dedicated account manager
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                Custom integrations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-emerald-500 mr-3" />
                SLA guarantee
              </li>
            </ul>
          </div>
          <Button
            variant="outline"
            className="w-full mt-auto border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-white"
          >
            Contact Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</section>



      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600">Let's discuss your white-label licensing needs</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="john@agency.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company">Agency Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="Your Agency"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="https://youragency.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your needs</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 min-h-[120px]"
                      placeholder="How many reports do you need per month? What customizations are important to you?"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Request Licensing Information
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your request and will contact you within 24 hours to discuss your white-label
                    licensing needs.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

     

{/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6"> Build Your Brand with Confidence</h2>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
            
           Join successful agencies worldwide who trust our white-label solution to deliver exceptional SEO reports under their own brand.
          </p>
          
           

          <div className="flex justify-center">
           <Button
           size="lg"
            className="w-full sm:w-auto text-sm sm:text-base px-6 py-4 bg-white text-indigo-600 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-normal break-words text-center"
            onClick={() =>
            document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
          }
          >
           Start Your White-Label Journey
           <ArrowRight className="ml-2 h-5 w-5" />
         </Button>
        </div>




        </div>
      </section>

    </div>
  )
}
