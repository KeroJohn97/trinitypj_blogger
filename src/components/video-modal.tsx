"use client"

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"

interface VideoModalProps {
  videos: { youtubeId: string; title?: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: (open: boolean) => void
  onNavigate: (index: number) => void
}

export function VideoModal({ videos, currentIndex, isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null

  const video = videos[currentIndex]
  if (!video) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Custom semi-transparent overlay */}
      <DialogOverlay className="fixed inset-0 bg-black/1 backdrop-blur-sm" />

      <DialogContent className="fixed top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title || "YouTube video"}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
