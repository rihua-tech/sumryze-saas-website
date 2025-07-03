
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Zap, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
           
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Revolutionizing SEO reporting
            </h1>
            <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-8 leading-tight">
              with AI-powered insights
            </h2>           
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Create beautiful SEO reports in seconds, not hours — fully branded, AI-powered, and perfect for freelancers, agencies, and growing businesses.
            </p>

             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 px-4">
                      <Link href="/pricing" className="w-full sm:w-[220px]">
                        <Button
                         className="w-full px-6 py-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-base font-semibold transition shadow-md text-center" >
                         See Plans
                        </Button>
                      </Link>
                      <Link href="/contact" className="w-full sm:w-[220px]">
                      <Button
                        className="w-full px-6 py-6 text-indigo-600 bg-white border border-indigo-300 hover:bg-gray-50 rounded-lg text-base font-semibold transition shadow-sm text-center" >
                        Get in Touch
                      </Button>
                       </Link>
                    </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To empower SEO agencies and consultants with AI-driven reporting tools that save time, deliver deeper
                insights, and help them scale their businesses while providing exceptional value to their clients.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-base text-gray-700">Automate repetitive reporting tasks</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-base text-gray-700">Provide actionable AI insights</span>
                </li>
                <li className="flex items-center">
                  <Zap className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-base text-gray-700">Enable professional white-label solutions</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-12 h-80 flex items-center justify-center">
              <div className="text-center">
                <Target className="h-20 w-20 text-indigo-600 mx-auto mb-4" />
                <p className="text-indigo-700 font-semibold text-lg">Focused on Your Success</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-12 h-80 flex items-center justify-center lg:order-1">
              <div className="text-center">
                <Globe className="h-20 w-20 text-emerald-600 mx-auto mb-4" />
                <p className="text-emerald-700 font-semibold text-lg">Global Impact</p>
              </div>
            </div>
            <div className="lg:order-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To become the global standard for AI-powered SEO reporting, helping thousands of agencies worldwide
                deliver exceptional results and grow their businesses through intelligent automation and data-driven
                insights.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">5,000+</div>
                  <div className="text-sm text-gray-600">Reports Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-sm text-gray-600">Happy Agencies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Every decision we make is guided by what's best for our customers and their success.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We continuously push the boundaries of what's possible with AI and automation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  We strive for excellence in every feature, every report, and every customer interaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind Sumryze</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-indigo-600 font-bold text-xl">AS</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Smith</h3>
                <p className="text-indigo-600 font-semibold mb-4">CEO & Founder</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Former SEO agency owner with 10+ years of experience in digital marketing and automation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-emerald-600 font-bold text-xl">MJ</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Maria Johnson</h3>
                <p className="text-emerald-600 font-semibold mb-4">CTO</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  AI and machine learning expert with a passion for building scalable, intelligent systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-purple-600 font-bold text-xl">DL</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">David Lee</h3>
                <p className="text-purple-600 font-semibold mb-4">Head of Product</p>
                <p className="text-base text-gray-600 leading-relaxed">
                  Product strategist focused on creating intuitive experiences that solve real business problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to join our mission?</h2>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
            Experience the future of SEO reporting and see why agencies worldwide trust Sumryze.
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
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4 font-semibold transition-all duration-300 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

