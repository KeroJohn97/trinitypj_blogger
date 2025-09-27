"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
  category?: string
  date?: string
}

interface ImageModalProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageModal({ images, currentIndex, isOpen, onClose, onNavigate }: ImageModalProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          e.preventDefault()
          handlePrevious()
          break
        case "ArrowRight":
          e.preventDefault()
          handleNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    onNavigate(newIndex)
    setIsLoading(true)
  }

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    onNavigate(newIndex)
    setIsLoading(true)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: images[currentIndex]?.title || "Trinity Methodist Church PJ Gallery",
          text:
            images[currentIndex]?.description ||
            "Check out this image from Trinity Methodist Church PJ",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!isOpen || !images[currentIndex]) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 right-0 left-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="text-sm opacity-75">
              {currentIndex + 1} of {images.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare} className="text-white hover:bg-white/20">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 z-10 h-12 w-12 -translate-y-1/2 rounded-full text-white hover:bg-white/20"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        className="absolute top-1/2 right-4 z-10 h-12 w-12 -translate-y-1/2 rounded-full text-white hover:bg-white/20"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Main Image */}
      <div className="flex h-full items-center justify-center p-4 pt-20 pb-32">
        <div className="relative max-h-full max-w-7xl">
          <div className="relative">
            {isLoading && (
              <div className="bg-muted/20 absolute inset-0 flex items-center justify-center rounded-lg">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              </div>
            )}
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="max-h-full max-w-full rounded-lg object-contain"
              onLoad={() => setIsLoading(false)}
              priority
            />
          </div>
        </div>
      </div>

      {/* Footer with Image Info */}
      {(currentImage.title || currentImage.description) && (
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="mx-auto max-w-4xl text-white">
            {currentImage.title && <h3 className="mb-2 text-xl font-semibold">{currentImage.title}</h3>}
            {currentImage.description && (
              <p className="text-sm leading-relaxed text-white/80">{currentImage.description}</p>
            )}
            <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
              {currentImage.category && (
                <span className="rounded-full bg-white/10 px-2 py-1">{currentImage.category}</span>
              )}
              {currentImage.date && <span>{currentImage.date}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
