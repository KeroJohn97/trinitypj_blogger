"use client"
import { useEffect, useMemo, useState } from "react"
// ... Import other editors as you build them
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { websiteService } from "@/services/website-service"
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
import { AlertCircle, Loader2 } from "lucide-react"

// --- 1. Tab Registry (Easy to expand!) ---
const EDITOR_COMPONENTS: Record<string, React.FC<any>> = {
  // Brand
  general: (props) => <GeneralSettingsEditor initialData={props.data} />,
  about: (props) => <AboutUsEditor initialData={props.data?.aboutUsMarkdown} />,
  vision: () => <VisionEditor />,

  // Weekly Pulse
  services: (props) => <ServiceTimesEditor initialData={props.data?.serviceTimes} />,
  alerts: (props) => <SpecialAlertsEditor initialData={props.data?.alert} />,
  bulletin: (props) => <BulletinEditor initialData={props.data?.bulletinUrl} />,
  announcements: () => <AnnouncementsEditor />,

  // Community
  groups: () => <SmallGroupsEditor />,
  prayer: () => <PrayerGatheringEditor initialData={[]} />,

  // Resources
  alpha: () => <AlphaVideoEditor />,
  giving: () => <GivingEditor />,
  infographics: (props) => (
    <div className="space-y-8">
      <InfographicEditor title="Ministries" currentUrl={props.data?.infographics?.ministriesUrl} />
      <InfographicEditor title="Fellowships" currentUrl={props.data?.infographics?.groupsUrl} />
    </div>
  ),
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("general")
  const [siteData, setSiteData] = useState<SiteData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isDirty } = useNavigationGuard() // Listen to the guard we built!

  // Load Global Settings
  useEffect(() => {
    websiteService
      .getSettings()
      .then(setSiteData)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  // Memoize the breadcrumb title
  const displayTitle = useMemo(() => activeTab.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), [activeTab])

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 text-gray-400">
        <Loader2 className="mb-4 animate-spin text-blue-600" size={40} />
        <p className="text-sm font-bold tracking-widest uppercase">Loading TMCPJ Portal...</p>
      </div>
    )
  }

  const ActiveEditor = EDITOR_COMPONENTS[activeTab]

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar activeSlug={activeTab} onSelect={setActiveTab} />

      <main className="flex min-w-0 flex-1 flex-col bg-white">
        {/* SHARED HEADER */}
        <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 bg-white/50 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase transition-colors ${
                isDirty ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {isDirty ? <AlertCircle size={12} /> : null}
              {isDirty ? "Unsaved Changes" : "Live"}
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-xl font-light">/</span>
              <h1 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{displayTitle}</h1>
            </div>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <p className="text-[10px] font-bold text-gray-300 uppercase">Trinity Methodist Church PJ</p>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <section className="custom-scrollbar flex-1 overflow-y-auto bg-gray-50/30">
          <div className="mx-auto max-w-5xl p-8 lg:p-12">
            {ActiveEditor ? (
              <ActiveEditor data={siteData} />
            ) : (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-20 text-center">
                <p className="font-medium text-gray-400">
                  The <span className="font-bold text-gray-600">{displayTitle}</span> module is currently under
                  maintenance.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
