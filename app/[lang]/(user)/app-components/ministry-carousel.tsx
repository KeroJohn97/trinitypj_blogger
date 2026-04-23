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
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.92,
                      opacity: isActive ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className={cn(
                      "relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[40px] bg-white transition-all duration-500",
                      isActive ? "shadow-2xl shadow-emerald-500/10 ring-2 ring-emerald-500" : "shadow-md ring-1 ring-slate-100"
                    )}
                  >
                    {/* Image */}
                    <img
                      src={ministry.photos?.[0] || defaultMinistry.src}
                      alt={ministry.name}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Subtle Label below image */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.5,
                      y: isActive ? 0 : 5
                    }}
                    className="mt-4 text-center px-4"
                  >
                    <p className={cn(
                      "text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-emerald-600" : "text-slate-400"
                    )}>
                      {ministry.name}
                    </p>
                  </motion.div>
                </div>
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
