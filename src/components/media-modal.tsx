"use client"

// Removed 'next/image' import to resolve compilation error
// import Image from "next/image"

// Mocking types and components for a self-contained example
type MediaItem = {
  type: "image" | "video"
  src?: string
  youtubeId?: string
  title?: string
}

// Mock components (replace with actual UI component imports)
const MediaDialog = ({ open, onOpenChange, children }: any) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
    onClick={onOpenChange}
  >
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
)

const MediaDialogContent = ({ children }: any) => (
  // We'll give the content wrapper the primary style for the modal body
  <div className="rounded-lg bg-white p-4 shadow-2xl sm:p-6">{children}</div>
)
// End Mock components

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
          // Container set to max-w/h 90% of viewport with overflow-auto for scrolling
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-gray-900 shadow-inner">
            {/* Using standard HTML <img> instead of Next.js <Image> to resolve compilation error */}
            <img
              src={item.src}
              alt={item.title || "Image"}
              // Using w-auto h-auto to respect the image's native size, triggering scroll if necessary
              className="h-auto w-auto object-contain"
              // Placeholder for image dimensions, since width/height are not mandatory on standard <img>
              // and the scrolling logic relies on the image being larger than the container.
            />
          </div>
        )}

        {item.type === "video" && item.youtubeId && (
          // Video aspect ratio remains fixed and responsive to a typical screen size
          <div className="relative aspect-video w-full max-w-[800px] bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
              title={item.title || "YouTube video"}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        )}
      </MediaDialogContent>
    </MediaDialog>
  )
}
