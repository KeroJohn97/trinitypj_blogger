// components/admin/editors/InfographicEditor.tsx
"use client"
import { FileImage, RefreshCw, Upload } from "lucide-react"

export default function InfographicEditor({ title, currentUrl }: { title: string; currentUrl: string }) {
  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <button className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-800">
          <RefreshCw size={14} /> Replace Image
        </button>
      </div>

      <div className="group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-50">
        {currentUrl ? (
          <img src={currentUrl} alt={title} className="h-full w-full object-contain" />
        ) : (
          <div className="text-center text-gray-400">
            <FileImage size={48} className="mx-auto mb-2 opacity-20" />
            <p className="text-xs font-medium tracking-widest uppercase">No Infographic Uploaded</p>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black">
            <Upload size={16} /> Upload New
          </button>
        </div>
      </div>
    </div>
  )
}
