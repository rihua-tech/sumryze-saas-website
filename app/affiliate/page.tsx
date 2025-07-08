"use client"

import type React from "react"
import { fetchFromAPI } from "@/lib/utils";

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
      
<section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">

      {/* Badge */}
      <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs px-3 py-1.5 font-medium rounded-full shadow-sm transition-all duration-200">
        🔗 Affiliate Partner Program
      </Badge>

      {/* Headline */}
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
        Earn <span className="text-indigo-600">30% Recurring</span> Commissions
      </h1>
      <h2 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-6 leading-tight">
        For Life — Just Refer & Earn
      </h2>

      {/* Subtext */}
      <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Join our high-converting affiliate program and earn lifetime recurring commissions by referring agencies, consultants, and creators to Sumryze. Simple setup, generous payouts, and unlimited earning potential.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-lg px-10 py-5 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
        >
          🚀 Join the Program
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-base px-8 py-5 font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300"
          onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
        >
          💰 Calculate Earnings
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 max-w-2xl mx-auto shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">30%</div>
            <div className="text-sm text-gray-600">Commission Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">Lifetime</div>
            <div className="text-sm text-gray-600">Recurring Payouts</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">$1,000+</div>
            <div className="text-sm text-gray-600">Top Earner / Month</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* Why Join */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
        Why Join Our <span className="text-indigo-600">Affiliate Program?</span>
      </h2>
      <p className="text-lg text-gray-600">
        The most rewarding affiliate opportunity in the <span className="font-medium text-indigo-500">SEO space</span>
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Recurring */}
      <Card className="rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
        <CardContent className="p-6">
          <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-5">
            <DollarSign className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">30% Recurring</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Earn 30% of every payment your referrals make, for as long as they remain customers.
          </p>
        </CardContent>
      </Card>

      {/* 2. Converting */}
      <Card className="rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
        <CardContent className="p-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-5">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">High Converting</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our landing pages convert at 12%+ with proven copy and compelling offers.
          </p>
        </CardContent>
      </Card>

      {/* 3. Audience */}
      <Card className="rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
        <CardContent className="p-6">
          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect Audience</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Target agencies, consultants, and marketers who need professional SEO reporting.
          </p>
        </CardContent>
      </Card>

      {/* 4. Support */}
      <Card className="rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-center">
        <CardContent className="p-6">
          <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Crown className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Premium Support</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Dedicated affiliate manager, marketing materials, and performance insights.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

{/* Earnings Calculator */}
<section id="calculator" className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Title */}
    <div className="text-center mb-10">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
        Calculate Your <span className="text-indigo-600">Earnings Potential</span>
      </h2>
      <p className="text-lg text-gray-600">
        See how much you can earn with our 30% recurring commissions—compounding month after month.
      </p>
    </div>

    {/* Earnings Cards */}
    <Card className="border border-gray-100 shadow-xl rounded-2xl">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Tier 1: 5 Referrals */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">5 Referrals / Month</h3>
            <div className="bg-indigo-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">$148.50</div>
              <div className="text-sm text-gray-500 mb-3">Monthly Recurring</div>
              <div className="text-xl font-semibold text-gray-900">$1,782</div>
              <div className="text-sm text-gray-500">Annual Earnings</div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Based on $99 average plan</p>
          </div>

          {/* Tier 2: 10 Referrals - Highlighted */}
          <div className="relative">
            <h3 className="text-base font-semibold text-gray-800 mb-3">10 Referrals / Month</h3>
            <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-300 shadow-lg">
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">$297</div>
              <div className="text-sm text-gray-500 mb-3">Monthly Recurring</div>
              <div className="text-xl font-semibold text-gray-900">$3,564</div>
              <div className="text-sm text-gray-500">Annual Earnings</div>
            </div>
            <Badge className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full shadow-sm">
              Most Common
            </Badge>
          </div>

          {/* Tier 3: 20 Referrals */}
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-3">20 Referrals / Month</h3>
            <div className="bg-yellow-50 rounded-xl p-6">
              <div className="text-3xl font-extrabold text-yellow-600 mb-1">$594</div>
              <div className="text-sm text-gray-500 mb-3">Monthly Recurring</div>
              <div className="text-xl font-semibold text-gray-900">$7,128</div>
              <div className="text-sm text-gray-500">Annual Earnings</div>
            </div>
            <p className="text-xs text-gray-400 mt-3">Top performer level</p>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="mt-10 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border border-indigo-200 text-left">
          <h4 className="text-sm font-bold text-indigo-900 mb-2">💡 Pro Tip:</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            These are <strong>recurring</strong> earnings. Each customer you refer continues to pay you
            a 30% commission every month they remain subscribed. Your income <strong>compounds</strong> over time!
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

      {/* How It Works */}
