// components/admin/editors/AboutUsEditor.tsx
"use client"
import { Edit3, Eye, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function AboutUsEditor({ initialData }: { initialData: string }) {
  const [content, setContent] = useState(initialData || "")
  const [view, setView] = useState<"edit" | "preview">("edit")

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">About Our Church</h2>
          <p className="text-sm text-gray-500">Use Markdown to tell the story of Trinity Methodist Church PJ.</p>
        </div>
        <div className="flex gap-2 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setView("edit")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all ${view === "edit" ? "bg-white font-bold text-emerald-600 shadow-sm" : "text-gray-500"}`}
          >
            <Edit3 size={16} /> Write
          </button>
          <button
            onClick={() => setView("preview")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-all ${view === "preview" ? "bg-white font-bold text-emerald-600 shadow-sm" : "text-gray-500"}`}
          >
            <Eye size={16} /> Preview
          </button>
        </div>
      </div>

      <div className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
        {view === "edit" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Our History... \n\nTrinity Methodist Church was founded in..."
            className="flex-1 resize-none p-8 font-mono text-sm leading-relaxed outline-none"
          />
        ) : (
          <div className="prose prose-blue max-w-none flex-1 p-8">
            {/* Use a library like react-markdown here */}
            <div className="text-gray-400 italic">Rendered content will appear here using your site's styles...</div>
          </div>
        )}

        <div className="flex items-center justify-between border-t bg-gray-50 p-4">
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            className="flex items-center gap-1 text-xs text-emerald-600 hover:underline"
          >
            <HelpCircle size={14} /> Markdown Guide
          </a>
          <p className="text-xs text-gray-400">{content.length} characters</p>
        </div>
      </div>
    </div>
  )
}
