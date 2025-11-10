"use client"

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import Image from "next/image"
import { MediaItem } from "./staggered-media-gallery"

interface MediaModalProps {
  item: MediaItem // single media item (video or image)
  isOpen: boolean
  onClose: () => void
}

export function MediaModal({ item, isOpen, onClose }: MediaModalProps) {
  if (!isOpen || !item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Overlay */}
      <DialogOverlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-lg">
          {item.type === "video" && item.youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              title={item.title || "YouTube video"}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full"
            />
          )}

          {item.type === "image" && item.src && (
            <Image src={item.src} alt={item.title || "Image"} fill className="object-contain" sizes="100vw" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
