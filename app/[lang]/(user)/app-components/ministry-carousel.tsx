"use client"

import defaultMinistry from "@/../assets/default-ministry.jpg"
import { Ministry } from "@/lib/interface"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"

interface InfiniteMinistryCarouselProps {
  ministries: Ministry[]
  selectedId: string | null
  onSelect: (index: number) => void
}

export default function InfiniteMinistryCarousel({
  ministries,
  selectedId,
  onSelect,
}: InfiniteMinistryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelectEmbla = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    setActiveIndex(index)
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    
    // Sync with parent state
    // We only call onSelect if the selectedId doesn't match the new index's ministry id
    const currentMinistry = ministries[index]
    if (currentMinistry && currentMinistry.id !== selectedId) {
      onSelect(index)
    }
  }, [emblaApi, ministries, selectedId, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    onSelectEmbla()
    emblaApi.on("select", onSelectEmbla)
    emblaApi.on("reInit", onSelectEmbla)
    return () => {
      emblaApi.off("select", onSelectEmbla)
    }
  }, [emblaApi, onSelectEmbla])

  // External control: If selectedId changes from outside, scroll to it
  useEffect(() => {
    if (!emblaApi || selectedId === null) return
    const targetIndex = ministries.findIndex(m => m.id === selectedId)
    if (targetIndex !== -1 && targetIndex !== emblaApi.selectedScrollSnap()) {
      emblaApi.scrollTo(targetIndex)
    }
  }, [emblaApi, selectedId, ministries])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  if (ministries.length === 0) return null

  return (
    <div className="relative group/carousel">
      {/* Viewport */}
      <div 
        className="overflow-hidden px-4 py-8" 
        ref={emblaRef}
      >
        <div className="flex touch-pan-y gap-4 lg:gap-8">
          {ministries.map((ministry, index) => {
            const isActive = activeIndex === index
            
            return (
              <div 
                key={ministry.id}
                className="relative flex-[0_0_82%] min-w-0 sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
                onClick={() => emblaApi?.scrollTo(index)}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[32px] bg-white shadow-xl transition-all duration-500",
                    isActive ? "ring-4 ring-emerald-500/20 shadow-emerald-900/10" : "grayscale-[20%]"
                  )}
                >
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Image */}
                  <img
                    src={ministry.photos?.[0] || defaultMinistry.src}
                    alt={ministry.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 text-white md:p-8">
                    <motion.div
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                        {ministry.name}
                      </h3>
                      <AnimatePresence>
                        {isActive && ministry.tagline && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm font-bold tracking-wide text-emerald-300 uppercase"
                          >
                            {ministry.tagline}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute top-6 right-6 z-20 flex h-2 w-10 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                    />
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows (Desktop) */}
      <div className="absolute inset-y-0 -left-4 z-30 hidden items-center md:flex lg:-left-12">
        <button
          onClick={scrollPrev}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-xl ring-1 ring-slate-200 backdrop-blur transition-all hover:bg-emerald-600 hover:text-white disabled:opacity-30 lg:h-14 lg:w-14"
          aria-label="Previous Ministry"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
      <div className="absolute inset-y-0 -right-4 z-30 hidden items-center md:flex lg:-right-12">
        <button
          onClick={scrollNext}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-xl ring-1 ring-slate-200 backdrop-blur transition-all hover:bg-emerald-600 hover:text-white disabled:opacity-30 lg:h-14 lg:w-14"
          aria-label="Next Ministry"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Pagination Dots (Mobile/Tablet) */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {ministries.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              activeIndex === index 
                ? "w-8 bg-emerald-500" 
                : "w-2 bg-slate-200 hover:bg-slate-300"
            )}
            aria-label={`Go to ministry ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
