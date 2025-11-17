"use client"

import Image from "next/image"
import { MediaItem } from "./staggered-media-gallery"
import { MediaDialog, MediaDialogContent } from "./ui/media-dialog"

interface MediaModalProps {
  item: MediaItem // single media item (video or image)
  isOpen: boolean
  onClose: () => void
}

export function MediaModal({ item, isOpen, onClose }: MediaModalProps) {
  if (!isOpen || !item) return null

  return (
    <MediaDialog open={isOpen} onOpenChange={onClose}>
      <MediaDialogContent>
        {item.type === "image" && item.src && (
          <div className="relative h-auto w-full">
            <Image
              src={item.src}
              alt={item.title || "Image"}
              width={1600} // width used for layout purposes
              height={900} // height used for layout purposes
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {item.type === "video" && item.youtubeId && (
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              title={item.title || "YouTube video"}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        )}
      </MediaDialogContent>
    </MediaDialog>
  )
}
