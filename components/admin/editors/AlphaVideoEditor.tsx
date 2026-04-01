// components/admin/editors/AlphaVideoEditor.tsx
"use client"
import { Trash2, Youtube } from "lucide-react"
import { useState } from "react"

export default function AlphaVideoEditor() {
  const [videos, setVideos] = useState([
    { id: "1", video_id: "hB7u7S_77S8", title: "Is There More To Life Than This?" },
  ])

  const addVideo = () => {
    setVideos([...videos, { id: Date.now().toString(), video_id: "", title: "" }])
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Alpha Course Videos</h2>
        <button
          onClick={addVideo}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
        >
          <Youtube size={18} /> Add Session
        </button>
      </div>

      <div className="grid gap-4">
        {videos.map((vid) => (
          <div key={vid.id} className="group flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {/* Thumbnail Preview */}
            <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg border bg-gray-100">
              {vid.video_id ? (
                <img
                  src={`https://img.youtube.com/vi/${vid.video_id}/mqdefault.jpg`}
                  alt="Thumbnail"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <Youtube size={24} />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <input
                placeholder="Session Title (e.g. Session 1: Who is Jesus?)"
                className="w-full border-b border-transparent p-1 font-bold text-gray-800 outline-none focus:border-blue-500"
                value={vid.title}
                onChange={(e) => {
                  /* Update logic */
                }}
              />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400">youtube.com/watch?v=</span>
                <input
                  placeholder="Video ID (e.g. hB7u7S_77S8)"
                  className="flex-1 rounded border bg-gray-50 p-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  value={vid.video_id}
                  onChange={(e) => {
                    /* Update logic */
                  }}
                />
              </div>
            </div>

            <button className="p-2 text-gray-300 transition-colors hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
