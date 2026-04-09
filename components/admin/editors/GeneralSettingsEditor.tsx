"use client"
import { websiteService } from "@/services/website-service"
import { SiteData } from "@/types/website"
import ImagePicker from "components/ImagePicker"
import { Facebook, Globe, Instagram, Loader2, Palette, Save, Youtube } from "lucide-react"
import React, { useEffect, useState } from "react"

// Assuming a default state if no data exists
const DEFAULT_SITE_DATA: SiteData = {
  title: "",
  description: "",
  primaryColor: "#10b981",
  logo_image_id: "",
  socialLinks: { facebook: "", instagram: "", youtube: "" },
  serviceTimes: [],
  bulletinUrl: "",
  announcements: [],
  aboutUsMarkdown: "",
  visionPillars: [],
  alphaVideos: [],
  smallGroups: [],
  infographics: {
    ministriesUrl: "",
    groupsUrl: "",
  },
  alert: {
    active: false,
    text: "",
    type: "info",
  },
  giving: {
    bankName: "string",
    accountName: "string",
    accountNumber: "string",
    portalUrl: "string",
    qrCodeUrl: "string",
  },
}

export default function GeneralSettingsEditor({ initialData }: { initialData: SiteData | null }) {
  const [formData, setFormData] = useState<SiteData>(initialData || DEFAULT_SITE_DATA)
  const [isLoading, setIsLoading] = useState(!initialData)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch data only if initialData wasn't provided by the server
  useEffect(() => {
    if (!initialData) {
      const loadSettings = async () => {
        try {
          const data = await websiteService.getSettings()
          if (data) setFormData(data)
        } catch (error) {
          console.error("Failed to fetch settings:", error)
        } finally {
          setIsLoading(false)
        }
      }
      loadSettings()
    }
  }, [initialData])

  const updateField = (key: keyof SiteData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSocialChange = (platform: keyof SiteData["socialLinks"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const handleLogoChange = async (assetId: string) => {
    const updated = { ...formData, logo_image_id: assetId }
    setFormData(updated)

    // Auto-save logo updates for better UX
    try {
      await websiteService.saveSettings(updated)
    } catch (e) {
      console.error("Logo auto-save failed", e)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await websiteService.saveSettings(formData)
      // Elite tip: Use a toast here instead of an alert
      console.log("Settings published successfully")
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-100" />
      </div>
    )
  }

  return (
    <div className="animate-in fade-in max-w-5xl space-y-12 pb-32 duration-700">
      {/* ELITE HEADER */}
      <div className="flex items-end justify-between border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">General Settings</h2>
          <p className="font-medium text-slate-500">Configure your church branding and global configuration.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="group flex items-center gap-3 rounded-[20px] bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? "Saving..." : "Publish Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* LEFT COLUMN: Visuals */}
        <div className="space-y-8 lg:col-span-5">
          <SectionHeader icon={<Palette size={18} />} title="Visual Identity" />

          <div className="space-y-6">
            <ImagePicker
              label="Logo / Brand Asset"
              value={formData.logo_image_id}
              onChange={handleLogoChange}
              bucket="brand-assets"
            />

            <div className="rounded-[32px] bg-slate-50/50 p-8 ring-1 ring-slate-100">
              <label className="mb-4 block text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                Theme Accent Color
              </label>
              <div className="flex items-center gap-6">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-inner ring-2 ring-white">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="absolute inset-0 h-[150%] w-[150%] -translate-x-2 -translate-y-2 cursor-pointer border-none"
                  />
                </div>
                <div className="space-y-1">
                  <code className="text-sm font-bold text-slate-900 uppercase">{formData.primaryColor}</code>
                  <p className="text-[10px] font-medium text-slate-400">Used for buttons and links</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Info & Socials */}
        <div className="space-y-8 lg:col-span-7">
          <SectionHeader icon={<Globe size={18} />} title="Site Information" />

          <div className="space-y-6 rounded-[32px] bg-white p-2 shadow-sm ring-1 ring-slate-100">
            <div className="space-y-4 p-6">
              <CustomInput
                label="Site Title"
                name="title"
                value={formData.title}
                onChange={(v: any) => updateField("title", v)}
                placeholder="e.g. Trinity Methodist Church PJ"
              />

              <div className="space-y-1.5">
                <label className="ml-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  SEO Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="h-32 w-full rounded-[24px] bg-slate-50 px-5 py-4 text-sm font-medium ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:ring-emerald-500/5"
                  placeholder="A short description for search engines..."
                />
              </div>
            </div>

            {/* Social Links Sub-grid */}
            <div className="rounded-b-[30px] border-t border-slate-50 bg-slate-50/30 p-8">
              <label className="mb-6 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Social Presence
              </label>
              <div className="space-y-3">
                <SocialInput
                  icon={<Facebook size={16} />}
                  platform="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleSocialChange}
                />
                <SocialInput
                  icon={<Instagram size={16} />}
                  platform="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleSocialChange}
                />
                <SocialInput
                  icon={<Youtube size={16} />}
                  platform="youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleSocialChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 text-emerald-600">
    <div className="rounded-xl bg-emerald-50 p-2">{icon}</div>
    <span className="text-sm font-black tracking-widest uppercase">{title}</span>
  </div>
)

const CustomInput = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-1.5">
    <label className="ml-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100"
    />
  </div>
)

const SocialInput = ({ icon, platform, value, onChange }: any) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-100">
      {icon}
    </div>
    <input
      placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
      value={value}
      onChange={(e) => onChange(platform, e.target.value)}
      className="flex-1 rounded-xl border-none bg-white/50 px-4 py-2.5 text-xs font-medium transition-all outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
    />
  </div>
)
