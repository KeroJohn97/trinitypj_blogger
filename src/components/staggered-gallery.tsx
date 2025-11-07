"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageModal } from "./image-modal"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  date?: string
}

interface StaggeredGalleryProps {
  images: GalleryImage[]
  onImageClick?: (image: GalleryImage, index: number) => void
}

export function StaggeredGallery({ images, onImageClick }: StaggeredGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleImageClick = (image: GalleryImage, index: number) => {
    if (onImageClick) {
      onImageClick(image, index)
    } else {
      setCurrentImageIndex(index)
      setModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleNavigate = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
              index % 3 === 1 ? "md:mt-8" : index % 3 === 2 ? "md:mt-16" : ""
            }`}
            onClick={() => handleImageClick(image, index)}
          >
            <div className="bg-muted relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative aspect-4/3">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay content */}
                <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                  {image.title && <h3 className="mb-1 text-sm font-semibold">{image.title}</h3>}
                  {image.description && <p className="line-clamp-2 text-xs opacity-90">{image.description}</p>}
                  {image.category && (
                    <span className="mt-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs">
                      {image.category}
                    </span>
                  )}
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  )
}
