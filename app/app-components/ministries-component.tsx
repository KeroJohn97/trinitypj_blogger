"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import InfiniteMinistryCarousel from "./ministry-carousel"

export default function MinistriesPage({ ministries }: MinistriesPageProps) {
  const [selected, setSelected] = useState<Ministry | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

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
    <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
      {/* Ministries carousel */}
      <InfiniteMinistryCarousel selectedId={selected?.id ?? null} onSelect={handleCardClick} />

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
            className="rounded-2xl border-t-4 border-primary bg-white p-6 shadow-lg"
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
            <p className="mb-6 text-lg leading-relaxed text-gray-700">{selected.description}</p>

            {/* Photos */}
            {selected.photos && selected.photos.length > 1 && (
              <motion.div
                className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {selected.photos.slice(1).map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`${selected.name} photo ${i + 1}`}
                    className="h-48 w-full rounded-xl object-cover shadow-sm"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Q&A Section */}
            {selected.faqs && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-red-700">Q&A</h3>
                {selected.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border bg-gray-50 p-4">
                    <h4 className="font-medium text-gray-900">{faq.question}</h4>
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
