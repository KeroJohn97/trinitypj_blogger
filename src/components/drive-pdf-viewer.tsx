"use client"

interface PdfPreviewProps {
  url: string
  height?: number
  title?: string
}

export default function DrivePdfViewer({ url, height = 700, title = "PDF Preview" }: PdfPreviewProps) {
  const encoded = encodeURIComponent(url)
  const viewerUrl = `https://docs.google.com/gview?url=${encoded}&embedded=true`

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/80 rounded-md px-3 py-1 text-sm text-white"
        >
          Open
        </a>
      </div>

      {/* PDF iframe */}
      <iframe src={viewerUrl} style={{ height }} className="w-full" loading="lazy" />
    </div>
  )
}
