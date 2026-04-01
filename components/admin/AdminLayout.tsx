"use client"
import { websiteService } from "@/services/website-service"
import { SiteData } from "@/types/website"
import { useEffect, useState } from "react"
import GeneralSettingsEditor from "./editors/GeneralSettingsEditor"
import ServiceTimesEditor from "./editors/ServiceTimesEditor"
import SpecialAlertsEditor from "./editors/SpecialAlertsEditor"
import Sidebar from "./Sidebar"

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("general")
  const [siteData, setSiteData] = useState<SiteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load all church data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await websiteService.getSettings()
        if (data) setSiteData(data)
      } catch (error) {
        console.error("Failed to load CMS data", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // The Dynamic Workspace Switcher
  const renderEditor = () => {
    if (isLoading) return <div className="animate-pulse p-10 text-gray-400">Loading Church Data...</div>

    switch (activeTab) {
      case "general":
        return <GeneralSettingsEditor initialData={siteData} />
      case "services":
        return <ServiceTimesEditor initialData={siteData?.serviceTimes} />
      case "alerts":
        return <SpecialAlertsEditor initialData={siteData} />
      // Add cases for all 12 items here...
      default:
        return <div className="p-10 text-gray-400">Select a section from the sidebar to begin.</div>
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* 1. Permanent Sidebar */}
      <Sidebar activeSlug={activeTab} onSelect={setActiveTab} />

      {/* 2. Main Editing Workspace */}
      <main className="flex h-full flex-1 flex-col overflow-hidden bg-white shadow-inner">
        {/* Workspace Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-8 backdrop-blur-md">
          <h2 className="font-semibold text-gray-700 capitalize">Editing: {activeTab.replace("-", " ")}</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Auto-save is disabled. Click "Publish" to go live.</span>
          </div>
        </header>

        {/* Editor Container */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">{renderEditor()}</div>
      </main>

      {/* 3. Live Preview (Visible on Desktop) */}
      {/* <div className="hidden 2xl:block w-[450px] border-l bg-gray-100">
        <LivePreview formData={siteData} />
      </div> */}
    </div>
  )
}
