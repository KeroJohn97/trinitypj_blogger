"use client"

import { PageHeader } from "@/components/page-header"
import { ministries } from "@/lib/ministries-data"
import MinistriesPage from "app/[lang]/app-components/ministries-component"
import KindergartenPage from "app/[lang]/ministries-groups/kindergarten"
import AdultFellowshipPage from "app/[lang]/ministries-groups/methodist-adult-fellowship"
import SeniorPage from "app/[lang]/ministries-groups/methodist-senior-fellowship"
import MethodistWomenPage from "app/[lang]/ministries-groups/methodist-women"
import MYFPage from "app/[lang]/ministries-groups/methodist-youth-fellowship"
import { Layers3, Users } from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"

// --- Types ---
interface GroupData {
  id: number
  name: string
  time: string
  location: string
  // Add other fields if present in dictionary items (image, etc.)
  image?: string
  description?: string
  leader?: string
}

interface DictionaryProps {
  header: { title: string; subtitle: string }
  tabs: { ministries: string; groups: string }
  groupsTab: {
    title: string
    subtitle: string
    emptyState: { title: string; desc: string }
  }
  ministriesTab: { title: string; subtitle: string }
  groupsData: GroupData[]
}

interface GroupsTopicCloudProps {
  dict: DictionaryProps
}

/* --------------------------- COMPONENT MAP --------------------------- */
// Note: We type this loosely as 'any' for props to avoid complex type drilling for now
const ComponentMap: Record<number, React.FC<any>> = {
  1: SeniorPage,
  2: AdultFellowshipPage,
  3: MethodistWomenPage,
  4: MYFPage,
  5: KindergartenPage,
}

/* ------------------------ GROUP DETAIL PANEL ------------------------ */
const GroupDetailPanel = React.forwardRef<
  HTMLDivElement,
  { group: GroupData | undefined; emptyStateText: { title: string; desc: string } }
>(({ group, emptyStateText }, ref) => {
  if (!group) {
    return (
      <div
        ref={ref}
        className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-300 bg-gray-100 p-8 text-center"
      >
        <Users className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-2xl font-bold text-gray-700">{emptyStateText.title}</h3>
        <p className="mt-2 text-gray-500">{emptyStateText.desc}</p>
      </div>
    )
  }

  const Component = ComponentMap[group.id]

  return (
    <div ref={ref} className="w-full rounded-xl bg-white shadow-xl">
      {/* We pass the dictionary group data into the sub-component */}
      {Component && <Component group={group} />}
    </div>
  )
})
GroupDetailPanel.displayName = "GroupDetailPanel"

/* -------------------------- GROUPS TAB CONTENT -------------------------- */
const GroupsTabContent = ({ groups, text }: { groups: GroupData[]; text: DictionaryProps["groupsTab"] }) => {
  const [activeGroupId, setActiveGroupId] = useState<number | null>(groups.length > 0 ? groups[0]!.id : null)

  const detailPanelRef = useRef<HTMLDivElement>(null)

  const activeGroup = useMemo(() => groups.find((g) => g.id === activeGroupId), [activeGroupId, groups])

  // Auto-scroll on mobile
  useEffect(() => {
    if (window.innerWidth < 1024 && detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeGroupId])

  return (
    <div className="mt-8 flex flex-col gap-6 lg:flex-row">
      {/* LEFT COLUMN */}
      <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:p-6 lg:w-1/3">
        <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">{text.title}</h3>
        <p className="mb-4 text-xs text-gray-500">{text.subtitle}</p>

        <div className="space-y-2">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              className={`w-full rounded-lg p-3 text-left transition ${
                activeGroupId === group.id
                  ? "border-l-4 border-emerald-600 bg-emerald-100 font-semibold text-emerald-800 shadow"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full lg:w-2/3">
        <GroupDetailPanel ref={detailPanelRef} group={activeGroup} emptyStateText={text.emptyState} />
      </div>
    </div>
  )
}

/* --------------------------- MINISTRIES TAB --------------------------- */
const MinistriesTabContent = ({ text }: { text: DictionaryProps["ministriesTab"] }) => {
  return (
    <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">{text.title}</h3>
      <p className="mb-4 text-xs text-gray-500">{text.subtitle}</p>
      {/* Assuming MinistriesPage handles its own data or is static for now */}
      <MinistriesPage ministries={ministries} />
    </div>
  )
}

/* ---------------------------- MAIN COMPONENT ---------------------------- */
const GroupsTopicCloud = ({ dict }: GroupsTopicCloudProps) => {
  const [activeTab, setActiveTab] = useState("ministries") // Use keys "ministries" | "groups"

  const tabs = [
    {
      id: "ministries",
      label: dict.tabs.ministries,
      icon: Layers3,
      content: <MinistriesTabContent text={dict.ministriesTab} />,
    },
    {
      id: "groups",
      label: dict.tabs.groups,
      icon: Users,
      content: <GroupsTabContent groups={dict.groupsData} text={dict.groupsTab} />,
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
