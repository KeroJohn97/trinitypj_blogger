"use client"

import Image from "next/image"
import { useState } from "react"
import { MediaModal } from "./media-modal"

export type MediaItem = {
  id: string
  type: "video" | "image"
  src?: string // for images
  youtubeId?: string // for videos
  title?: string
  description?: string
  category?: string
  date?: string
}

interface StaggeredMediaGalleryProps {
  items: MediaItem[]
  onItemClick?: (item: MediaItem, index: number) => void
}

export function StaggeredMediaGallery({ items, onItemClick }: StaggeredMediaGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleItemClick = (item: MediaItem, index: number) => {
    if (onItemClick) onItemClick(item, index)
    setCurrentIndex(index)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const isVideo = item.type === "video"
          const thumbnailSrc = isVideo ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg` : item.src

          return (
            <div
              key={item.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => handleItemClick(item, index)}
            >
              <div className="bg-muted relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-video">
                  <Image
                    src={thumbnailSrc!}
                    alt={item.title || (isVideo ? "YouTube video" : "Image")}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                    {item.title && <h3 className="mb-1 text-sm font-semibold">{item.title}</h3>}
                    {item.description && <p className="line-clamp-2 text-xs opacity-90">{item.description}</p>}
                    {item.category && (
                      <span className="mt-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Only one video is passed to the modal at a time */}
      {modalOpen && <MediaModal item={items[currentIndex]!} isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </>
  )
}