<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
        How It <span className="text-indigo-600">Works</span>
      </h2>
      <p className="text-lg text-gray-600">
        Start earning in just <span className="font-semibold text-indigo-500">4 simple steps</span>
      </p>
    </div>

    {/* Steps Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Step 1 */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
          1
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Apply & Get Approved</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Fill out our short application. Most are approved within 24 hours.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
          2
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Get Your Links</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Access your unique affiliate links and marketing toolkit.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
          3
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Promote & Refer</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Share Sumryze using proven templates, ads, and strategies.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300">
        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
          4
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">Earn Commissions</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Get paid 30% recurring commissions monthly via PayPal or direct deposit.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Marketing Resources */}
<section className="py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
        Everything You <span className="text-indigo-600">Get as a Partner</span>
      </h2>
      <p className="text-lg text-gray-600">
        High-converting tools, content, and real support to help you grow and earn faster.
      </p>
    </div>

    {/* Resource Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card Item */}
      {[
        {
          title: "Landing Pages",
          desc: "High-converting pages optimized for your audience with your affiliate links preloaded.",
          icon: <Gift className="h-5 w-5 text-purple-600" />,
          bg: "bg-purple-100",
        },
        {
          title: "Email Templates",
          desc: "Proven email sequences and templates that convert leads into customers.",
          icon: <Zap className="h-5 w-5 text-blue-600" />,
          bg: "bg-blue-100",
        },
        {
          title: "Social Media Kit",
          desc: "Prebuilt social media graphics and text, ready for all major platforms.",
          icon: <Star className="h-5 w-5 text-emerald-600" />,
          bg: "bg-emerald-100",
        },
        {
          title: "Performance Dashboard",
          desc: "Track clicks, conversions, and earnings in real-time with visual analytics.",
          icon: <TrendingUp className="h-5 w-5 text-yellow-600" />,
          bg: "bg-yellow-100",
        },
        {
          title: "Dedicated Support",
          desc: "Work with a personal affiliate manager to maximize your performance.",
          icon: <Users className="h-5 w-5 text-red-600" />,
          bg: "bg-red-100",
        },
        {
          title: "Exclusive Bonuses",
          desc: "Earn special promotions and performance rewards as a top affiliate.",
          icon: <Crown className="h-5 w-5 text-indigo-600" />,
          bg: "bg-indigo-100",
        },
      ].map(({ title, desc, icon, bg }, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6"
        >
          <div className="flex items-start mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${bg}`}>
              {icon}
            </div>
            <h3 className="text-md font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

         {/* Success Stories */}
<section className="py-10 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
        Affiliate Success Stories
      </h2>
      <p className="text-lg text-gray-600">
        Real results from our top-performing partners
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Testimonial 1 */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
          <p className="text-gray-700 mb-6 italic leading-relaxed">
            "I've been promoting Sumryze for 8 months and now earn over
            $800/month in recurring commissions. The conversion rate is
            incredible – my audience loves the product!"
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">$800+</div>
            <div className="text-sm text-gray-600">Monthly Recurring Income</div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonial 2 */}
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
          <p className="text-gray-700 mb-6 italic leading-relaxed">
            "The marketing materials are top-notch and the support team is
            amazing. I promoted it in one video and got 15 signups in the first
            week!"
          </p>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">$450+</div>
            <div className="text-sm text-gray-600">First Month Earnings</div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Optional CTA */}
    <div className="text-center mt-14">
      <a
        href="/affiliate/signup"
        className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:scale-105 transition-transform"
      >
        Start Earning as an Affiliate
      </a>
    </div>
  </div>
</section>

      {/* Application Form */}
<section id="signup-form" className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Apply to Join Our Program</h2>
      <p className="text-lg text-gray-600">
        Start earning 30% recurring commissions with Sumryze Affiliate
      </p>
    </div>

    <Card className="border-0 shadow-2xl rounded-xl">
      <CardContent className="p-8 sm:p-10">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
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
              <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                Website or Social Media
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                required
                value={formData.website}
                onChange={handleInputChange}
                className="mt-2"
                placeholder="https://yourwebsite.com or profile link"
              />
            </div>

            <div>
              <Label htmlFor="audience" className="text-sm font-medium text-gray-700">
                Describe Your Audience
              </Label>
              <Textarea
                id="audience"
                name="audience"
                required
                value={formData.audience}
                onChange={handleInputChange}
                className="mt-2 min-h-[100px]"
                placeholder="Who is your audience? (e.g., SEO agencies, content creators, freelancers)"
              />
            </div>

            <div>
              <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                Marketing Experience
              </Label>
              <Textarea
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleInputChange}
                className="mt-2 min-h-[100px]"
                placeholder="Tell us how you'll promote Sumryze and your past results"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply to Join Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <p className="text-center text-sm text-gray-500">
              Most applications are reviewed and approved within 24 hours.
            </p>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">You're In!</h3>
            <p className="text-gray-600 mb-6">
              Thanks for applying. You’ll receive your affiliate dashboard access within 24 hours.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-700 font-semibold text-sm">
                🎉 Get ready to start earning 30% recurring commissions!
              </p>
            </div>
            <div className="mt-6">
              <a
                href="/app/dashboard"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
</section>
    
       {/* Final CTA */}
<section className="py-16 bg-indigo-600">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
    <p className="text-sm uppercase tracking-wide text-indigo-200 font-semibold mb-3">
      Affiliate Opportunity
    </p>
    
    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
      Start Earning Today
    </h2>

    <p className="text-lg text-indigo-100 mb-10 leading-snug max-w-3xl mx-auto">
      Join our exclusive affiliate program and earn 30% recurring commissions from every referral.
      No limits, no caps — just pure earning potential.
    </p>

    <Button
      aria-label="Apply to join the affiliate program"
      size="lg"
      className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-10 py-4 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" })}
    >
      Apply Now – It's Free
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>

    <p className="text-indigo-200 text-sm mt-4">
      ✓ No application fee • ✓ 24-hour approval • ✓ Lifetime earnings
    </p>
  </div>
</section>



    </div>
  )
}
