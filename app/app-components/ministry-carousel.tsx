"use client"

import defaultMinistry from "@/../assets/default-ministry.jpg"
import { motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef } from "react"

// Animation constants
const ANIMATION_DURATION = 300
const SCROLL_DEBOUNCE_MS = 150
const RESIZE_DEBOUNCE_MS = 200
const HOVER_SCALE = 1.05
const DEFAULT_GAP_PX = 24

interface InfiniteMinistryCarouselProps {
  ministries: Ministry[]
  selectedId: string | null
  onSelect: (index: number) => void
  gapPx?: number
}

export default function InfiniteMinistryCarousel({
  ministries,
  selectedId,
  onSelect,
  gapPx = DEFAULT_GAP_PX,
}: InfiniteMinistryCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const isWarpingRef = useRef(false)
  const setWidthRef = useRef(0)

  const ministryCount = ministries.length
  if (ministryCount === 0) return null

  // Tripled array for infinite effect
  const tripledMinistries = useMemo(() => [...ministries, ...ministries, ...ministries], [ministries])
  const MIDDLE_SET_START = ministryCount

  // --- Width Calculation ---
  const calculateSetWidth = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || ministryCount === 0) return

    let totalWidth = 0
    for (let i = 0; i < ministryCount; i++) {
      const element = scrollContainer.children[i] as HTMLElement | undefined
      if (!element) break
      totalWidth += element.offsetWidth + gapPx
    }
    setWidthRef.current = totalWidth - gapPx
  }, [ministryCount, gapPx])

  // --- Helpers ---
  const getContainerCenterX = useCallback(() => {
    const container = containerRef.current
    if (!container) return 0
    const rect = container.getBoundingClientRect()
    return rect.left + rect.width / 2
  }, [])

  const centerElement = useCallback((element: HTMLElement) => {
    const container = containerRef.current
    const scrollContainer = scrollRef.current
    if (!container || !scrollContainer || !element) return

    const containerWidth = container.clientWidth
    const contentWidth = scrollContainer.scrollWidth
    const elementCenter = element.offsetLeft + element.offsetWidth / 2

    let targetScroll = elementCenter - containerWidth / 2

    if (contentWidth <= containerWidth) {
      targetScroll = 0
    } else {
      targetScroll = Math.min(Math.max(targetScroll, 0), contentWidth - containerWidth)
    }

    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    })
  }, [])

  const findNearestIndexToCenter = useCallback((): number | null => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return null

    const centerX = getContainerCenterX()
    let minDistance = Infinity
    let nearestIndex: number | null = null

    for (let i = 0; i < scrollContainer.children.length; i++) {
      const element = scrollContainer.children[i] as HTMLElement
      const rect = element.getBoundingClientRect()
      const elementCenter = rect.left + rect.width / 2
      const distance = Math.abs(elementCenter - centerX)

      if (distance < minDistance) {
        minDistance = distance
        nearestIndex = i
      }
    }

    return nearestIndex
  }, [getContainerCenterX])

  // --- Scroll Handler ---
  const handleScroll = useCallback(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isWarpingRef.current || setWidthRef.current === 0) return

    const setWidth = setWidthRef.current
    const minThreshold = setWidth * 0.5
    const maxThreshold = setWidth * 1.5
    const currentScroll = scrollContainer.scrollLeft
    const containerWidth = containerRef.current?.clientWidth || 0
    const contentWidth = scrollContainer.scrollWidth

    // Infinite wrap
    if (currentScroll < minThreshold || currentScroll > maxThreshold) {
      isWarpingRef.current = true
      const targetScroll = currentScroll < minThreshold ? currentScroll + setWidth : currentScroll - setWidth
      scrollContainer.scrollTo({ left: targetScroll, behavior: "auto" })
      requestAnimationFrame(() => {
        isWarpingRef.current = false
      })
    }

    // Debounced snap
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => {
      if (contentWidth <= containerWidth) return
      const nearestIndex = findNearestIndexToCenter()
      if (nearestIndex !== null) {
        const element = scrollContainer.children[nearestIndex] as HTMLElement
        if (element) centerElement(element)
      }
    }, SCROLL_DEBOUNCE_MS)
  }, [findNearestIndexToCenter, centerElement])

  // --- Effects ---
  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollRef.current
    if (!container || !scrollContainer) return

    calculateSetWidth()

    requestAnimationFrame(() => {
      if (scrollRef.current && containerRef.current) {
        const padding = containerRef.current.clientWidth / 2
        scrollRef.current.style.paddingLeft = `${padding}px`
        scrollRef.current.style.paddingRight = `${padding}px`
      }

      const firstMiddleCard = scrollContainer.children[MIDDLE_SET_START] as HTMLElement | undefined
      if (!firstMiddleCard) return

      scrollContainer.scrollTo({
        left: firstMiddleCard.offsetLeft - container.clientWidth / 2 + firstMiddleCard.offsetWidth / 2,
        behavior: "auto",
      })
    })

    const resizeTimer = { current: null as NodeJS.Timeout | null }
    const handleResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current)
      resizeTimer.current = setTimeout(() => {
        calculateSetWidth()
        const nearestIndex = findNearestIndexToCenter()
        if (nearestIndex !== null) {
          const element = scrollRef.current!.children[nearestIndex] as HTMLElement
          if (element) centerElement(element)
        }
      }, RESIZE_DEBOUNCE_MS)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimer.current) clearTimeout(resizeTimer.current)
    }
  }, [MIDDLE_SET_START, calculateSetWidth, findNearestIndexToCenter, centerElement])

  return (
    <div className="relative">
      {/* 🚀 NEW INDEX LIST ELEMENT 🚀 */}
      <div className="relative top-0 right-0 block h-full p-4 md:hidden md:w-auto">
        <div className="mx-12 flex h-full flex-col items-start justify-center gap-2">
          {ministries.map((ministry, originalIndex) => {
            const isActive = selectedId === ministry.id

            return (
              <button
                key={ministry.id}
                onClick={() => onSelect(originalIndex)}
                className={`w-full rounded-lg p-3 text-left transition ${
                  isActive
                    ? "border-l-4 border-emerald-600 bg-emerald-100 font-semibold text-emerald-800 shadow"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {ministry.name}
              </button>
            )
          })}
        </div>
      </div>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar hidden gap-6 overflow-x-scroll py-4 md:flex"
          style={{ scrollSnapType: "none" }}
        >
          {tripledMinistries.map((ministry, idx) => {
            const originalIndex = idx % ministryCount
            const isActive = selectedId === ministry.id

            return (
              <motion.div
                key={`${ministry.id}-${idx}`}
                onClick={(event) => {
                  const element = event.currentTarget as HTMLElement
                  onSelect(originalIndex)
                  centerElement(element)
                }}
                className={`group relative min-w-[250px] cursor-pointer overflow-hidden rounded-2xl border-2 bg-white shadow-lg transition-all sm:min-w-[300px] lg:min-w-[350px] ${
                  isActive ? "border-primary shadow-primary/20" : "hover:border-gray/20 border-transparent"
                }`}
                whileHover={{ scale: HOVER_SCALE }}
                transition={{ duration: ANIMATION_DURATION / 1000, ease: "easeOut" }}
              >
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <motion.img
                  src={ministry.photos?.[0] || defaultMinistry.src}
                  alt={ministry.name}
                  className="h-64 w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: ANIMATION_DURATION / 1000, ease: "easeOut" }}
                />
                <div className="absolute right-0 bottom-0 left-0 z-20 p-4 text-white">
                  <h3 className="text-xl font-semibold text-balance">{ministry.name}</h3>
                  {ministry.tagline && <p className="mt-1 text-sm text-pretty text-gray-200">{ministry.tagline}</p>}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
