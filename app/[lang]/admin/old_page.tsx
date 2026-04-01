"use client"
import { websiteService } from "@/services/website-service"
import { DEFAULT_SITE_DATA } from "@/types/defaults"
import { SiteData } from "@/types/website"
import { useEffect, useRef, useState } from "react"

export default function WebsiteSettingsPage() {
  const [formData, setFormData] = useState<SiteData>(DEFAULT_SITE_DATA)
  const [isUploading, setIsUploading] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // --- IFRAME SYNC LOGIC ---
  const sendToIframe = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "WHATSAPP_BUILDER_DRAFT",
          payload: formData,
        },
        "*"
      )
    }
  }

  // 1. Initial Load (Mount only)
  useEffect(() => {
    const loadData = async () => {
      const data = await websiteService.getSettings()
      if (data) setFormData(data)
    }
    loadData()

    const handlePreviewReady = (e: MessageEvent) => {
      if (e.data.type === "PREVIEW_READY") sendToIframe()
    }
    window.addEventListener("message", handlePreviewReady)
    return () => window.removeEventListener("message", handlePreviewReady)
  }, [])

  // 2. Sync with Preview on every data change
  useEffect(() => {
    sendToIframe()
  }, [formData])

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  // Find your handleSave function and change the URL
  const handleSave = async () => {
    try {
      // ❌ REMOVE: /api/admin/website-settings
      // ✅ CHANGE TO: /api/website-settings
      const response = await fetch("/api/website-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      // Check if the response is actually JSON before parsing
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        console.error("Non-JSON response received:", text)
        throw new Error("Server returned a webpage instead of data. Check your API path.")
      }

      const result = await response.json()
      if (response.ok) alert("Settings saved!")
    } catch (error) {
      console.error("Save Error:", error)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      console.log("📤 UI: Starting logo upload...")
      const publicUrl = await websiteService.uploadLogo(file)

      // Create the updated object
      const updatedData = { ...formData, logoUrl: publicUrl }

      // Update local UI immediately
      setFormData(updatedData)

      // Save to database
      console.log("💾 UI: Logo uploaded, now saving URL to DB...")
      await websiteService.saveSettings(updatedData)
    } catch (error) {
      console.error("LOGO UPLOAD FLOW ERROR:", error)
      alert("Logo upload process failed.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Form */}
      <div className="w-85 space-y-6 overflow-y-auto border-r bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Site Customizer</h2>
          <button
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

        <hr />

        {/* Logo Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase">Brand Assets</label>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
              {formData.logoUrl ? (
                <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-contain p-2" />
              ) : (
                <span className="text-[10px] text-gray-400">No Logo</span>
              )}
            </div>
            <label className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold hover:bg-gray-50">
              {isUploading ? "Uploading..." : "Replace Logo"}
              <input type="file" className="hidden" onChange={handleLogoUpload} disabled={isUploading} />
            </label>
          </div>
        </div>

        {/* Title & Color */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Site Identity</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Site Title"
              className="mt-2 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Primary Theme Color</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="h-10 w-10 cursor-pointer overflow-hidden rounded-full border-none"
              />
              <span className="font-mono text-sm text-gray-600">{formData.primaryColor}</span>
            </div>
          </div>
        </div>

        {/* Content & Social */}
        <div className="space-y-4 pt-4">
          <label className="text-xs font-bold text-gray-400 uppercase">Social Presence</label>
          <input
            placeholder="Facebook URL"
            value={formData.socialLinks.facebook}
            onChange={(e) => handleSocialChange("facebook", e.target.value)}
            className="w-full rounded-md border p-2 text-sm"
          />
          <input
            placeholder="Instagram URL"
            value={formData.socialLinks.instagram}
            onChange={(e) => handleSocialChange("instagram", e.target.value)}
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-8">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div className="absolute top-0 right-0 left-0 flex h-8 items-center gap-2 border-b bg-gray-50 px-4">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <iframe ref={iframeRef} src="/preview" className="h-full w-full pt-8" onLoad={sendToIframe} />
        </div>
      </div>
    </div>
  )
}
