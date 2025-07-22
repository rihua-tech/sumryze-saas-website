"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import SaaSCompetitorTable from "@/components/SaaSCompetitorTable";
import { CheckCheck, BadgePercent, Briefcase } from "lucide-react";
import FAQAccordion from "@/components/AccordionFAQ";

import Head from 'next/head'




export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
    
  const plans = [
  {
    name: "Starter",
    description: "Best for freelancers, small agencies, and early-stage teams",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "5 client reports per month",
      "Basic AI-powered insights",
      "PDF report export",
      "Email support",
      "Free trial — no credit card required"
    ],
    cta: "Start Free Trial",
    popular: false,
    href: "/signup?plan=starter",
  },
  {
    name: "Professional",
    description: "Best for growing agencies, consultants, and content teams",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "Up to 25 client reports per month",
      "Advanced AI-powered insights (SEO, content, traffic)",
      "Export in PDF, HTML, and Notion",
      "Automated report scheduling & delivery",
      "Smart branding (logo, fonts, styles)",
      "Multi-language report support",
      "Priority email support",
      "Free trial — no credit card required"
    ],
    cta: "Start Free Trial",
    popular: true,
    href: "/signup?plan=pro",
  },
  {
    name: "Enterprise",
    description: "Best for large agencies, SaaS platforms, and enterprise teams",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Unlimited client reports",
      "Full-stack AI analytics (SEO, content, trends)",
      "All export formats + API access",
      "Advanced automation workflows (generate, send, archive)",
      "Webhook & custom token support",
      "Multi-account management",
      "Full white-label customization (domain, logo, styles)",
      "Advanced data integrations (GA4, GSC, Notion, Zapier, etc.)",
      "Unlimited historical data access",
      "Enterprise priority support (dedicated inbox + SLA)",
      "Free trial — no credit card required"
    ],
    cta: "Start Free Trial",
    popular: false,
    href: "/signup?plan=enterprise",
  },
];

 

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
          
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs px-3 py-1.5 font-medium rounded-full shadow-sm transition-all duration-200">          
              💰 Simple Pricing</Badge>
              
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              
             Start Growing with the Right Plan
            </h1>
             <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-700 to-purple-500 bg-clip-text text-transparent mb-4 leading-tight">
              for your agency</h2>

            <p className="text-sm sm:text-sm lg:text-sm text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Every plan includes a <strong>14-day free trial</strong>. No hidden fees — just <strong>powerful reporting</strong> from day one.
             </p>



              {/* Billing Toggle */}
            
              <div className="flex items-center justify-center w-fit mx-auto mb-6 px-4 py-2 gap-5 bg-gray-100 rounded-full shadow-sm">
              
              <span className={`text-base font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
               Monthly
              </span>
               
             <Switch
                 checked={isYearly}
              onCheckedChange={setIsYearly}
                 className="data-[state=checked]:bg-indigo-600"
              />
              <span className={`text-base font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                 Yearly
             </span>

             
             <Badge className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1 ml-1">
             Save 20%
            </Badge>
             </div>


           

          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className=" bg-white pt-4 pb-2">
        
          <div className="max-w-[70rem] mx-auto px-4 sm:px-6 lg:px-8">
          
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3">

            

            {plans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[600px] flex flex-col ${
                  plan.popular ? "ring-2 ring-indigo-600 shadow-indigo-200/50" : ""
                }`}
              >
                {plan.popular && (
                  
                  <Badge className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1.5 text-sm sm:text-base font-bold">
                  Most Popular
                  </Badge>


                )}

                <CardHeader className="text-center pb-4 p-6">
                  <CardTitle className={`text-3xl font-black text-gray-900 mb-3 ${plan.popular ? "mt-4" : ""}`}>
                    {plan.name}
                  </CardTitle>
                  <p className="text-base text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-black text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-lg text-gray-600 ml-2">/month</span>
                    {isYearly && (
                      <p className="text-sm text-emerald-600 mt-2 font-semibold">
                        Billed annually (${plan.yearlyPrice * 12}/year)
                      </p>
                    )}
                  </div>
                  <Link href={plan.href}>
                  <Button
                    className={`w-full text-base px-6 py-3 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    size="sm"
                  >
                    {plan.cta}
                    {plan.cta !== "Contact Sales" && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  </Link>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

          </div>

           {/* Centered Licensing Note */}
            <div className="mt-12 flex justify-center">
             <span className="text-xs text-gray-500 text-center max-w-md">
               *Need white-label or agency use? Contact us.
               <a href="/contact" className="underline text-indigo-600 ml-1"> Contact </a>.
             </span>
          </div>

        </div>
      </section>

        
        <SaaSCompetitorTable />

     {/* More Ways to Earn & Grow Section */}

<section className="bg-white pt-5 pb-6 ">
  <div className="max-w-5xl mx-auto px-5">
    <div className="text-center mb-6 ">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Earn with Sumryze
      </h2>
      <p className="text-gray-500 mt-3 text-base">
        Share Sumryze and earn 30% recurring commissions for life.
      </p>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center text-left">
        <div className="bg-blue-100 rounded-full p-3 mr-4">
          <Briefcase className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-blue-800 mb-1">
            Join Our Affiliate Program
          </h3>
          <p className="text-sm text-blue-700">
            Refer users and get rewarded — 30% lifetime commissions.
          </p>
        </div>
      </div>
      <Link href="/affiliate">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg mt-4 md:mt-0 md:ml-4">
          Become an Affiliate
        </button>
      </Link>
    </div>
  </div>
</section>


{/* FAQ Section */}

  <FAQAccordion />

<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I change plans at any time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we’ll prorate the billing accordingly."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a free trial?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a 14-day free trial on all plans. No credit card required to get started."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I exceed my report limit?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We’ll notify you when you’re approaching your limit. You can upgrade your plan or purchase additional reports as needed."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer custom solutions for agencies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! For large organizations with specific needs, we offer custom enterprise solutions tailored to your workflow and brand."
            }
          },
          {
            "@type": "Question",
            "name": "Can I add team members to manage reports?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our platform supports team collaboration. You can invite multiple users to view, generate, or manage reports."
            }
          },
          {
            "@type": "Question",
            "name": "Are SEO and analytics included by default?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all plans come with built-in SEO audit tools and performance analytics out of the box."
            }
          },
          {
            "@type": "Question",
            "name": "Can I export reports to PDF or Notion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! You can export reports as PDF, or sync them directly to Notion with one click."
            }
          },
          {
            "@type": "Question",
            "name": "How secure is my data on Sumryze?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We prioritize your data privacy. All reports and user info are protected with industry-standard encryption and never shared."
            }
          }
        ]
      })
    }}
  />
</Head>




      

      {/* CTA Section */}
      
            <section className="py-16 bg-indigo-600">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
               <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">
                 Ready to simplify your reporting?
                </h2>
              <p className="text-base text-indigo-100 mb-8 leading-relaxed">
              Join 1,000+ agencies using Sumryze to save time and impress clients.
             </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">

              {/* Primary SEO-Friendly CTA */}
               <a
                 href="/signup?plan=starter"
                    className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 text-base px-7 py-1 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
               Start Free Trial
               <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              {/* Secondary SEO-Friendly CTA */}
              <a
               href="#comparison"
              className="inline-flex items-center justify-center bg-white/10 text-white hover:bg-white hover:text-indigo-600 text-base px-7 py-1 font-semibold rounded-lg border border-white transition-all duration-300"
      >
        Compare Plans
      </a>
    </div>
  </div>
</section>



    </div>
  )
}
