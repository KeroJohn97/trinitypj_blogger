"use client"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { cn } from "@/lib/utils"
import { websiteService } from "@/services/website-service"
import { DEFAULT_SITE_DATA } from "@/types/website"
import ImagePicker from "components/ImagePicker"
import { AlertCircle, CheckCircle2, Facebook, Globe, Instagram, Loader2, Palette, Save, Youtube } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"

export default function GeneralSettingsEditor() {
  // 1. Initialize with Defaults
  const [formData, setFormData] = useState<any>(DEFAULT_SITE_DATA)
  const [originalData, setOriginalData] = useState<any>(DEFAULT_SITE_DATA)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // 2. Fetch Data on Mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true)
        const data = await websiteService.getSettings()

        if (data) {
          // IMPORTANT: We set BOTH at the same time so isDirty starts as FALSE
          setFormData(data)
          setOriginalData(data)
        }
      } catch (error) {
        console.error("Fetch settings error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  // 3. DIRTY STATE & NAVIGATION GUARD
  const { setIsDirty } = useNavigationGuard()

  const isDirty = useMemo(() => {
    // This will be false initially because formData and originalData 
    // are updated simultaneously in the useEffect above.
    return JSON.stringify(formData) !== JSON.stringify(originalData)
  }, [formData, originalData])

  useEffect(() => {
    setIsDirty(isDirty)
    return () => setIsDirty(false)
  }, [isDirty, setIsDirty])

  // 4. HANDLERS
  const updateField = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await websiteService.saveSettings(formData)
      // Reset originalData to the CURRENT formData to clear the dirty state
      setOriginalData(formData)
      console.log("Settings published")
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-200" />
      </div>
    )
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl space-y-8 px-4 py-6 duration-700 md:px-0 md:py-10">
      {/* RESPONSIVE ELITE HEADER */}
      <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">General Settings</h2>
            {isDirty && (
              <span className="flex animate-pulse items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-black tracking-widest text-amber-600 uppercase ring-1 ring-amber-200">
                <AlertCircle size={12} /> Unsaved Changes
              </span>
            )}
            {!isDirty && formData.title && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black tracking-widest text-emerald-600 uppercase ring-1 ring-emerald-100">
                <CheckCircle2 size={12} /> Live & Synced
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-slate-500">Global configuration for church branding and SEO.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className={cn(
            "flex items-center justify-center gap-3 rounded-[20px] px-10 py-4 text-sm font-bold text-white shadow-xl transition-all active:scale-95 disabled:opacity-30",
            isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900"
          )}
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? "Publishing..." : isDirty ? "Publish Changes" : "Already Published"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* LEFT COLUMN: Visuals */}
        <div className="space-y-8 lg:col-span-5">
          <SectionHeader icon={<Palette size={18} />} title="Visual Identity" />

          <div className="space-y-6">
            <ImagePicker
              label="Logo / Brand Asset"
              value={formData.logo_image_id}
              onChange={(id) => updateField("logo_image_id", id)}
              bucket="brand-assets"
            />

            <div className="rounded-[32px] bg-slate-50/50 p-6 ring-1 ring-slate-100 md:p-8">
              <label className="mb-4 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Theme Accent Color
              </label>
              <div className="flex items-center gap-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-[20px] shadow-inner ring-4 ring-white">
                  <input
                    type="color"
                    value={formData.primaryColor || "#10b981"}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="absolute inset-0 h-[150%] w-[150%] -translate-x-2 -translate-y-2 cursor-pointer border-none"
                  />
                </div>
                <div className="space-y-1">
                  <code className="text-base font-black tracking-tight text-slate-900 uppercase">
                    {formData.primaryColor}
                  </code>
                  <p className="text-[10px] font-bold text-slate-400">Main brand interaction color</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Info & Socials */}
        <div className="space-y-8 lg:col-span-7">
          <SectionHeader icon={<Globe size={18} />} title="Site Information" />

          <div className="space-y-6 rounded-[32px] bg-white p-2 shadow-sm ring-1 ring-slate-100">
            <div className="space-y-6 p-5 md:p-8">
              <CustomInput
                label="Site Title"
                value={formData.title}
                onChange={(v: any) => updateField("title", v)}
                placeholder="e.g. Trinity Methodist Church PJ"
              />

              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                  SEO Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={4}
                  className="w-full rounded-[24px] bg-slate-50 px-5 py-4 text-sm font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:ring-emerald-500/5"
                  placeholder="Describe your church for search engines..."
                />
              </div>
            </div>

            {/* Social Presence Section */}
            <div className="rounded-b-[30px] border-t border-slate-50 bg-slate-50/30 p-6 md:p-8">
              <label className="mb-6 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Social Presence
              </label>
              <div className="space-y-4">
                <SocialInput
                  icon={<Facebook size={18} />}
                  platform="Facebook"
                  value={formData.socialLinks?.facebook}
                  onChange={(v: any) => handleSocialChange("facebook", v)}
                />
                <SocialInput
                  icon={<Instagram size={18} />}
                  platform="Instagram"
                  value={formData.socialLinks?.instagram}
                  onChange={(v: any) => handleSocialChange("instagram", v)}
                />
                <SocialInput
                  icon={<Youtube size={18} />}
                  platform="Youtube"
                  value={formData.socialLinks?.youtube}
                  onChange={(v: any) => handleSocialChange("youtube", v)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- SUB-COMPONENTS ---

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 text-emerald-600">
    <div className="rounded-2xl bg-emerald-50 p-2.5 shadow-sm shadow-emerald-100/50">{icon}</div>
    <span className="text-[11px] font-black tracking-[0.2em] uppercase">{title}</span>
  </div>
)

const CustomInput = ({ label, value, onChange, placeholder }: any) => (
  <div className="space-y-2">
    <label className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl bg-slate-50 px-5 py-4 text-sm font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:ring-emerald-500/5"
    />
  </div>
)

const SocialInput = ({ icon, platform, value, onChange }: any) => (
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-100 transition-colors group-focus-within:text-emerald-500">
      {icon}
    </div>
    <div className="group relative w-full">
      <input
        placeholder={`${platform} URL`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border-none bg-white/60 px-5 py-3 text-xs font-bold transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5"
      />
    </div>
  </div>
)
