"use client"

import React, { useEffect, useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import HomeServices from "./home-services"
import YoutubeServices from "./youtube-services"

const HomeCarousel = () => {
  const [api, setApi] = React.useState<any>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isPaused = useRef(false)

  const startAutoplay = () => {
    if (intervalRef.current || !api) return
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) {
        api.scrollNext()
      }
    }, 3000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (!api) return
    startAutoplay()
    return () => stopAutoplay()
  }, [api])

  return (
    <div
      className="relative mx-auto w-full max-w-4xl"
      onMouseEnter={() => {
        isPaused.current = true
      }}
      onMouseLeave={() => {
        isPaused.current = false
      }}
    >
      <Carousel orientation="horizontal" opts={{ loop: true, containScroll: "trimSnaps" }} setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <HomeServices />
          </CarouselItem>
          <CarouselItem>
            <YoutubeServices />
          </CarouselItem>
        </CarouselContent>
        <CarouselIndicators className="[&>button]:cursor-pointer [&>button]:transition-transform [&>button:hover]:scale-110" />
      </Carousel>
    </div>
  )
}

export default HomeCarousel
