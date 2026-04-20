"use client"

import DriveFolderViewer from "@/components/drive-folder-viewer"
import DriveLibraryViewer from "@/components/drive-library-viewer"
import DrivePdfViewer from "@/components/drive-pdf-viewer"
import { MediaModal } from "@/components/media-modal"
import { formatEmail } from "@/lib/helpers"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import InfiniteMinistryCarousel from "./ministry-carousel"
import { MinistriesPageProps, Ministry } from "@/lib/interface"

export default function MinistriesPage({ ministries }: MinistriesPageProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selected, setSelected] = useState<Ministry | null>(ministries.length > 0 ? ministries[0]! : null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
    document.body.style.overflow = "auto"
  }, [])

  const nextImage = useCallback(() => {
    if (selectedIndex !== null && selected?.photos) {
      setSelectedIndex((selectedIndex + 1) % selected.photos.length)
    }
  }, [selectedIndex, selected?.photos])

  const prevImage = useCallback(() => {
    if (selectedIndex !== null && selected?.photos) {
      setSelectedIndex((selectedIndex - 1 + selected.photos.length) % selected.photos.length)
    }
  }, [selectedIndex, selected?.photos])

  // Keyboard Navigation
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

  const handleCardClick = useCallback(
    (clickedIndex: number) => {
      const originalIndex = clickedIndex % ministries.length
      const ministry = ministries[originalIndex]

      if (ministry) {
        setSelected(ministry)
      }
    },
    [ministries.length]
  )

  return (
    <section className="space-y-10 px-4 py-8 sm:max-w-lg md:max-w-2xl md:px-0 lg:max-w-4xl">
      {/* Ministries carousel */}
      <div className="max-w-screen">
        <InfiniteMinistryCarousel
          ministries={ministries}
          selectedId={selected?.id ?? null}
          onSelect={handleCardClick}
        />
      </div>

      {/* Selected ministry details */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            ref={sectionRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="border-primary rounded-2xl border-t-4 bg-white p-6 shadow-lg"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelected(null)}
              className="mb-4 flex items-center gap-2 font-semibold text-red-700 hover:text-red-800"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{selected.name}</h2>
              {selected.tagline && <p className="mt-1 text-gray-600">{selected.tagline}</p>}
            </div>

            {/* Description */}
            <p className="mb-6 text-lg leading-relaxed whitespace-pre-wrap text-gray-700">
              {selected.description && formatEmail(selected.description)}
            </p>

            {/* Disclaimer */}
            {selected.metadata?.disclaimer && <div className="mb-6 text-red-600 italic">{selected.metadata.disclaimer}</div>}

            {/* Photos */}
            {selected.photos && selected.photos.length > 0 && (
              <motion.div
                className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {selected.photos.map((src, i) => (
                  <div key={i} className="cursor-pointer overflow-hidden rounded-lg border shadow-sm group">
                    <motion.img
                      src={src}
                      alt={`${selected.name} photo ${i + 1}`}
                      className="h-48 w-full rounded-xl object-cover shadow-sm transition-transform duration-500 group-hover:scale-110"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      onClick={() => openLightbox(i)}
                    />
                  </div>
                ))}
              </motion.div>
            )}

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
              {selectedIndex !== null && selected.photos && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md"
                  onClick={closeLightbox}
                >
                  <button
                    onClick={closeLightbox}
                    className="absolute top-8 right-8 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 rotate-45" /> {/* Close "X" style with icon or just X-Circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-xl font-bold">×</span>
                    </div>
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
                      <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="rounded-full bg-black/50 p-4 text-white ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </div>

                  {/* Main Image View */}
                  <div 
                    className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.img
                      key={selectedIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      src={selected.photos[selectedIndex]}
                      alt={`${selected.name} moment`}
                      className="max-h-[75vh] w-auto rounded-3xl object-contain shadow-2xl"
                    />

                      <div className="text-center">
                        <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
                          {selected.name}
                        </p>
                        <p className="mt-2 text-sm font-black tracking-widest text-white/40 uppercase">
                          Photo {selectedIndex + 1} / {selected.photos.length}
                        </p>
                      </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {selected.metadata?.attachment && (
              <div className="mb-6">
                <DriveFolderViewer 
                  folder={selected.metadata.attachment.src} 
                  title={selected.metadata.attachment.title} 
                  height={320} 
                />
              </div>
            )}

            {selected.metadata?.pdf && (
              <div className="mb-6">
                <DrivePdfViewer 
                  url={selected.metadata.pdf.src} 
                  title={selected.metadata.pdf.title} 
                />
              </div>
            )}

            {/* Q&A Section */}
            {selected.metadata?.faqs && selected.metadata.faqs.length > 0 && (
              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold text-red-700">Q&A</h3>
                {selected.metadata.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{faq.question}</h4>
                    <p className="mt-2 whitespace-pre-wrap text-gray-600">{formatEmail(faq.answer)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Magazine Archive / Library */}
            {selected.metadata?.library && selected.metadata.library.length > 0 && (
              <div className="mb-10 space-y-6">
                <div className="flex items-center gap-3 border-b-2 border-emerald-50 pb-2">
                  <h3 className="text-2xl font-black tracking-tight text-emerald-800">Archive & Resources</h3>
                  <div className="h-1 flex-1 bg-emerald-50/50" />
                </div>
                <DriveLibraryViewer items={selected.metadata.library} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
