"use client"

import { PageHeader } from "@/components/page-header"

import MinistriesPage from "app/[lang]/(user)/app-components/ministries-component"
import KindergartenPage from "app/[lang]/(user)/ministries-groups/kindergarten"
import AdultFellowshipPage from "app/[lang]/(user)/ministries-groups/methodist-adult-fellowship"
import SeniorPage from "app/[lang]/(user)/ministries-groups/methodist-senior-fellowship"
import MethodistWomenPage from "app/[lang]/(user)/ministries-groups/methodist-women"
import MYFPage from "app/[lang]/(user)/ministries-groups/methodist-youth-fellowship"
import { Layers3, Users, LayoutGrid } from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChurchGroup, CommunityEntity, Ministry } from "@/lib/interface"
import CommunityCard from "@/components/CommunityCard"
import { motion, AnimatePresence } from "framer-motion"

// --- Types ---

interface DictionaryProps {
  header: { title: string; subtitle: string }
  tabs: { ministries: string; groups: string }
  groupsTab: {
    title: string
    subtitle: string
    emptyState: { title: string; desc: string }
  }
  ministriesTab: { title: string; subtitle: string }
  groupsData: any[]
}

interface GroupsTopicCloudProps {
  dict: DictionaryProps
  ministries: CommunityEntity[]
  groupsData?: CommunityEntity[]
}

/* --------------------------- COMPONENT MAP --------------------------- */
// Note: We type this loosely as 'any' for props to avoid complex type drilling for now
const ComponentMap: Record<string, React.FC<any>> = {
  "methodist-senior-fellowship": SeniorPage,
  "methodist-adult-fellowship": AdultFellowshipPage,
  "methodist-women": MethodistWomenPage,
  "methodist-youth-fellowship": MYFPage,
  "trinity-kindergarten": KindergartenPage,
}

/* ------------------------ GROUP DETAIL PANEL ------------------------ */
const GroupDetailPanel = React.forwardRef<
  HTMLDivElement,
  { group: CommunityEntity | undefined; emptyStateText: { title: string; desc: string } }
>(({ group, emptyStateText }, ref) => {
  if (!group) {
    return (
      <div
        ref={ref}
        className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border-4 border-dashed border-slate-200 bg-slate-50 p-8 text-center"
      >
        <LayoutGrid className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-2xl font-black tracking-tight text-slate-700">{emptyStateText.title}</h3>
        <p className="mt-2 text-sm font-medium text-slate-400">{emptyStateText.desc}</p>
      </div>
    )
  }

  const Component = group?.slug ? ComponentMap[group.slug] : null

  return (
    <div ref={ref} className="w-full space-y-6">
      {/* Dynamic Summary Card */}
      <CommunityCard entity={group} />
      
      {/* Rich Detail View (Legacy Pages) */}
      {Component && (
        <div className="overflow-hidden rounded-[24px] bg-white shadow-xl ring-1 ring-slate-100">
          <Component group={group} />
        </div>
      )}
    </div>
  )
})
GroupDetailPanel.displayName = "GroupDetailPanel"

/* -------------------------- GROUPS TAB CONTENT -------------------------- */
const GroupsTabContent = ({ groups, text }: { groups: CommunityEntity[]; text: DictionaryProps["groupsTab"] }) => {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(groups.length > 0 ? groups[0]!.id : null)

  const detailPanelRef = useRef<HTMLDivElement>(null)

  const activeGroup = useMemo(() => groups.find((g) => g.id === activeGroupId), [activeGroupId, groups])

  // Auto-scroll on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeGroupId])

  return (
    <div className="mt-12 flex flex-col gap-8 lg:flex-row">
      {/* LEFT COLUMN: Sidebar Selection */}
      <div className="w-full space-y-6 lg:w-80">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900">{text.title}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {groups.map((group) => (
            <CommunityCard
              key={group.id}
              entity={group}
              variant="compact"
              isActive={activeGroupId === group.id}
              onClick={() => setActiveGroupId(group.id)}
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Detail View */}
      <div className="flex-1">
        <GroupDetailPanel ref={detailPanelRef} group={activeGroup} emptyStateText={text.emptyState} />
      </div>
    </div>
  )
}

/* --------------------------- MINISTRIES TAB --------------------------- */
const MinistriesTabContent = ({ text, ministries }: { text: DictionaryProps["ministriesTab"]; ministries: any[] }) => {
  return (
    <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">{text.title}</h3>
      <p className="mb-4 text-xs text-gray-500">{text.subtitle}</p>
      {/* MinistriesPage handles its own data or is dynamic */}
      <MinistriesPage ministries={ministries} />
    </div>
  )
}

/* ---------------------------- MAIN COMPONENT ---------------------------- */
const GroupsTopicCloud = ({ dict, ministries, groupsData = [] }: GroupsTopicCloudProps) => {
  const [activeTab, setActiveTab] = useState("ministries") // Use keys "ministries" | "groups"

  const displayGroups = useMemo(() => {
    // If we have groupsData from DB, use it, otherwise fallback to dict (for backwards compatibility during migration)
    return groupsData.length > 0 ? groupsData : (dict.groupsData as unknown as ChurchGroup[]);
  }, [groupsData, dict.groupsData]);

  const tabs = [
    {
      id: "ministries",
      label: dict.tabs.ministries,
      icon: Layers3,
      content: <MinistriesTabContent text={dict.ministriesTab} ministries={ministries} />,
    },
    {
      id: "groups",
      label: dict.tabs.groups,
      icon: Users,
      content: <GroupsTabContent groups={displayGroups} text={dict.groupsTab} />,
    },
  ]

  const currentTab = tabs.find((t) => t.id === activeTab)

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title={dict.header.title} subtitle={dict.header.subtitle} />
      <div className="min-h-screen bg-gray-50 p-4 font-[Inter] md:p-8 lg:p-12">
        {/* TABS */}
        <div className="mx-auto max-w-7xl border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* TAB CONTENT */}
        <div className="mx-auto w-full max-w-full min-w-[275px] px-4 py-6 sm:max-w-3xl sm:px-2 lg:max-w-5xl lg:px-4 xl:max-w-7xl">
          {currentTab?.content}
        </div>
      </div>
    </div>
  )
}

export default GroupsTopicCloud
