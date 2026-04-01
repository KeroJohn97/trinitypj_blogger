// components/admin/editors/AnnouncementsEditor.tsx
"use client"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function AnnouncementsEditor() {
  // In a real app, you'd fetch this from your 'announcements' table
  const [announcements, setAnnouncements] = useState([{ id: "1", url: "https://...", caption: "Youth Camp 2024" }])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Weekly Announcements</h2>
          <p className="text-sm text-gray-500">Upload images for the scrolling announcement banner.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
          <Plus size={18} /> Add Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Image Preview */}
            <div className="flex aspect-video items-center justify-center overflow-hidden bg-gray-100">
              <img src={item.url} alt="Announcement" className="h-full w-full object-cover" />
            </div>

            {/* Caption Area */}
            <div className="p-3">
              <input
                type="text"
                value={item.caption}
                placeholder="Optional caption..."
                className="w-full border-none p-0 text-sm text-gray-600 focus:ring-0"
              />
            </div>

            {/* Delete Overlay */}
            <button className="absolute top-2 right-2 rounded-full bg-white/90 p-2 text-red-500 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
