
"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Digital Growth Agency",
    text: "Sumryze cut our reporting time from hours to minutes. The polished reports wow our clients every time.",
    initials: "SM",
    avatarColor: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Michael Johnson",
    role: "Founder, SEO Consultancy",
    text: "The white-label reports look incredible and save us hours each week. Our clients love the branding touch.",
    initials: "MJ",
    avatarColor: "bg-green-100 text-green-600",
  },
  {
    name: "Lisa Chen",
    role: "Marketing Director, SaaS Co",
    text: "The AI insights helped us uncover trends we’d completely missed before. Huge value for our strategy.",
    initials: "LC",
    avatarColor: "bg-purple-100 text-purple-600",
  },
  {
    name: "Tom Yu",
    role: "CMO, FunnelLabs",
    text: "Loved by our clients and makes reporting fun again!",
    initials: "TY",
    avatarColor: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Anna Lopez",
    role: "SEO Manager, WebBoost",
    text: "Our clients love the professional look and the automation saves us hours each week.",
    initials: "AL",
    avatarColor: "bg-pink-100 text-pink-600",
  },
  {
  name: "Jasmine Carter",
  role: "Founder, LuxeLaunch",
  text: "Sumryze helped us deliver custom-branded reports to clients effortlessly. The polish really impresses!",
  initials: "JC",
  avatarColor: "bg-rose-100 text-rose-600",
},
{
  name: "David Kim",
  role: "Performance Lead, AdNova",
  text: "With Sumryze, our reporting went from chaotic to streamlined. Total time-saver for the whole team.",
  initials: "DK",
  avatarColor: "bg-blue-100 text-blue-600",
},
{
  name: "Olivia Reyes",
  role: "Marketing Analyst, TrendGrid",
  text: "The insights are sharp, and the visuals are client-ready. I can’t imagine doing reports manually again.",
  initials: "OR",
  avatarColor: "bg-lime-100 text-lime-600",
},
{
  name: "Brandon Lee",
  role: "Founder, RankLogic",
  text: "It feels like we hired a reporting assistant. Easy to use and fully white-labeled.",
  initials: "BL",
  avatarColor: "bg-sky-100 text-sky-600",
},
{
  name: "Emily Zhang",
  role: "VP Growth, OptiZoom",
  text: "Sumryze gives us beautiful reports with zero friction. Clients constantly compliment the look!",
  initials: "EZ",
  avatarColor: "bg-orange-100 text-orange-600",
}

]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000 })]
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <section className="pb-10 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          Trusted by Agencies Worldwide
        </h2>
        <p className="text-base text-gray-600 mb-10">
          Join thousands of marketers using Sumryze to save hours and wow their clients.
        </p>


       <div className="relative">
  {/* Left Arrow */}
  <button
    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10 "
    onClick={() => emblaApi?.scrollPrev()}
    disabled={!canScrollPrev}
  >
    <ChevronLeft className="w-5 h-5" />
  </button>

  {/* Carousel */}
  <div ref={emblaRef} className="overflow-hidden px-0 sm:px-4 md:px-4">
    <div className="flex gap-4">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="min-w-full sm:min-w-[50%] md:min-w-[33.3333%] px-2"
        >
          <Card className="shadow-md hover:shadow-xl transition rounded-xl text-left h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className={`font-bold rounded-full w-9 h-9 flex items-center justify-center text-sm ${t.avatarColor}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>

  {/* Right Arrow */}
  <button
    className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white border shadow-md rounded-full p-2 z-10 "
    onClick={() => emblaApi?.scrollNext()}
    disabled={!canScrollNext}
  >
    <ChevronRight className="w-5 h-5" />
  </button>
</div>

       
      </div>
    </section>
  )
}
