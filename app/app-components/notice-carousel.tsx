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

// 1. Data Structure: Easier to manage content
const EVENTS = [
  {
    id: 1,
    image: "https://trinitypj.com/wp-content/uploads/ChristmasEve2025_landscape-scaled.jpg",
    title: "Annual Tech Conference 2024",
    date: "Dec 15, 2024",
    description: "Join us for the biggest tech event of the year.",
  },
  {
    id: 2,
    image: "https://trinitypj.com/wp-content/uploads/ChristmasDay2025_landscape-scaled.jpg",
    title: "Community Workshop",
    date: "Jan 10, 2025",
    description: "Hands-on workshop for local developers.",
  },
]

const NoticeCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)
  const isPaused = React.useRef(false)

  // Sync carousel state for custom dots
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
      {/* Header Section */}
      <div className="mb-6 flex items-center justify-center">
        <h2 className="text-center text-3xl font-bold tracking-tight lg:text-4xl">Upcoming Events</h2>
      </div>

      <div
        className="group relative overflow-hidden rounded-2xl shadow-xl"
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
        onTouchStart={() => (isPaused.current = true)}
      >
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {EVENTS.map((event, index) => (
              <CarouselItem key={event.id}>
                <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[500px]">
                  {/* Image */}
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons (Glassmorphism) */}
          <CarouselPrevious className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 cursor-pointer border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:text-white" />
          <CarouselNext className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 cursor-pointer border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:text-white" />
        </Carousel>

        {/* Custom Pagination Indicators */}
        <div className="absolute right-6 bottom-6 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current ? "w-8 bg-white" : "w-1.5 bg-white/50"
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

export default NoticeCarousel
