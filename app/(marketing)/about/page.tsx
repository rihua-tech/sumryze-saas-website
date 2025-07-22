
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Zap, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
          <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-10">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 text-center">

          <div className="text-center">
           
            <h1 className="text-3xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-5 leading-tight">
              Revolutionizing SEO reporting
            </h1>
            <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-5 leading-tight">
              with AI-powered insights
            </h2>           
              <p className="text-sm sm:text-sm lg:text-sm text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Create beautiful SEO reports in seconds, not hours — fully branded, AI-powered, and perfect for freelancers, agencies, and growing businesses.
            </p>

             
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-8 px-4">

                {/* Primary Button */}
                 <a
                 href="/pricing"
                 className="w-full sm:w-auto px-10 py-2 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md text-center transition duration-300"
                 aria-label="See pricing plans"
                  >
                  See Plans
                  </a>

                   {/* Secondary Button */}
                   <a
                   href="/contact"
                   className="w-full sm:w-auto px-8 py-2 text-base font-semibold text-indigo-600 bg-white border border-indigo-300 hover:bg-gray-50 rounded-lg shadow-sm text-center transition duration-300"
                   aria-label="Contact our team"
              >
                  Get in Touch
                 </a>

                </div>              
          </div>
        </div>
      </section>


      {/* Mission & Vision */}
      <section className=" py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
            <div>
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-indigo-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                We help businesses scale smarter by automating reporting, uncovering actionable SEO opportunities, and enabling
                 fully-branded, white-label client deliverables.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700"> Automate repetitive SEO reporting tasks</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-base text-gray-700"> Deliver powerful, data-backed AI insights</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-base text-gray-700">Enable professional white-label SEO reports</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <Target className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
                <p className="text-indigo-700 font-semibold text-lg">Focused on Your Success</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-12 h-80 flex items-center justify-center lg:order-1">
              <div className="text-center">
                <Globe className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                <p className="text-emerald-700 font-semibold text-lg">Global Impact</p>
              </div>
            </div>
            <div className="lg:order-2">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-7 w-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                We aim to set the industry standard for fast, accurate, and beautifully branded SEO performance
                reports—trusted by agencies worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">📈 5,000+</div>
                  <div className="text-sm text-gray-600">SEO reports generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">🤝 500+ </div>
                  <div className="text-sm text-gray-600">Happy digital  Agencies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pt-5 pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-base text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-4">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We put our customers at the heart of everything — their goals, their experience, and long-term 
                  success guide every decision we make.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We push the boundaries of what’s possible with AI and SEO automation to deliver smarter, faster, and more insightful reporting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-4">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We hold ourselves to the highest standards — from every feature we build, to every SEO report
                   we deliver, and every client interaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

     
          

               {/* Team Section */}  
<section className="pt-5 pb-12 bg-white">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-4">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
      <p className="text-base text-gray-600">The passionate people behind Sumryze</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* CEO */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <CardContent className="p-4">
          <img
            src="/images/CEO_Business_Avatar.webp"
            alt="Alex Smith"
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Smith</h3>
          <p className="text-indigo-600 font-semibold mb-4">CEO & Founder</p>
          <p className="text-base text-gray-600 leading-relaxed">
            Former SEO agency owner with over 10 years of hands-on experience in digital marketing,
            automation, and building scalable growth strategies.
          </p>
        </CardContent>
      </Card>

      {/* CTO */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <CardContent className="p-4">
          <img
            src="/images/CTO_Tech_Executive_Avatar.webp"
            alt="Maria Johnson"
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Maria Johnson</h3>
          <p className="text-emerald-600 font-semibold mb-4">CTO</p>
          <p className="text-base text-gray-600 leading-relaxed">              
            AI and machine learning expert passionate about building intelligent, scalable systems 
            that power automated SEO reporting.
          </p>
        </CardContent>
      </Card>

      {/* Head of Product */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <CardContent className="p-4">
          <img
            src="/images/Head_of_Product_Avatar.webp"
            alt="David Lee"
            className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
          />
          <h3 className="text-xl font-bold text-gray-900 mb-2">David Lee</h3>
          <p className="text-purple-600 font-semibold mb-4">Head of Product</p>
          <p className="text-base text-gray-600 leading-relaxed">              
            Product strategist focused on creating intuitive, user-first experiences that solve real business
            problems through smart design.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5">Ready to join our mission?</h2>
          <p className="text-base text-indigo-100 mb-10 leading-relaxed">
            Discover how Sumryze is transforming SEO reporting with automation, branding, and AI. 
            Start your free trial or talk to our team today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          {/* Primary SEO-Friendly CTA */}
            <a
             href="/signup"
            className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 text-base px-8 py-2 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            {/* Secondary SEO-Friendly CTA */}
             <a
             href="/contact"
            className="inline-flex items-center justify-center border border-white text-white hover:bg-white hover:text-indigo-600 text-base px-8 py-2 font-semibold rounded-lg bg-transparent transition-all duration-300" >
            Contact Us
          </a>
           </div>

        </div>
      </section>


    </div>
  )
}

