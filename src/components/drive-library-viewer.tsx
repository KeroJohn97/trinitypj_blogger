"use client"

import { FileText } from "lucide-react"

interface PdfLibraryProps {
  items: Attachment[]
}

export default function DriveLibraryViewer({ items }: PdfLibraryProps) {
  // Extract Google Drive thumbnail if available
  const getDriveThumbnail = (url: string): string | null => {
    const match = url.match(/\/d\/([^/]+)/) // extract file ID
    if (!match) return null
    const id = match[1]
    return `https://drive.google.com/thumbnail?id=${id}`
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item, idx) => {
        const driveThumb = getDriveThumbnail(item.src)
        const thumb = item.thumb || driveThumb

        return (
          <a
            key={idx}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full max-w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow transition-all hover:shadow-lg"
          >
            {/* Thumbnail / Fallback */}
            {thumb ? (
              <div className="relative w-full overflow-hidden pb-[150%]">
                <img
                  src={thumb}
                  alt={item.title}
                  className="absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 w-full bg-black/40 px-2 py-1">
                  <p className="truncate text-sm font-medium text-white">{item.title}</p>
                </div>
              </div>
            ) : (
              <div className="flex h-[200px] w-full items-center justify-center bg-gray-100 text-gray-400">
                <FileText className="h-10 w-10" />
              </div>
            )}
          </a>
        )
      })}
    </div>
  )
}
