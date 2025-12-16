"use client"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
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

interface GroupDetailPanelProps {
  group: {
    id: number
    name: string
    time: string
    location: string
    image: string
    description: string
    leader: string
  }
  // Add any other props here
}

interface SpecializedComponentProps {
  group: GroupDetailPanelProps
}

type ComponentMapType = {
  [key: number]: React.FC<SpecializedComponentProps>
}

/* --------------------------- COMPONENT MAP --------------------------- */
const ComponentMap: ComponentMapType = {
  1: SeniorPage,
  2: AdultFellowshipPage,
  3: MethodistWomenPage,
  4: MYFPage,
  5: KindergartenPage,
}

/* --------------------------- MOCK DATA --------------------------- */
const groupsData = [
  {
    id: 1,
    name: "Methodist Senior Fellowship",
    time: "Saturday, 11:00 AM",
    location: "TLS Sanctuary Activity Room",
    image: "",
    description: "",
    leader: "",
  },
  {
    id: 2,
    name: "Methodist Adult Fellowship",
    time: "Fridays, 10:00 AM",
    location: "Church Library",
    image: "",
    description: "",
    leader: "",
  },
  {
    id: 3,
    name: "Methodist Women",
    time: "Saturdays, 8:00 AM",
    location: "Fellowship Hall",
    image: "",
    description: "",
    leader: "",
  },
  {
    id: 4,
    name: "Methodist Youth Fellowship",
    time: "Thursdays, 6:30 PM",
    location: "Zoom & In-Person",
    image: "",
    description: "",
    leader: "",
  },
  {
    id: 5,
    name: "Kindergarten",
    time: "Sundays, 12:30 PM",
    location: "Church Annex 101",
    image: "",
    description: "",
    leader: "",
  },
]

/* ------------------------ GROUP DETAIL PANEL ------------------------ */
const GroupDetailPanel = React.forwardRef<HTMLDivElement, { group: any }>(({ group }, ref) => {
  if (!group) {
    return (
      <div
        ref={ref}
        className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-300 bg-gray-100 p-8 text-center"
      >
        <Users className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-2xl font-bold text-gray-700">Select a Group</h3>
        <p className="mt-2 text-gray-500">Choose a group from the left to view more details.</p>
      </div>
    )
  }

  const Component = ComponentMap[group.id]

  return (
    <div ref={ref} className="w-full rounded-xl bg-white shadow-xl">
      {Component && <Component group={group} />}
    </div>
  )
})
GroupDetailPanel.displayName = "GroupDetailPanel"

/* -------------------------- GROUPS TAB CONTENT -------------------------- */
const GroupsTabContent = () => {
  const [activeGroupId, setActiveGroupId] = useState(groupsData.length > 0 ? groupsData[0]!.id : null)

  const detailPanelRef = useRef<HTMLDivElement>(null)

  const activeGroup = useMemo(() => groupsData.find((g) => g.id === activeGroupId), [activeGroupId])

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
        <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">Group Directory</h3>
        <p className="mb-4 text-xs text-gray-500">Click a group to view its details.</p>

        <div className="space-y-2">
          {groupsData.map((group) => (
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
        <GroupDetailPanel ref={detailPanelRef} group={activeGroup} />
      </div>
    </div>
  )
}

/* --------------------------- MINISTRIES TAB --------------------------- */
const MinistriesTabContent = () => {
  return (
    <div className="mt-8 flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">Church Ministry</h3>
      <p className="mb-4 text-xs text-gray-500">Click a ministry to view details.</p>
      <MinistriesPage ministries={ministries} />
    </div>
  )
}

/* ---------------------------- MAIN COMPONENT ---------------------------- */
const GroupsTopicCloud = () => {
  const [activeTab, setActiveTab] = useState("Ministries")

  const tabs = [
    { name: "Ministries", icon: Layers3, content: <MinistriesTabContent /> },
    { name: "Groups", icon: Users, content: <GroupsTabContent /> },
  ]

  const currentTab = tabs.find((t) => t.name === activeTab)

  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <PageHeader title="Ministries & Groups" subtitle="Find your place to connect, serve, and grow" />
      <div className="min-h-screen bg-gray-50 p-4 font-[Inter] md:p-8 lg:p-12">
        {/* TABS */}
        <div className="mx-auto max-w-7xl border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.name === activeTab
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`inline-flex items-center border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? "border-emerald-600 text-emerald-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {tab.name}
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
      <Footer />
    </div>
  )
}

export default GroupsTopicCloud
