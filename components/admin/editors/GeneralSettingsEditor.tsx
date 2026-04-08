"use client"
import { websiteService } from "@/services/website-service"
import { DEFAULT_SITE_DATA } from "@/types/defaults"
import { SiteData } from "@/types/website"
import ImagePicker from "components/ImagePicker"
import { Loader2, Palette, Save, Share2 } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function GeneralSettingsEditor({ initialData }: { initialData: SiteData | null }) {
  const [formData, setFormData] = useState<SiteData>(initialData || DEFAULT_SITE_DATA)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Standard Text Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Nested Social Links Change
  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  // Logo Upload Flow
  const handleLogoChange = async (assetId: string) => {
    // 1. Update the local UI state immediately so the user sees the change
    const updatedData = { ...formData, logo_image_id: assetId }
    setFormData(updatedData)

    // 2. Persist the change to the database
    // We save immediately so the Logo ID is locked into your site_settings table
    setIsSaving(true)
    try {
      await websiteService.saveSettings(updatedData)
      console.log("Logo reference updated successfully")
    } catch (error) {
      console.error("Failed to save settings after logo update:", error)
      alert("Settings sync failed. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await websiteService.saveSettings(formData)
      alert("General settings published successfully!")
    } catch (error) {
      alert("Error saving settings.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      {/* Header with Save Button */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">General Settings</h2>
          <p className="text-sm text-gray-500">Update your church's name, branding, and social links.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving || isUploading}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 font-bold text-white shadow-md transition-all hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? "Publishing..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Section 1: Visual Identity */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            <Palette size={16} /> <span>Visual Identity</span>
          </div>

          {/* Logo Upload Box */}
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
            <ImagePicker
              label="Cover Image"
              value={"logo"} // Foreign key to media_assets
              onChange={handleLogoChange}
              bucket="brand-assets" // Specific folder in Supabase
            />
          </div>

          {/* Primary Color */}
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <label className="mb-2 block text-sm font-semibold text-gray-700">Theme Primary Color</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border-none"
              />
              <code className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm text-gray-600">
                {formData.primaryColor.toUpperCase()}
              </code>
            </div>
          </div>
        </div>

        {/* Section 2: Site Info & Social */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            <Share2 size={16} /> <span>Site Information</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-gray-400 uppercase">Church Name / Site Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Trinity Methodist Church PJ"
                className="w-full rounded-xl border p-3 transition-all outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-gray-400 uppercase">Footer / SEO Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A short welcome message..."
                className="h-24 w-full rounded-xl border p-3 transition-all outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-3 pt-4">
              <label className="block text-xs font-bold text-gray-400 uppercase">Social Media Links</label>
              <input
                placeholder="Facebook URL"
                value={formData.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                placeholder="Instagram URL"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleSocialChange("instagram", e.target.value)}
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <input
                placeholder="YouTube URL"
                value={formData.socialLinks.youtube}
                onChange={(e) => handleSocialChange("youtube", e.target.value)}
                className="w-full rounded-lg border p-2.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
