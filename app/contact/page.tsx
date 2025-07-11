
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
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import FAQAccordionContact from "@/components/AccordionContactFAQ";


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
             <Badge 
               className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-xs px-3 py-1.5 font-medium rounded-full shadow-sm transition-all duration-200">  
              
              💬 Get in Touch
              </Badge> 
               <h1 className="text-3xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-5 leading-tight">
              Let’s talk about growing your traffic </h1>
               <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-8 leading-tight">
              faster, smarter, AI-powered</h2>
                <p className="text-sm sm:text-sm lg:text-sm text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
             Whether you’re an agency, freelancer, or ecom brand — we’ll help you automate SEO reporting, white-label it, and look brilliant to your clients.
            </p>     

                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
                      <Link href="#chatbot" className="w-full sm:w-[220px]">
                        <Button
                         className="w-full px-6 py-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-base font-semibold transition shadow-md text-center" >
                         💬 Instant Chat Support
                        </Button>
                      </Link>
                      <Link href="#contact-form" className="w-full sm:w-[220px]">
                      <Button
                        className="w-full px-6 py-6 text-indigo-600 bg-white border border-indigo-300 hover:bg-gray-50 rounded-lg text-base font-semibold transition shadow-sm text-center" >
                        📩 Send a Message
                      </Button>
                       </Link>
                    </div>


          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           {/* Contact Form */}
<div id="contact-form">
  <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a message</h2>

  {!isSubmitted ? (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot for bots */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name"  className="block text-base font-medium text-gray-700 mb-1.5">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email"  className="block text-base font-medium text-gray-700 mb-1.5">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@company.com"
                className="mt-2"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company"  className="block text-base font-medium text-gray-700 mb-1.5">Company Name</Label>
            <Input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your Agency Name"
              className="mt-2"
            />
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject"  className="block text-base font-medium text-gray-700 mb-1.5">Subject</Label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              <option value="" disabled>
                Select a subject
              </option>
              <option>General Inquiry</option>
              <option>Pricing Question</option>
              <option>Technical Support</option>
              <option>Partnership Opportunity</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message"  className="block text-base font-medium text-gray-700 mb-1.5">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us more about your needs..."
              className="mt-2 min-h-[140px]"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                Send Message <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  ) : (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">Thanks for reaching out — we’ll get back to you within 24 hours.</p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
        >
          Send Another Message
        </Button>
      </CardContent>
    </Card>
  )}
</div>




            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in touch</h2>

              <div className="space-y-6 mb-12">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Us</h3>
                        <p className="text-gray-600">hello@sumryze.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

  

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-gray-900">Chat With Our AI</h3>
                      <p className="text-gray-600">Instant answers to SEO questions, 24/7</p>
                      <Link href="#chatbot">
                       <Button className="mt-2">Start Chat</Button>
                      </Link>
                  </div>
                </div>
              </CardContent>
           </Card>


                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Business Hours</h3>
                        <p className="text-gray-600">Mon-Fri: 9AM-6PM PST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Office</h3>
                        <p className="text-gray-600">San Francisco, CA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

                                  



              {/* Quick Actions */}
              <div className="space-y-6 ">
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                  <div className="grid grid-cols-1 gap-y-6">
                   <Link href="/demo">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                            <MessageSquare className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Try Demo</h4>
                            <p className="text-gray-600 text-sm">See Sumryze in action</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/pricing">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-200 transition-colors">
                            <Users className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">View Pricing</h4>
                            <p className="text-gray-600 text-sm">Find the right plan</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}


       <FAQAccordionContact />


      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5  leading-relaxed">

            Supercharge your SEO reports with AI – effortlessly
            </h2>
          <p className="text-base text-indigo-100 mb-8 leading-relaxed">
          Join 1,000+ marketers using Sumryze to automate reporting, impress clients, and reclaim your time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4 font-semibold transition-all duration-300 bg-transparent"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Instant Chat Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
