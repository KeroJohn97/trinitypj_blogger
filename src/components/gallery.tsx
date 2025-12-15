"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"

const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Community gathering",
    title: "Community Gathering 2023",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Sanctuary interior",
    title: "Beautiful Sanctuary",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Community service",
    title: "Community Service Day",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Youth program",
    title: "Youth Programs",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Music ministry",
    title: "Music Ministry",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Fellowship meal",
    title: "Fellowship Meals",
  },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (imageId: number) => {
    setSelectedImage(imageId)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1
    } else {
      newIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(galleryImages[newIndex]!.id)
  }

  const currentImage = selectedImage ? galleryImages.find((img) => img.id === selectedImage) : null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openModal(image.id)}
          >
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${image.src})` }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <div className="text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-semibold">{image.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-4xl border-none bg-black/95 p-0">
          <DialogTitle className="sr-only">YouTube Video</DialogTitle>{" "}
          <DialogDescription className="sr-only">A YouTube video player inside a dialog</DialogDescription>
          {currentImage && (
            <div className="relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 transform text-white hover:bg-white/20"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 transform text-white hover:bg-white/20"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image */}
              <div className="flex max-h-[80vh] min-h-[60vh] items-center justify-center">
                <img src={currentImage.src} alt={currentImage.alt} className="max-h-full max-w-full object-contain" />
              </div>

              {/* Title */}
              <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-semibold text-white">{currentImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
