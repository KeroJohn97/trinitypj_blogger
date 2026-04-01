// components/admin/editors/BulletinEditor.tsx
"use client"
import { ExternalLink, Info } from "lucide-react"
import { useState } from "react"

export default function BulletinEditor({ initialData }: { initialData: string }) {
  const [link, setLink] = useState(initialData || "")

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Digital Bulletin</h2>
        <p className="text-sm text-gray-500">Paste the Google Drive "Share" link for this week's PDF.</p>
      </div>

      <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          <Info size={18} />
          <p>
            Ensure the Google Drive file permission is set to <b>"Anyone with the link can view."</b>
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Google Drive URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="flex-1 rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {link && (
              <a href={link} target="_blank" className="rounded-lg border p-2 hover:bg-gray-50">
                <ExternalLink size={20} className="text-gray-400" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
