"use client"

import { LandingNotice } from "@/services/landing-notice-service"
import { AnimatePresence, motion, PanInfo } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface LandingNoticeModalProps {
  notices: LandingNotice[]
}

export function LandingNoticeModal({ notices }: LandingNoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (notices.length === 0) return

    const lastSeenStr = localStorage.getItem("last-seen-notices-time")
    let shouldShow = true

    if (lastSeenStr) {
      const lastSeenTime = parseInt(lastSeenStr, 10)
      const oneDayInMs = 24 * 60 * 60 * 1000
      if (Date.now() - lastSeenTime < oneDayInMs) {
        shouldShow = false
      }
    }
    
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem("last-seen-notices-time", Date.now().toString())
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [notices])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % notices.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length)
    }
  }

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500
    if (swipe) {
      if (offset.x > 0) {
        paginate(-1)
      } else {
        paginate(1)
      }
    }
  }

  if (notices.length === 0) return null

  const activeNotice = notices[currentIndex]
  if (!activeNotice) return null

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          {/* Backdrop - Subtle & Focused */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          >
            {/* Soft Blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
          </motion.div>

          {/* Compact Media Container */}
          <div className="relative w-full max-w-xl overflow-visible">
            {/* Close Button - Positioned on Top Right of the image */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 z-[120] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-xl transition-all hover:bg-black hover:scale-110 active:scale-95 ring-2 ring-white"
              aria-label="Close"
            >
              <X size={20} strokeWidth={3} />
            </button>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={handleDragEnd}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
                className="flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                {activeNotice.media_assets?.storage_path ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${activeNotice.media_assets.storage_path}`}
                    alt={activeNotice.title}
                    className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl ring-1 ring-white/10 select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="flex aspect-video w-full max-w-2xl flex-col items-center justify-center rounded-3xl bg-white/5 p-12 text-center text-white backdrop-blur-sm border border-white/10">
                    <h3 className="text-2xl font-black tracking-tight">{activeNotice.title}</h3>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Floats on sides */}
            {notices.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-0 top-1/2 -translate-x-1/2 md:-translate-x-16 lg:-translate-x-24 -translate-y-1/2 z-[105] hidden sm:flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-105 active:scale-95"
                >
                  <ChevronLeft size={40} strokeWidth={1.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-0 top-1/2 translate-x-1/2 md:translate-x-16 lg:translate-x-24 -translate-y-1/2 z-[105] hidden sm:flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-105 active:scale-95"
                >
                  <ChevronRight size={40} strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Subtle Progress Bar at Bottom */}
            {notices.length > 1 && (
              <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
                {notices.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > currentIndex ? 1 : -1)
                      setCurrentIndex(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "w-10 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
