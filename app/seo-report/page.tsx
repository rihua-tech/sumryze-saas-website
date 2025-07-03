"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BarChart3, TrendingUp, Globe, Clock, ArrowRight, Shield } from "lucide-react"

export default function SEOReportPage() {
  const [website, setWebsite] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
         <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm px-4 py-2 font-semibold">
 
                🚀 Instant SEO Analysis
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                Get Your Complete SEO Report in
                <span className=" text-indigo-600 "> 24 Hours</span>
              </h1>
              
              <p className="text-base lg:text-lg text-gray-700 max-w-xl mx-auto mb-5 lg:mx-0">
                Professional AI-powered SEO analysis for just $19. Perfect for business owners, marketers, and agencies
                who need instant insights without a subscription.
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span className="text-gray-700">No subscription required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span className="text-gray-700">24-hour delivery</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span className="text-gray-700">Professional quality</span>
                </div>
              </div>

             
             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <div className="flex items-center mb-4">
               <div className="text-3xl font-black text-indigo-600">$19</div>
               <div className="ml-3">
                 <div className="text-sm text-gray-600">One-time payment</div>
                 <div className="text-xs text-indigo-600 font-semibold">Usually $99 • Save 81%</div>
               </div>
            </div>
              <p className="text-sm text-gray-600">
              Perfect for testing our service before committing to a subscription.
             </p>
           </div>

    

         </div>

            {/* Order Form */}
            <div>
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8 pb-12">
                  {!isSubmitted ? (
                    <>
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Your SEO Report</h2>
                        <p className="text-gray-600">Get started in less than 2 minutes</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <Label htmlFor="website">Website URL</Label>
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://yourwebsite.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">We'll send your report here within 24 hours</p>
                        </div>

                        <Button
                          type="submit"
                          
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300"

                          disabled={isLoading}
                        >
                          {isLoading ? "Processing Payment..." : "Buy Report - $19"}
                          {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>

                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 mr-1" />
                              <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>24h Delivery</span>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h3>
                      <p className="text-gray-600 mb-6">
                        Your SEO report for <strong>{website}</strong> is being generated. We'll send it to{" "}
                        <strong>{email}</strong> within 24 hours.
                      </p>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <p className="text-emerald-700 font-semibold text-sm">
                          🎉 Want more reports? Upgrade to our monthly plan and save 60%
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What's Included in Your Report</h2>
            <p className="text-xl text-gray-600">Comprehensive analysis worth $99, yours for just $19</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Analysis</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Overall SEO score</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Page speed analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Mobile usability check</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Core Web Vitals</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical SEO Audit</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Meta tags analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>URL structure review</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Internal linking check</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Schema markup review</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AI Recommendations</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Priority action items</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Content optimization tips</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Keyword opportunities</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>Competitor insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your professional SEO report in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Website</h3>
              <p className="text-gray-600">
                Simply provide your website URL and email address. Payment is processed securely through Stripe.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI crawls your website, analyzes 200+ SEO factors, and generates actionable insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Report</h3>
              <p className="text-gray-600">
                Get your comprehensive SEO report delivered to your inbox within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Business Owners</h2>
            <p className="text-xl text-gray-600">See what our customers are saying</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 italic">
                  "The $19 report gave me more insights than I expected. It helped me identify critical issues I didn't
                  even know existed. Definitely worth every penny!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John Davis</p>
                    <p className="text-sm text-gray-600">E-commerce Store Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 mb-6 italic">
                  "Perfect for testing before committing to a subscription. The AI recommendations were spot-on and
                  helped improve our rankings within weeks."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah Martinez</p>
                    <p className="text-sm text-gray-600">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      
        <section className="bg-indigo-600 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Improve Your SEO?</h2>
          <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
            Get your professional SEO report for just $19. No subscription, no commitment.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-12 py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Order Your Report Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <p className="text-emerald-200 text-sm mt-4">
            ✓ Secure payment • ✓ 24-hour delivery • ✓ Professional quality
          </p>
        </div>
      </section>
    </div>
  )
}
