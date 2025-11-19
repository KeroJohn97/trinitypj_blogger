"use client"

interface DriveFolderEmbedProps {
  /** Full Google Drive folder URL or the folder ID */
  folder: string
  height?: number
  title?: string
}

export default function DriveFolderViewer({ folder, height = 700, title = "Folder Viewer" }: DriveFolderEmbedProps) {
  // Accept either a full URL or a folder ID
  const folderId = folder.includes("drive.google.com") ? folder.split("/").filter(Boolean).pop() : folder

  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
        <h3 className="font-semibold text-gray-700">{title}</h3>

        <a
          href={`https://drive.google.com/drive/folders/${folderId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primary/80 rounded-md px-3 py-1 text-sm text-white"
        >
          Open
        </a>
      </div>

      {/* Folder Iframe */}
      <iframe src={embedUrl} style={{ height }} className="w-full" loading="lazy" />
    </div>
  )
}
