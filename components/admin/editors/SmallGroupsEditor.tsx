import { Calendar, ChevronDown, Clock, Globe, Hash, LayoutGrid, Loader2, MapPin, Plus, Save, Star, Trash2, Type, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { groupActivityService, SmallGroupActivity } from "@/services/small-group-activity-service"
import { SmallGroup } from "@/types/website"
import ImagePicker from "components/ImagePicker"
import AdminHeader from "../AdminHeader"
import EmptyState from "../EmptyState"

export default function SmallGroupsEditor() {
  const { confirm, alert } = useDialog()
  const [activeTab, setActiveTab] = useState<"groups" | "gallery">("groups")

  // Fellowships State
  const [groups, setGroups] = useState<SmallGroup[]>([])
  const [originalGroups, setOriginalGroups] = useState<SmallGroup[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletedGroupIds, setDeletedGroupIds] = useState<string[]>([])

  // Gallery State
  const [activities, setActivities] = useState<SmallGroupActivity[]>([])
  const [originalActivities, setOriginalActivities] = useState<SmallGroupActivity[]>([])
  const [deletedActivityIds, setDeletedActivityIds] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { setIsDirty } = useNavigationGuard()

  const hasGroupsChanges = useMemo(() => JSON.stringify(groups) !== JSON.stringify(originalGroups), [groups, originalGroups])
  const hasActivitiesChanges = useMemo(() => JSON.stringify(activities) !== JSON.stringify(originalActivities), [activities, originalActivities])
  const hasChanges = hasGroupsChanges || hasActivitiesChanges || deletedGroupIds.length > 0 || deletedActivityIds.length > 0

  useEffect(() => {
    setIsDirty(hasChanges)
    return () => setIsDirty(false)
  }, [hasChanges, setIsDirty])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = "" // Required for Chrome/Firefox
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasChanges])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const [groupsRes, galleryRes] = await Promise.all([
          fetch("/api/small-groups"),
          groupActivityService.getAll()
        ])

        const groupsData = await groupsRes.json()
        setGroups(Array.isArray(groupsData) ? groupsData as SmallGroup[] : [])
        setOriginalGroups(Array.isArray(groupsData) ? groupsData as SmallGroup[] : [])

        setActivities(galleryRes)
        setOriginalActivities(galleryRes)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const addGroup = () => {
    const newId = crypto.randomUUID()
    const newGroup: SmallGroup = {
      id: newId,
      name: "",
      meeting_day: "Friday",
      meeting_time: "8:00 PM",
      location_area: "",
      contact_number: "",
      is_active: true,
      language: "English",
      zone: "",
      leader_name: "",
      is_featured: false,
    }
    setGroups([newGroup, ...groups])
    setExpandedId(newId)
  }

  const addActivity = () => {
    const newActivity: SmallGroupActivity = {
      id: crypto.randomUUID(),
      image_id: "",
      caption: "",
      sort_order: activities.length,
      is_active: true,
    }
    setActivities([...activities, newActivity])
  }

  const handleDeleteGroup = async (id: string) => {
    const isConfirmed = await confirm("Are you sure? This group will be permanently removed when you publish.", "Confirm Deletion", true)
    if (!isConfirmed) return

    if (!id.startsWith("temp-")) {
      setDeletedGroupIds((prev) => [...prev, id])
    }

    setGroups((prev) => prev.filter((g) => g.id !== id))
  }

  const handleDeleteActivity = async (id: string) => {
    const isConfirmed = await confirm("Remove this activity from the gallery?", "Confirm Removal", true)
    if (!isConfirmed) return

    // Find if the activity exists in the original list (meaning it's in the DB)
    const existsInDb = originalActivities.some(a => a.id === id)
    if (existsInDb) {
      setDeletedActivityIds((prev) => [...prev, id])
    }

    setActivities((prev) => prev.filter((a) => a.id !== id))
  }

  const updateActivity = (id: string, updates: Partial<SmallGroupActivity>) => {
    setActivities(activities.map((a) => (a.id === id ? { ...a, ...updates } : a)))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // 1. Handle Group Deletions & Upserts
      if (deletedGroupIds.length > 0) {
        await Promise.all(deletedGroupIds.map((id) => fetch(`/api/small-groups/${id}`, { method: "DELETE" })))
      }

      if (hasGroupsChanges) {
        // Sanitize groups to ensure no legacy "temp-" IDs are sent to the UUID column
        const sanitizedGroups = groups.map(g => {
          if (g.id.startsWith("temp-")) {
            const { id, ...clean } = g
            return { ...clean, id: crypto.randomUUID() }
          }
          return g
        })

        await fetch("/api/small-groups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedGroups),
        })
      }

      // 2. Handle Activity Deletions & Upserts
      if (deletedActivityIds.length > 0) {
        await Promise.all(deletedActivityIds.map((id) => groupActivityService.delete(id)))
      }

      if (hasActivitiesChanges) {
        const sanitizedActivities = activities.map((a, idx) => {
          const { media_assets, id, ...clean } = a
          const payload = { ...clean, sort_order: idx }
          
          // Re-sanitize any legacy temp IDs to prevent UUID syntax errors
          const finalId = id.startsWith("temp-") ? crypto.randomUUID() : id
          
          return { ...payload, id: finalId }
        })
        await groupActivityService.publish(sanitizedActivities as any)
      }

      // 3. Refresh and Sync
      const [groupsRes, galleryRes] = await Promise.all([
        fetch("/api/small-groups"),
        groupActivityService.getAll()
      ])

      const groupsData = await groupsRes.json()
      setGroups(Array.isArray(groupsData) ? groupsData as SmallGroup[] : [])
      setOriginalGroups(Array.isArray(groupsData) ? groupsData as SmallGroup[] : [])
      setActivities(galleryRes)
      setOriginalActivities(galleryRes)
      setDeletedGroupIds([])
      setDeletedActivityIds([])

      await alert("Changes published successfully!", "Success")
    } catch (e) {
      console.error(e)
      await alert("Publishing failed.", "Error")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-gray-200" size={40} />
      </div>
    )
  return (
    <NavigationGuardProvider>
      <div className="animate-in fade-in mx-auto max-w-6xl space-y-8 px-4 py-6 duration-700 md:space-y-12 md:px-6 md:py-10">
        <AdminHeader
          title="Small Groups"
          subtitle="Manage small group directory and activities."
          primaryAction={{
            label: "Publish Changes",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !hasChanges,
            className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
          }}
          secondaryAction={{
            label: activeTab === "groups" ? "Create Group" : "Add Activity",
            onClick: activeTab === "groups" ? addGroup : addActivity,
            icon: <Plus size={16} strokeWidth={2.5} />,
          }}
        />

        {/* Tab Navigation */}
        <div className="mt-8">
          <div className="flex w-fit items-center gap-1 rounded-2xl bg-slate-100/50 p-1.5 ring-1 ring-slate-200/20">
            {[
              { id: "groups", label: "Fellowships", icon: <Users size={18} /> },
              { id: "gallery", label: "Event Gallery", icon: <LayoutGrid size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all ${activeTab === tab.id
                  ? "bg-white text-emerald-600 shadow-sm ring-1 ring-slate-100"
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="pb-32">
          {activeTab === "groups" ? (
            <div className="mt-12 space-y-6">
              {groups.map((group) => {
                const isEditing = expandedId === group.id

                return (
                  <div
                    key={group.id}
                    className={`group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isEditing
                      ? "rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-slate-100"
                      : "rounded-[24px] bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-1 hover:ring-slate-200"
                      }`}
                  >
                    {/* ... (Existing Group List Header & Form - no major logic changes needed except updateGroup callers) */}
                    {/* HEADER ROW */}
                    <div
                      className="flex cursor-pointer items-center justify-between p-6"
                      onClick={() => setExpandedId(isEditing ? null : group.id)}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${isEditing ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                            }`}
                        >
                          <Users size={22} strokeWidth={1.5} />
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold tracking-tight text-slate-800">
                              {group.name || "Untitled Small Group"}
                            </h3>
                            {group.is_featured && (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50">
                                <Star size={10} className="fill-amber-400 text-amber-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} /> {group.zone || group.location_area || "General"}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                            <span className="flex items-center gap-1.5">
                              <Globe size={12} /> {group.language || "English"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`rounded-full p-2 transition-all duration-300 ${isEditing ? "rotate-180 bg-slate-100 text-slate-900" : "text-slate-300"}`}
                      >
                        <ChevronDown size={20} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* EXPANDED FORM */}
                    {isEditing && (
                      <div className="animate-in fade-in slide-in-from-top-2 px-8 pb-8 duration-500">
                        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
                          {/* Primary Identity */}
                          <div className="space-y-6 md:col-span-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                                <Type size={12} className="text-emerald-500" /> Identity / Fellowship Name
                              </div>
                              <input
                                placeholder="e.g. PJ North Lighthouse"
                                value={group.name || ""}
                                onChange={(e) => {
                                  setGroups(groups.map((g) => (g.id === group.id ? { ...g, name: e.target.value } : g)))
                                }}
                                className="w-full rounded-2xl border border-transparent bg-slate-50/50 px-5 py-4 text-xs font-bold transition-all placeholder:text-slate-300 focus:border-emerald-100 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                                  <MapPin size={12} className="text-emerald-500" /> Deployment Zone
                                </div>
                                <input
                                  value={group.zone || ""}
                                  onChange={(e) => {
                                    setGroups(groups.map((g) => (g.id === group.id ? { ...g, zone: e.target.value } : g)))
                                  }}
                                  className="w-full rounded-xl border border-transparent bg-slate-50/50 px-5 py-3.5 text-xs font-bold transition-all focus:border-slate-200 focus:bg-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                                  <Globe size={12} className="text-emerald-500" /> Language
                                </div>
                                <select
                                  value={group.language || ""}
                                  onChange={(e) =>
                                    setGroups(groups.map((g) => (g.id === group.id ? { ...g, language: e.target.value as any } : g)))
                                  }
                                  className="w-full appearance-none rounded-xl border border-transparent bg-slate-50/50 px-5 py-3.5 text-xs font-bold transition-all focus:border-slate-200 focus:bg-white focus:outline-none"
                                >
                                  <option>English</option>
                                  <option>Chinese</option>
                                  <option>BM</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Status Panel */}
                          <div className="space-y-4 md:col-span-2">
                            <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Featured / Pinned</span>
                                <button
                                  onClick={() => {
                                    setGroups(groups.map((g) => (g.id === group.id ? { ...g, is_featured: !g.is_featured } : g)))
                                  }}
                                  className={`relative h-6 w-11 rounded-full transition-all ${group.is_featured ? "bg-black" : "bg-slate-200"}`}
                                >
                                  <div
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${group.is_featured ? "left-6" : "left-1"}`}
                                  />
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase">Public Visibility</span>
                                <button
                                  onClick={() => {
                                    setGroups(groups.map((g) => (g.id === group.id ? { ...g, is_active: !g.is_active } : g)))
                                  }}
                                  className={`relative h-6 w-11 rounded-full transition-all ${group.is_active ? "bg-slate-900" : "bg-slate-200"}`}
                                >
                                  <div
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${group.is_active ? "left-6" : "left-1"}`}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-6 rounded-[28px] border border-slate-100 bg-slate-50/30 p-6 md:col-span-6 md:grid-cols-3">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase">
                                <Calendar size={12} className="text-emerald-500" /> Meeting Day
                              </div>
                              <input
                                value={group.meeting_day || ""}
                                onChange={(e) => {
                                  setGroups(groups.map((g) => (g.id === group.id ? { ...g, meeting_day: e.target.value } : g)))
                                }}
                                className="w-full border-b border-slate-200 bg-transparent py-1 text-xs font-bold transition-all outline-none focus:border-slate-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase">
                                <Clock size={12} className="text-emerald-500" /> Start Time
                              </div>
                              <input
                                value={group.meeting_time || ""}
                                onChange={(e) => {
                                  setGroups(groups.map((g) => (g.id === group.id ? { ...g, meeting_time: e.target.value } : g)))
                                }}
                                className="w-full border-b border-slate-200 bg-transparent py-1 text-xs font-bold transition-all outline-none focus:border-slate-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase">
                                <MapPin size={12} className="text-emerald-500" /> Venue / Area
                              </div>
                              <input
                                value={group.location_area || ""}
                                onChange={(e) => {
                                  setGroups(groups.map((g) => (g.id === group.id ? { ...g, location_area: e.target.value } : g)))
                                }}
                                className="w-full border-b border-slate-200 bg-transparent py-1 text-xs font-bold transition-all outline-none focus:border-slate-900"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-12 flex items-center justify-between">
                          <button
                            onClick={() => handleDeleteGroup(group.id)}
                            className="group flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-red-500"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors group-hover:bg-red-50">
                              <Trash2 size={16} />
                            </div>
                            Remove Small Group
                          </button>

                          <button
                            onClick={() => setExpandedId(null)}
                            className="rounded-2xl bg-slate-900 px-10 py-3.5 font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-black active:scale-[0.98]"
                          >
                            Finish Editing
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-6">
              {activities.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activities.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-2.5 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-xl md:rounded-[32px] md:p-3"
                    >
                      <div className="relative">
                        <ImagePicker
                          label={`Activity Photo #${index + 1}`}
                          value={item.image_id}
                          onChange={(assetId) => updateActivity(item.id, { image_id: assetId })}
                          bucket="brand-assets"
                        />
                      </div>

                      <div className="space-y-4 p-4 md:p-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-1 text-[9px] font-black tracking-[0.15em] text-slate-400 uppercase md:text-[10px]">
                            <Type size={12} className="text-emerald-500" /> Caption / Alt Text
                          </div>
                          <input
                            value={item.caption || ""}
                            onChange={(e) => updateActivity(item.id, { caption: e.target.value })}
                            placeholder="Describe this moment..."
                            className="w-full rounded-xl bg-slate-50/50 px-4 py-3.5 text-xs font-bold ring-1 ring-transparent transition-all outline-none focus:bg-white focus:ring-4 focus:ring-emerald-100 md:rounded-2xl md:py-4"
                          />
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 md:pt-5">
                          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-400">
                            <Hash size={10} /> POS: {index + 1}
                          </div>
                          <button
                            onClick={() => handleDeleteActivity(item.id)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition-all hover:bg-red-50 hover:text-red-500 md:h-11 md:w-11 md:rounded-2xl"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </NavigationGuardProvider>
  )
}
