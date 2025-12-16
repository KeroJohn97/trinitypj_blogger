"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"
import * as React from "react"

interface NoticeEvent {
  id: number
  image: string
  alt: string // Kept for accessibility (screen readers)
}

const DEFAULT_EVENTS = [
  {
    id: 1,
    image: "https://trinitypj.com/wp-content/uploads/ChristmasEve2025_landscape-scaled.jpg",
    alt: "Annual Tech Conference 2024",
  },
  {
    id: 2,
    image: "https://trinitypj.com/wp-content/uploads/ChristmasDay2025_landscape-scaled.jpg",
    alt: "Community Workshop",
  },
]

export default function NoticeCarousel({ events = DEFAULT_EVENTS }: { events?: NoticeEvent[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-center text-3xl font-bold tracking-tight lg:text-4xl">Highlights</h2>
      </div>

      <div className="group relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {events.map((event, index) => (
              <CarouselItem key={event.id}>
                {/* Adjusted heights: 
                   You can change these pixel values if you want the images 
                   to be shorter since there is no text to accommodate.
                */}
                <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[450px]">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* Text Overlay removed completely */}

                  {/* Optional: Subtle bottom gradient so white dots are visible on light images */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/50 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <div className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
            <CarouselPrevious className="left-4 h-10 w-10 border-none bg-black/30 text-white backdrop-blur hover:bg-black/50" />
            <CarouselNext className="right-4 h-10 w-10 border-none bg-black/30 text-white backdrop-blur hover:bg-black/50" />
          </div>
        </Carousel>

        {/* Pagination Indicators */}
        <div className="absolute right-6 bottom-6 z-10 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full shadow-sm transition-all duration-300",
                index === current ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
