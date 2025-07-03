import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "The Future of SEO: How AI is Transforming Digital Marketing",
    excerpt:
      "Discover how artificial intelligence is revolutionizing SEO strategies and what it means for agencies and businesses in 2024.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "SEO Strategy",
    featured: true,
  },
  {
    id: 2,
    title: "10 Essential SEO Metrics Every Agency Should Track",
    excerpt: "Learn about the key performance indicators that matter most for client reporting and business growth.",
    author: "Michael Chen",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Analytics",
    featured: false,
  },
  {
    id: 3,
    title: "White-Label Reporting: A Complete Guide for Agencies",
    excerpt: "Everything you need to know about implementing white-label solutions to scale your agency operations.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Business Growth",
    featured: false,
  },
  {
    id: 4,
    title: "Technical SEO Checklist: 25 Points for 2024",
    excerpt:
      "A comprehensive checklist covering all the technical SEO elements you need to audit for optimal website performance.",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Technical SEO",
    featured: false,
  },
  {
    id: 5,
    title: "Client Retention Strategies for SEO Agencies",
    excerpt: "Proven tactics to improve client satisfaction and reduce churn in your SEO agency business.",
    author: "Lisa Thompson",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Business Growth",
    featured: false,
  },
  {
    id: 6,
    title: "Understanding Core Web Vitals and Their Impact on Rankings",
    excerpt: "Deep dive into Google's Core Web Vitals and how to optimize them for better search performance.",
    author: "Alex Martinez",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Technical SEO",
    featured: false,
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
              <Badge className="mb-6 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm px-4 py-2 font-semibold">

              📚 Knowledge Hub</Badge>

            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              SEO Insights & Strategies
            </h1>
              <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent mb-8 leading-tight">
              
              for Modern Agencies</h2>
          
            <p className="text-base lg:text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">

              Stay ahead of the curve with expert insights, industry trends, and actionable strategies to grow your
              agency and deliver exceptional results for your clients.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Badge className="bg-emerald-100 text-emerald-700 mb-4">Featured Article</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Editor's Pick</h2>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <p className="text-indigo-700 font-semibold">Featured Article</p>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{featuredPost.excerpt}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.id}`}>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Expert insights and practical tips for SEO professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="border-0 shadow-md hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <Badge className="w-fit mb-3">{post.category}</Badge>
                  <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-indigo-50 group-hover:text-indigo-600"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Stay updated with SEO trends</h2>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
            Get weekly insights, case studies, and actionable tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3">Subscribe</Button>
          </div>
          <p className="text-indigo-200 text-sm mt-4">
            No spam, unsubscribe at any time. Join 5,000+ SEO professionals.
          </p>
        </div>
      </section>
    </div>
  )
}
