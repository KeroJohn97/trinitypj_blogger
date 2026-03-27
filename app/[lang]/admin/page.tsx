"use client"
import { useEffect, useRef, useState } from "react"

export default function WebsiteSettingsPage() {
  const [formData, setFormData] = useState({
    title: "My Global News",
    primaryColor: "#2563eb",
    logoUrl: "",
    description: "The latest updates from our community and beyond.",
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
  })
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Helper function to send data
  const sendToIframe = () => {
    if (iframeRef.current?.contentWindow) {
      console.log("Admin is sending data now...")
      iframeRef.current.contentWindow.postMessage({ type: "WHATSAPP_BUILDER_DRAFT", payload: formData }, "*")
    }
  }

  useEffect(() => {
    // Listen for the "PREVIEW_READY" message from the iframe
    const handlePreviewReady = (event: MessageEvent) => {
      if (event.data.type === "PREVIEW_READY") {
        console.log("Preview signaled READY. Sending initial data...")
        sendToIframe()
      }
    }

    window.addEventListener("message", handlePreviewReady)

    // Also send data whenever formData changes (as before)
    sendToIframe()

    return () => window.removeEventListener("message", handlePreviewReady)
  }, [formData]) // Runs whenever typing happens OR when "Ready" signal is received

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks, // 1. Keep all existing links
        [platform]: value, // 2. Only update the one that changed
      },
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/website-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Settings saved successfully!")
      } else {
        throw new Error("Failed to save")
      }
    } catch (error) {
      alert("Error saving settings. Check console.")
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar Form */}
      <div className="w-80 space-y-4 border-r bg-white p-6">
        <h2 className="text-xl font-bold">General Settings</h2>

        <div>
          <label className="block text-sm">Site Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block text-sm">Primary Color</label>
          <input
            type="color"
            name="primaryColor"
            value={formData.primaryColor}
            onChange={handleChange}
            className="mt-1 h-10 w-full"
          />
        </div>
        {/* Inside your Admin Page return statement */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Home Page Content</h3>
          <textarea
            name="description" // Make sure this matches the key in your formData state
            value={formData.description}
            onChange={handleChange}
            className="mt-1 h-24 w-full rounded border p-2 text-sm"
            placeholder="Enter site description..."
          />
          // The JSX for your Social Inputs
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Social Media</label>

            <input
              placeholder="Facebook URL"
              value={formData.socialLinks.facebook}
              onChange={(e) => handleSocialChange("facebook", e.target.value)}
              className="w-full rounded border p-2 text-sm"
            />

            <input
              placeholder="Instagram URL"
              value={formData.socialLinks.instagram}
              onChange={(e) => handleSocialChange("instagram", e.target.value)}
              className="w-full rounded border p-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-gray-100 p-10">
        <div className="h-full w-full overflow-hidden rounded-lg bg-white shadow-lg">
          <iframe
            id="preview-frame"
            ref={iframeRef}
            src="/preview"
            className="h-full w-full border-none"
            onLoad={() => sendToIframe()} // Sync immediately when iframe loads
          />
        </div>
      </div>
    </div>
  )
}
