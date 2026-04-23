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
import { cn } from "@/lib/utils"

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
        className="flex min-h-[450px] flex-col items-center justify-center rounded-[32px] border-4 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-slate-100">
          <LayoutGrid className="h-10 w-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-slate-800">{emptyStateText.title}</h3>
        <p className="mt-3 max-w-xs text-sm font-bold leading-relaxed text-slate-500">{emptyStateText.desc}</p>
      </div>
    )
  }

  const Component = group?.slug ? ComponentMap[group.slug] : null

  return (
    <div ref={ref} className="w-full">
      {/* Integrated Detail View */}
      <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100">
        {/* Detail Content (Legacy Pages or dynamic data) */}
        {Component ? (
          <div className="legacy-component-wrapper">
             <Component group={group} isNested={true} />
          </div>
        ) : (
          <div className="p-8 md:p-12">
             <CommunityCard entity={group} variant="detailed" />
          </div>
        )}
      </div>
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
    <div className="mt-4 flex flex-col gap-10 lg:flex-row">
      {/* LEFT COLUMN: Sidebar Selection (Desktop) / Horizontal (Mobile) */}
      <div className="w-full lg:w-80 lg:shrink-0">
        <div className="mb-6 lg:mb-10">
          <h3 className="text-3xl font-black tracking-tight text-slate-900">{text.title}</h3>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{text.subtitle}</p>
        </div>

        {/* List of Groups */}
        <div className="flex flex-row gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0">
          {groups.map((group) => {
            const isActive = activeGroupId === group.id
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={cn(
                  "flex min-w-[200px] items-center gap-4 rounded-2xl p-3 text-left transition-all lg:min-w-0 lg:p-4",
                  isActive 
                    ? "bg-white shadow-lg shadow-emerald-100 ring-2 ring-emerald-500" 
                    : "bg-transparent hover:bg-slate-50 text-slate-500 hover:text-slate-900"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                  isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                )}>
                  <Users size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={cn(
                    "text-sm font-bold tracking-tight transition-colors leading-tight",
                    isActive ? "text-slate-900" : "text-slate-500"
                  )}>
                    {group.name}
                  </p>
                  <p className="mt-1 text-[10px] font-black text-slate-400 uppercase tracking-tight">
                    {group.type.replace('_', ' ')}
                  </p>
                </div>
              </button>
            )
          })}
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
    <div className="mt-8 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{text.title}</h3>
        <p className="mt-2 text-sm font-bold uppercase tracking-widest text-slate-400">{text.subtitle}</p>
      </div>
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
      <div className="min-h-screen bg-slate-50/50 p-4 font-[Inter] md:p-8 lg:p-12">
        {/* MODERN SEGMENTED TABS */}
        <div className="mx-auto flex max-w-fit items-center justify-center rounded-2xl bg-slate-100 p-1.5 shadow-sm ring-1 ring-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 rounded-xl px-8 py-3 text-sm font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-white text-emerald-600 shadow-sm shadow-emerald-200 ring-1 ring-slate-200"
                    : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 z-[-1] rounded-xl bg-white"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </button>
            )
          })}
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
