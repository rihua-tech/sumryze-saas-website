"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign, Users, TrendingUp, ArrowRight, Star, Gift, Zap, Crown } from "lucide-react"

export default function AffiliatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    audience: "",
    experience: "",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm px-4 py-2 font-semibold">
              💰 Affiliate Program
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">Earn 30% Recurring</h1>
            <h2 className="text-4xl lg:text-5xl font-black text-indigo-600 mb-8 leading-tight">Commissions for Life</h2>
           
             <p className="text-base lg:text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our exclusive affiliate program and earn substantial recurring commissions by referring agencies and
              consultants to Sumryze. High-converting offers, generous payouts, and lifetime earnings.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-xl px-12 py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join Program
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-5 font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 bg-transparent"
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                Calculate Earnings
              </Button>
            </div>

            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-200 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
               <div>
               <div className="text-3xl font-black text-indigo-600">30%</div>
               <div className="text-sm text-gray-600">Commission Rate</div>
              </div>
            <div>
              <div className="text-3xl font-black text-indigo-600">Lifetime</div>
              <div className="text-sm text-gray-600">Recurring Payouts</div>
            </div>
            <div>
                <div className="text-3xl font-black text-indigo-600">$1,000+</div>
               <div className="text-sm text-gray-600">Top Earner/Month</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Join Our Affiliate Program?</h2>
            <p className="text-xl text-gray-600">The most rewarding affiliate program in the SEO space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">30% Recurring</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Earn 30% of every payment your referrals make, for as long as they remain customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">High Converting</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Our landing pages convert at 12%+ with proven copy and compelling offers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect Audience</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Target agencies, consultants, and marketers who need professional SEO reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Crown className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Support</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Dedicated affiliate manager, marketing materials, and performance insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section id="calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Calculate Your Potential Earnings</h2>
            <p className="text-xl text-gray-600">See how much you could earn with our 30% recurring commission</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">5 Referrals/Month</h3>
                  <div className="bg-indigo-50 p-6 rounded-xl">
                    <div className="text-3xl font-black text-indigo-600 mb-2">$147</div>
                    <div className="text-sm text-gray-600 mb-4">Monthly Recurring</div>
                    <div className="text-2xl font-bold text-gray-900">$1,764</div>
                    <div className="text-sm text-gray-600">Annual Earnings</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Based on $99 average plan</p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">10 Referrals/Month</h3>
                  <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200">
                    <div className="text-3xl font-black text-emerald-600 mb-2">$297</div>
                    <div className="text-sm text-gray-600 mb-4">Monthly Recurring</div>
                    <div className="text-2xl font-bold text-gray-900">$3,564</div>
                    <div className="text-sm text-gray-600">Annual Earnings</div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 mt-2">Most Common</Badge>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">20 Referrals/Month</h3>
                  <div className="bg-yellow-50 p-6 rounded-xl">
                    <div className="text-3xl font-black text-yellow-600 mb-2">$594</div>
                    <div className="text-sm text-gray-600 mb-4">Monthly Recurring</div>
                    <div className="text-2xl font-bold text-gray-900">$7,128</div>
                    <div className="text-sm text-gray-600">Annual Earnings</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Top performer level</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">💡 Pro Tip:</h4>
                <p className="text-gray-700">
                  These are <strong>recurring</strong> earnings. Each customer you refer continues to pay you 30%
                  commission every month they remain subscribed. Your income compounds over time!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Start earning in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Apply & Get Approved</h3>
              <p className="text-gray-600">
                Fill out our simple application form. Most applications are approved within 24 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Links</h3>
              <p className="text-gray-600">
                Receive your unique affiliate links and access to our marketing resource library.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Promote & Refer</h3>
              <p className="text-gray-600">
                Share Sumryze with your audience using our proven marketing materials and strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Earn Commissions</h3>
              <p className="text-gray-600">Get paid 30% recurring commissions monthly via PayPal or direct deposit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Marketing Resources Included</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed as an affiliate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Landing Pages</h3>
                </div>
                <p className="text-gray-600">
                  High-converting landing pages optimized for your audience with your affiliate links embedded.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
                </div>
                <p className="text-gray-600">
                  Pre-written email sequences and templates that convert prospects into customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <Star className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Kit</h3>
                </div>
                <p className="text-gray-600">
                  Ready-to-use social media posts, graphics, and content for all major platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Performance Dashboard</h3>
                </div>
                <p className="text-gray-600">
                  Real-time tracking of clicks, conversions, and earnings with detailed analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Dedicated Support</h3>
                </div>
                <p className="text-gray-600">
                  Personal affiliate manager to help optimize your campaigns and maximize earnings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <Crown className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Exclusive Bonuses</h3>
                </div>
                <p className="text-gray-600">Special promotions and bonus commissions for top-performing affiliates.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Affiliate Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from our top-performing affiliates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Marketing Kate</p>
                    <p className="text-sm text-gray-600">SEO Consultant & Blogger</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "I've been promoting Sumryze for 8 months and now earn over $800/month in recurring commissions. The
                  conversion rate is incredible - my audience loves the product!"
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">$800+</div>
                  <div className="text-sm text-gray-600">Monthly Recurring Income</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-semibold">DJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Digital Josh</p>
                    <p className="text-sm text-gray-600">YouTube Creator</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "The marketing materials are top-notch and the support team is amazing. I promoted it in one video and
                  got 15 signups in the first week!"
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">$450+</div>
                  <div className="text-sm text-gray-600">First Month Earnings</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="signup-form" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Apply to Join Our Program</h2>
            <p className="text-xl text-gray-600">Start earning 30% recurring commissions today</p>
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
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website/Social Media Profile</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      required
                      value={formData.website}
                      onChange={handleInputChange}
                      className="mt-2"
                      placeholder="https://yourwebsite.com or social media profile"
                    />
                  </div>

                  <div>
                    <Label htmlFor="audience">Describe Your Audience</Label>
                    <Textarea
                      id="audience"
                      name="audience"
                      required
                      value={formData.audience}
                      onChange={handleInputChange}
                      className="mt-2 min-h-[100px]"
                      placeholder="Who is your audience? (e.g., SEO agencies, digital marketers, business owners)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Marketing Experience</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="mt-2 min-h-[100px]"
                      placeholder="Tell us about your marketing experience and how you plan to promote Sumryze"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Apply to Join Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Most applications are reviewed and approved within 24 hours
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for applying to our affiliate program. We'll review your application and get back to you
                    within 24 hours with your approval and affiliate dashboard access.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-purple-700 font-semibold text-sm">
                      🎉 Get ready to start earning 30% recurring commissions!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Start Earning Today</h2>
          <p className="text-xl text-purple-100 mb-10 leading-relaxed">
            Join our exclusive affiliate program and start earning 30% recurring commissions from every referral. No
            limits, no caps, just pure earning potential.
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-12 py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
          >
            Apply Now - It's Free
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <p className="text-purple-200 text-sm mt-4">
            ✓ No application fee • ✓ 24-hour approval • ✓ Lifetime earnings
          </p>
        </div>
      </section>
    </div>
  )
}
