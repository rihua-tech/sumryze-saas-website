"use client"

import { useState } from "react"
import { ThemeProvider } from "next-themes"
import { Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight, Tag, TrendingUp } from "lucide-react"
import Header from "../dashboard/components/header"
import Footer from "../dashboard/components/footer"

export default function BlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const postsPerPage = 9
  const totalPosts = 24

  // Featured article
  const featuredArticle = {
    id: 1,
    title: "The Complete Guide to Core Web Vitals in 2024: Boost Your SEO Rankings",
    description:
      "Learn how to optimize your website's Core Web Vitals to improve user experience and search rankings. This comprehensive guide covers LCP, FID, CLS, and the new INP metric with actionable strategies.",
    image: "/placeholder.svg?height=400&width=800",
    category: "SEO Guide",
    author: "Sarah Chen",
    publishDate: "2024-01-15",
    readTime: "12 min read",
    tags: ["Core Web Vitals", "SEO", "Performance", "Google"],
    featured: true,
  }

  // Blog posts data
  const blogPosts = [
    {
      id: 2,
      title: "How AI is Revolutionizing SEO Content Strategy",
      description:
        "Discover how artificial intelligence tools are changing the way we approach content creation and SEO optimization.",
      image: "/placeholder.svg?height=240&width=400",
      category: "AI & SEO",
      author: "Mike Rodriguez",
      publishDate: "2024-01-12",
      readTime: "8 min read",
      tags: ["AI", "Content Strategy", "SEO"],
    },
    {
      id: 3,
      title: "Sumryze 2.0: New Features and Improvements",
      description:
        "Explore the latest updates to Sumryze including enhanced reporting, AI suggestions, and improved user interface.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Product Update",
      author: "Emma Thompson",
      publishDate: "2024-01-10",
      readTime: "5 min read",
      tags: ["Product Update", "Features", "Dashboard"],
    },
    {
      id: 4,
      title: "Local SEO Strategies That Actually Work in 2024",
      description:
        "Master local search optimization with proven strategies for Google My Business, local citations, and geo-targeted content.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Local SEO",
      author: "David Park",
      publishDate: "2024-01-08",
      readTime: "10 min read",
      tags: ["Local SEO", "Google My Business", "Citations"],
    },
    {
      id: 5,
      title: "Technical SEO Checklist: 50 Points for Better Rankings",
      description:
        "A comprehensive technical SEO audit checklist covering site speed, mobile optimization, structured data, and more.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Technical SEO",
      author: "Lisa Wang",
      publishDate: "2024-01-05",
      readTime: "15 min read",
      tags: ["Technical SEO", "Audit", "Checklist"],
    },
    {
      id: 6,
      title: "E-commerce SEO: Optimizing Product Pages for Conversions",
      description: "Learn how to optimize your e-commerce product pages for both search engines and conversion rates.",
      image: "/placeholder.svg?height=240&width=400",
      category: "E-commerce SEO",
      author: "James Miller",
      publishDate: "2024-01-03",
      readTime: "12 min read",
      tags: ["E-commerce", "Product Pages", "Conversions"],
    },
    {
      id: 7,
      title: "Voice Search Optimization: Preparing for the Future",
      description: "Understand how voice search is changing SEO and learn strategies to optimize for voice queries.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Voice SEO",
      author: "Rachel Green",
      publishDate: "2024-01-01",
      readTime: "9 min read",
      tags: ["Voice Search", "Future SEO", "Optimization"],
    },
    {
      id: 8,
      title: "Link Building in 2024: Quality Over Quantity",
      description:
        "Modern link building strategies that focus on earning high-quality, relevant backlinks for sustainable SEO growth.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Link Building",
      author: "Tom Anderson",
      publishDate: "2023-12-28",
      readTime: "11 min read",
      tags: ["Link Building", "Backlinks", "SEO Strategy"],
    },
    {
      id: 9,
      title: "Content Clusters: The Modern Approach to SEO Content",
      description:
        "Learn how to create topic clusters and pillar pages to improve your site's topical authority and rankings.",
      image: "/placeholder.svg?height=240&width=400",
      category: "Content Strategy",
      author: "Anna Foster",
      publishDate: "2023-12-25",
      readTime: "13 min read",
      tags: ["Content Clusters", "Topical Authority", "Content Strategy"],
    },
  ]

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "seo-guide", name: "SEO Guides", count: 8 },
    { id: "product-update", name: "Product Updates", count: 4 },
    { id: "ai-seo", name: "AI & SEO", count: 6 },
    { id: "technical-seo", name: "Technical SEO", count: 6 },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const BlogPostCard = ({ post, featured = false }: { post: any; featured?: boolean }) => (
    <article
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-64 lg:h-80" : "h-48"}`}>
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p className={`text-gray-600 dark:text-gray-400 mb-4 ${featured ? "text-lg" : ""}`}>{post.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 group/button">
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 group-hover/button:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </article>
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main Content */}
        <main className="flex-1 pt-16 transition-colors">
          <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Sumryze Blog</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Stay ahead of the curve with the latest SEO insights, product updates, and actionable guides to grow
                  your online presence
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800/30 p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Featured Article</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Featured Article Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>

                {/* Featured Article Content */}
                <div className="space-y-4">
                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredArticle.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    {featuredArticle.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {featuredArticle.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm border border-gray-200 dark:border-gray-700"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <button className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 group">
                    <span>Read Full Article</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Articles</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} of{" "}
                  {totalPosts} articles
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800/30 p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Updated with SEO Insights</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get the latest SEO tips, product updates, and industry insights delivered straight to your inbox.
                    Join 10,000+ marketers who trust our content.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 whitespace-nowrap">
                    Subscribe Now
                  </button>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>📧 Weekly newsletter • 🚀 No spam • 🔒 Unsubscribe anytime</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
