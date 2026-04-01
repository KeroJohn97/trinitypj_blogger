// components/admin/editors/VisionEditor.tsx
"use client"
import { Plus, Trash2, Upload } from "lucide-react"
import { useState } from "react"

export default function VisionEditor() {
  const [pillars, setPillars] = useState([
    { id: "1", title: "Our Vision", image: "https://...", desc: "To be a vibrant community..." },
  ])

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Vision & Mission</h2>
        <p className="text-sm text-gray-500">Manage the core identity pillars of the church.</p>
      </div>

      <div className="space-y-6">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex-row">
            {/* Image Preview / Upload */}
            <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-100 text-gray-400 md:w-64">
              {pillar.image ? (
                <img src={pillar.image} className="h-full w-full object-cover" />
              ) : (
                <>
                  <Upload size={24} />
                  <span className="mt-2 text-[10px] font-bold">UPLOAD IMAGE</span>
                </>
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1 space-y-4">
              <input
                placeholder="Pillar Title (e.g. Our Mission)"
                className="w-full border-b border-transparent pb-1 text-xl font-bold outline-none focus:border-blue-500"
                value={pillar.title}
              />
              <textarea
                placeholder="Describe this vision pillar..."
                className="h-24 w-full rounded-lg border-none bg-gray-50 p-3 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-blue-500"
                value={pillar.desc}
              />
            </div>

            <button className="self-start p-2 text-gray-300 hover:text-red-500">
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-4 font-bold text-gray-400 transition-all hover:border-blue-200 hover:text-blue-600">
          <Plus size={20} /> Add New Vision Pillar
        </button>
      </div>
    </div>
  )
}
