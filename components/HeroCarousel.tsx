"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import Autoplay from "embla-carousel-autoplay"

const allImages = [
  "/images/slide1.webp",
  "/images/slide2.webp",
  "/images/slide3.webp",
  "/images/slide4.webp",
  "/images/slide5.webp",
]

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
  const [visibleSlides, setVisibleSlides] = useState<string[]>([])

  useEffect(() => {
    // Only show slide 5 on screens ≥ 640px (sm breakpoint)
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(allImages.slice(0, 4)) // exclude slide 5
      } else {
        setVisibleSlides(allImages) // show all slides
      }
    }

    handleResize() // run once
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi, visibleSlides])

  return (
    <div
      ref={emblaRef}
      className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-xl"
    >
      <div className="flex">
        {visibleSlides.map((src, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0  h-[300px]  bg-white flex items-center justify-center"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={960}
              height={540}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}


