"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Tag,
  TrendingUp,
} from "lucide-react"

export default function BlogPage() {
  const [currentCategory, setCurrentCategory] = useState("all")

  const featured = {
    title: "The Complete Guide to Core Web Vitals in 2024",
    description:
      "Understand Google's Core Web Vitals and learn actionable frameworks to improve performance, user experience, and rankings.",
    category: "SEO Guide",
    author: "Sarah Chen",
    publishDate: "2024-01-15",
    readTime: "12 min read",
    image: "/placeholder.svg?height=500&width=900",
    tags: ["SEO", "Performance", "Core Web Vitals"],
  }

  const posts = [
    {
      title: "How AI is Revolutionizing SEO Content Strategy",
      description:
        "See how artificial intelligence is transforming SEO workflows, content optimization, and growth strategies.",
      category: "AI & SEO",
      author: "Mike Rodriguez",
      publishDate: "2024-01-11",
      readTime: "8 min read",
      image: "/placeholder.svg?height=240&width=400",
      tags: ["AI", "Content Strategy", "SEO"],
    },
    {
      title: "Sumryze 2.0: New Feature Improvements",
      description:
        "Explore the latest improvements to Sumryze — upgraded UI, smart insights, faster reporting.",
      category: "Product Update",
      author: "Emma Thompson",
      publishDate: "2024-01-09",
      readTime: "5 min read",
      image: "/placeholder.svg",
      tags: ["Product Update", "Features"],
    },
    {
      title: "Local SEO Strategies That Actually Work in 2024",
      description:
        "Master Google Maps, local citations, NAP consistency, and localized content for growth.",
      category: "Local SEO",
      author: "David Park",
      publishDate: "2024-01-07",
      readTime: "10 min read",
      image: "/placeholder.svg",
      tags: ["Local SEO", "Google My Business"],
    },
    {
      title: "Technical SEO Checklist: 50 Things You Must Audit",
      description:
        "Improve your ranking with this complete technical breakdown covering speed, schema, crawling, and indexing.",
      category: "Technical SEO",
      author: "Lisa Wang",
      publishDate: "2024-01-04",
      readTime: "15 min read",
      image: "/placeholder.svg",
      tags: ["Technical SEO", "Audit", "Checklist"],
    },
  ]

  const categories = [
    { id: "all", label: "All" },
    { id: "seo-guide", label: "SEO Guides" },
    { id: "ai-seo", label: "AI & SEO" },
    { id: "technical-seo", label: "Technical SEO" },
    { id: "product", label: "Product Updates" },
  ]

  const formatDate = (str: string) =>
    new Date(str).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  // ------------------------------
  // 🔵 Blog Card Component
  // ------------------------------
  const BlogCard = ({ post }: any) => (
    <article
      className="
      bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 
      dark:border-gray-800 shadow-sm hover:shadow-xl 
      transition-all duration-300 hover:-translate-y-1
      animate-in fade-in slide-in-from-bottom-2 duration-500
      overflow-hidden cursor-pointer
    "
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" /> {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(post.publishDate)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.readTime}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight hover:text-blue-600 transition">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all">
          Read More <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  )

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* -------------------------------- */}
      {/* 🔥 HERO SECTION */}
      {/* -------------------------------- */}
      <section className="relative py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-transparent dark:from-indigo-900/20" />

        <div className="relative max-w-3xl mx-auto px-6 space-y-6">
          <p className="text-sm uppercase font-semibold tracking-[0.3em] text-indigo-500">
            Insights Hub
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Sumryze Blog
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Stay updated with SEO insights, industry frameworks, and product
            updates to help you grow traffic and authority.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {[
              { label: "Monthly readers", value: "10K+" },
              { label: "Guides published", value: "240+" },
              { label: "Avg. time saved", value: "6 min" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <p className="text-xs uppercase text-gray-500">{item.label}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* ⭐ FEATURED ARTICLE */}
      {/* -------------------------------- */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-md border border-gray-100 dark:border-gray-800 space-y-6 animate-in fade-in duration-700">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <TrendingUp className="w-5 h-5" /> Featured Article
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src={featured.image}
              className="rounded-2xl h-72 w-full object-cover"
            />

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <User className="w-4 h-4" /> {featured.author}
                <Calendar className="w-4 h-4" />{" "}
                {formatDate(featured.publishDate)}
                <Clock className="w-4 h-4" /> {featured.readTime}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {featured.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {featured.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition">
                Read Full Article →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* 🟦 CATEGORY FILTERS */}
      {/* -------------------------------- */}
      <div className="max-w-5xl mx-auto px-6 pb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCurrentCategory(cat.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition
              ${
                currentCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* -------------------------------- */}
      {/* 📰 BLOG GRID */}
      {/* -------------------------------- */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {posts.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    </div>
  )
}
