"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

interface GalleryItem {
  id: string
  image_id: string
  caption?: string
  media_assets?: {
    storage_path: string
  }
}

interface ActivityGalleryProps {
  items: GalleryItem[]
  dictionary: {
    intro: {
      title: string
      desc: string
    }
  }
}

export function ActivityGallery({ items, dictionary }: ActivityGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = "auto"
  }, [])

  const nextImage = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length)
    }
  }, [selectedIndex, items.length])

  const prevImage = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
    }
  }, [selectedIndex, items.length])

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, closeLightbox, nextImage, prevImage])

  return (
    <>
      <div className="columns-1 gap-8 space-y-8 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="break-inside-avoid"
          >
            <div
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-sm transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.media_assets?.storage_path}`}
                alt={item.caption || "Small Group Activity"}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <p className="text-sm font-semibold text-white/90 line-clamp-2">
                  {item.caption || "View Moment"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-800/40 backdrop-blur"
            onPointerDown={(e) => e.target === e.currentTarget && closeLightbox()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-0 top-1/2 z-[105] flex -translate-y-1/2 justify-between px-4 md:px-12">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="rounded-full bg-black/50 p-4 text-white ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="rounded-full bg-black/50 p-4 text-white ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Main Image View */}
            {(() => {
              const currentItem = items[selectedIndex]
              return (
                <div className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-6">
                  <motion.img
                    key={selectedIndex}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${currentItem?.media_assets?.storage_path}`}
                    alt={currentItem?.caption || "Activity"}
                    className="max-h-[75vh] rounded-2xl object-contain shadow-2xl"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
                      {currentItem?.caption}
                    </p>
                    <p className="mt-2 text-sm font-black tracking-widest text-white/40 uppercase">
                      Moment {selectedIndex + 1} / {items.length}
                    </p>
                  </motion.div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
