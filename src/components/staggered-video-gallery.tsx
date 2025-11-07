"use client"

import Image from "next/image"
import { useState } from "react"
import { VideoModal } from "./video-modal"

interface GalleryVideo {
  id: string
  youtubeId: string
  title?: string
  description?: string
  category?: string
  date?: string
}

interface StaggeredVideoGalleryProps {
  videos: GalleryVideo[]
  onVideoClick?: (video: GalleryVideo, index: number) => void
}

export function StaggeredVideoGallery({ videos, onVideoClick }: StaggeredVideoGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const handleVideoClick = (video: GalleryVideo, index: number) => {
    if (onVideoClick) {
      onVideoClick(video, index)
    } else {
      setCurrentVideoIndex(index)
      setModalOpen(true)
    }
  }

  const handleCloseModal = (open: boolean) => {
    setModalOpen(open)
  }

  const handleNavigate = (index: number) => {
    setCurrentVideoIndex(index)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
            onClick={() => handleVideoClick(video, index)}
          >
            <div className="bg-muted relative overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title || "YouTube video"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Overlay content */}
                <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                  {video.title && <h3 className="mb-1 text-sm font-semibold">{video.title}</h3>}
                  {video.description && <p className="line-clamp-2 text-xs opacity-90">{video.description}</p>}
                  {video.category && (
                    <span className="mt-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs">
                      {video.category}
                    </span>
                  )}
                </div>

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <VideoModal
        videos={videos}
        currentIndex={currentVideoIndex}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  )
}
