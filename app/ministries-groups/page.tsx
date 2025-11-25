"use client"

import { ministries } from "@/lib/ministries-data"
import MinistriesPage from "app/app-components/ministries-component"
import KindergartenPage from "app/ministries-groups/kindergarten"
import AdultFellowshipPage from "app/ministries-groups/methodist-adult-fellowship"
import SeniorPage from "app/ministries-groups/methodist-senior-fellowship"
import MethodistWomenPage from "app/ministries-groups/methodist-women"
import MYFPage from "app/ministries-groups/methodist-youth-fellowship"
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

const ComponentMap: ComponentMapType = {
  1: SeniorPage,
  2: AdultFellowshipPage,
  3: MethodistWomenPage,
  4: MYFPage,
  5: KindergartenPage,
}

// --- MOCK DATA (Extended to 10 groups) ---
const groupsData = [
  {
    id: 1,
    name: "Methodist Senior Fellowship",
    time: "Saturday, 11:00 AM",
    location: "TLS Sanctuary Activity Room",
    image: "https://placehold.co/800x600/10b981/ffffff?text=Methodist+Youth+Fellowship",
    description:
      "Building community and faith among young professionals in the city. We meet weekly for study, mutual support, and planning service projects.",
    leader: "Mark H.",
  },
  {
    id: 2,
    name: "Methodist Adult Fellowship",
    time: "Fridays, 10:00 AM",
    location: "Church Library (Childcare Provided)",
    image: "https://placehold.co/800x600/f59e0b/ffffff?text=Women's+Study",
    description:
      "A deep dive into the book of Ruth, focusing on faith, resilience, and personal growth. Childcare is provided free of charge during the session.",
    leader: "Sarah P.",
  },
  {
    id: 3,
    name: "Methodist Women",
    time: "Saturdays, 8:00 AM",
    location: "Fellowship Hall",
    image: "https://placehold.co/800x600/3b82f6/ffffff?text=Men's+Service",
    description:
      "Starting the day with a hearty breakfast, followed by a short devotion and a local service project, typically involving light repairs or cleanup.",
    leader: "David K.",
  },
  {
    id: 4,
    name: "Methodist Youth Fellowship",
    time: "Thursdays, 6:30 PM",
    location: "Zoom & In-Person",
    image: "https://placehold.co/800x600/9333ea/ffffff?text=Parent+Support",
    description:
      "A safe and confidential space for parents of all ages to share challenges, exchange advice, and find encouragement in a Christ-centered environment.",
    leader: "Jessica M.",
  },
  {
    id: 5,
    name: "Kindergarten",
    time: "Sundays, 12:30 PM",
    location: "Church Annex, Room 101",
    image: "https://placehold.co/800x600/ef4444/ffffff?text=Newcomers",
    description:
      "Designed for those new to the area or new to our community. This group helps you connect with others and learn about our mission and ministries.",
    leader: "Tom & Lisa V.",
  },
]

// --- Detail Panel Component (Right Side) ---
const GroupDetailPanel = React.forwardRef<HTMLDivElement, GroupDetailPanelProps>(({ group }, ref) => {
  if (!group) {
    return (
      <div
        ref={ref}
        // Use min-h for visual appeal, but remove h-full to fit content
        className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-300 bg-gray-100 p-8 text-center"
      >
        <Users className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-2xl font-bold text-gray-700">Select a Group to View Details</h3>
        <p className="mt-2 text-gray-500">
          Click any group name from the list on the left to see its mission, schedule, and how to connect.
        </p>
      </div>
    )
  }

  const index: number = group.id
  const ComponentToRender: any = ComponentMap[index]

  return (
    <div
      ref={ref}
      // Change h-full to h-auto
      className="h-auto overflow-hidden rounded-xl bg-white shadow-2xl"
    >
      {ComponentToRender && <ComponentToRender />}
    </div>
  )
})
GroupDetailPanel.displayName = "GroupDetailPanel"

// --- Content for the Groups Tab ---
const GroupsTabContent = () => {
  const [activeGroupId, setActiveGroupId] = useState(groupsData.length > 0 ? groupsData[0]!.id : null)

  const activeGroup = useMemo(() => {
    return groupsData.find((group) => group.id === activeGroupId)
  }, [activeGroupId])

  const detailPanelRef = useRef<HTMLDivElement>(null)

  // Scroll logic for mobile devices
  useEffect(() => {
    if (activeGroupId !== null && detailPanelRef.current && window.innerWidth < 1024) {
      detailPanelRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeGroupId])

  return (
    // Removed fixed height constraints (lg:h-[70vh] and min-h-[500px])
    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Left Side: Topic Cloud / Navigation */}
      <div className="h-auto overflow-y-auto rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:p-6 lg:w-1/3 lg:self-start">
        <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">Group Directory</h3>
        <p className="mb-4 text-xs text-gray-500">Click a group name to load its details.</p>

        <div className="space-y-2">
          {groupsData.map((group) => {
            const isActive = group.id === activeGroupId
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-all duration-200 group-hover:bg-emerald-50 sm:p-4 ${
                  isActive
                    ? "border-l-4 border-emerald-600 bg-emerald-100 font-bold text-emerald-800 shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } `}
              >
                <span className="truncate text-sm sm:text-base">{group.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Side: Detail Panel */}
      {/* Removed lg:h-full */}
      <div className="h-auto lg:w-2/3">
        {activeGroup && <GroupDetailPanel ref={detailPanelRef} group={activeGroup} />}
      </div>
    </div>
  )
}

// --- Content for the Ministries Tab (Placeholder) ---
const MinistriesTabContent = () => {
  // Placeholder content for the second tab
  return (
    <div className="mt-8 flex h-auto min-h-[500px] flex-col items-center justify-center rounded-xl bg-white p-8 shadow-lg">
      <h3 className="mb-3 text-xl font-bold text-gray-800 sm:text-2xl">Church Ministry</h3>
      <p className="mb-4 text-xs text-gray-500">Click a ministry to load its details.</p>
      <MinistriesPage ministries={ministries} />
    </div>
  )
}

// --- Main Directory Component (Now the Tab Container) ---
const GroupsTopicCloud = () => {
  const [activeTab, setActiveTab] = useState("Groups")

  const tabs = [
    { name: "Ministries", icon: Layers3, content: <MinistriesTabContent /> },
    { name: "Groups", icon: Users, content: <GroupsTabContent /> },
  ]

  const renderContent = () => {
    const currentTab = tabs.find((t) => t.name === activeTab)
    return currentTab ? currentTab.content : null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-[Inter] md:p-8 lg:p-12">
      {/* FIX: Removed non-standard 'jsx' and 'global' attributes from the <style> tag */}
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>

      {/* Header */}
      <div className="mx-auto mb-8 max-w-7xl lg:mb-4">
        <h1 className="mb-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Ministries & Groups</h1>
        <p className="text-base text-gray-600 sm:text-lg">Find your place to connect, serve, and grow.</p>
      </div>

      {/* Tab Bar Navigation */}
      <div className="mx-auto max-w-7xl border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.name
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`inline-flex items-center border-b-2 px-1 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } `}
              >
                <Icon className="mr-2 h-5 w-5" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-7xl">{renderContent()}</div>
    </div>
  )
}

export default GroupsTopicCloud
