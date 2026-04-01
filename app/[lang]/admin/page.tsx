"use client"
import { useEffect, useState } from "react"
// ... Import other editors as you build them
import { websiteService } from "@/services/website-service"
import { DEFAULT_SITE_DATA } from "@/types/defaults"
import { SiteData } from "@/types/website"
import AboutUsEditor from "components/admin/editors/AboutUsEditor"
import AlphaVideoEditor from "components/admin/editors/AlphaVideoEditor"
import AnnouncementsEditor from "components/admin/editors/AnnouncementsEditor"
import BulletinEditor from "components/admin/editors/BulletinEditor"
import GeneralSettingsEditor from "components/admin/editors/GeneralSettingsEditor"
import GivingEditor from "components/admin/editors/GivingEditor"
import InfographicEditor from "components/admin/editors/InfographicEditor"
import PrayerGatheringEditor from "components/admin/editors/PrayerGatheringEditor"
import ServiceTimesEditor from "components/admin/editors/ServiceTimesEditor"
import SmallGroupsEditor from "components/admin/editors/SmallGroupsEditor"
import SpecialAlertsEditor from "components/admin/editors/SpecialAlertsEditor"
import VisionEditor from "components/admin/editors/VisionEditor"
import Sidebar from "components/admin/Sidebar"
import { Loader2, Monitor, Smartphone } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general")
  const [siteData, setSiteData] = useState<SiteData>(DEFAULT_SITE_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("desktop")

  // 1. Initial Fetch from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        const data = await websiteService.getSettings()
        if (data) setSiteData(data)
      } catch (err) {
        console.error("Fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // 2. The Switcher: Decides which "Form" to show
  const renderEditor = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 flex-col items-center justify-center text-gray-400">
          <Loader2 className="mb-4 animate-spin" size={32} />
          <p className="text-sm font-medium">Fetching Trinity Methodist Church data...</p>
        </div>
      )
    }

    // Ensure siteData isn't null before rendering sub-components
    if (!siteData) return null

    switch (activeTab) {
      // --- Brand & Identity ---
      case "general":
        return <GeneralSettingsEditor initialData={siteData} />
      case "about":
        return <AboutUsEditor initialData={siteData.aboutUsMarkdown} />
      case "vision":
        return <VisionEditor />

      // --- Weekly Pulse ---
      case "services":
        return <ServiceTimesEditor initialData={siteData.serviceTimes} />
      case "alerts":
        return <SpecialAlertsEditor initialData={siteData.alert} />
      case "bulletin":
        return <BulletinEditor initialData={siteData.bulletinUrl} />
      case "announcements":
        return <AnnouncementsEditor />

      // --- Community Life ---
      case "groups":
        return <SmallGroupsEditor />
      case "prayer":
        return <PrayerGatheringEditor initialData={[]} />

      // --- Resources ---
      case "alpha":
        return <AlphaVideoEditor />
      case "infographics":
        return (
          <div className="space-y-8">
            <InfographicEditor title="Ministries Infographic" currentUrl={siteData.infographics.ministriesUrl} />
            <InfographicEditor title="Fellowships Infographic" currentUrl={siteData.infographics.groupsUrl} />
          </div>
        )
      case "giving":
        return <GivingEditor />

      // --- Default / Coming Soon ---
      default:
        return (
          <div className="rounded-2xl border-2 border-dashed p-12 text-center">
            <p className="text-gray-400">
              The <b>{activeTab}</b> editor is coming soon!
            </p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* LEFT: Sidebar Navigation */}
      <Sidebar activeSlug={activeTab} onSelect={setActiveTab} />

      {/* CENTER: The Workspace */}
      <main className="flex min-w-0 flex-1 flex-col border-r bg-white">
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white/50 px-8 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
              Draft
            </span>
            <h1 className="text-sm font-semibold tracking-tight text-gray-600 uppercase">
              / {activeTab.replace("-", " ")}
            </h1>
          </div>

          {/* Quick Preview Toggles (Visible on Mid-screens) */}
          <div className="flex rounded-lg bg-gray-100 p-1 lg:hidden">
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`rounded p-1.5 ${previewMode === "mobile" ? "bg-white shadow-sm" : ""}`}
            >
              <Smartphone size={16} />
            </button>
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`rounded p-1.5 ${previewMode === "desktop" ? "bg-white shadow-sm" : ""}`}
            >
              <Monitor size={16} />
            </button>
          </div>
        </header>

        <section className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-8 lg:p-12">{renderEditor()}</div>
        </section>
      </main>

      {/* RIGHT: Live Preview Pane */}
      {/*
        <aside className="hidden w-[400px] flex-col bg-gray-50 xl:flex 2xl:w-[500px]">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">Live Preview</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`rounded-md p-2 transition-all ${previewMode === "mobile" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-100"}`}
            >
              <Smartphone size={18} />
            </button>
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`rounded-md p-2 transition-all ${previewMode === "desktop" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-100"}`}
            >
              <Monitor size={18} />
            </button>
          </div>
        </header>

        <div className="flex flex-1 items-start justify-center overflow-hidden p-6">
          <div
            className={`overflow-hidden rounded-t-3xl border-[8px] border-gray-800 bg-white shadow-2xl transition-all duration-500 ${
              previewMode === "mobile" ? "h-[600px] w-[320px]" : "h-full w-full border-t-[12px]"
            }`}
          >
            <iframe
              src="/" // Points to your public homepage
              className="h-full w-full border-none"
              title="Preview"
            />
          </div>
        </div>
      </aside>
        */}
    </div>
  )
}
