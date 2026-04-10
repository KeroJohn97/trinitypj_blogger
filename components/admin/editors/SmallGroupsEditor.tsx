"use client"
import { Calendar, ChevronDown, Clock, Globe, Loader2, MapPin, Plus, Save, Star, Trash2, Users } from "lucide-react"
import { useEffect, useState } from "react"

import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { SmallGroup } from "@/types/website"
import AdminHeader from "../AdminHeader"
import { useDialog } from "@/context/dialog-context"

export default function SmallGroupsEditor() {
  const { confirm, alert } = useDialog()
  const [groups, setGroups] = useState<SmallGroup[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const { setIsDirty } = useNavigationGuard()
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setIsDirty(hasChanges) // Flip the switch to "ON"
    return () => setIsDirty(false) // Reset when leaving
  }, [hasChanges])

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
    async function loadGroups() {
      const res = await fetch("/api/small-groups")
      const data = await res.json()
      setGroups(Array.isArray(data) ? (data as SmallGroup[]) : [])
      setIsLoading(false)
    }
    loadGroups()
    setHasChanges(false)
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
    setHasChanges(true)
  }

  const updateGroup = (id: string, updates: Partial<SmallGroup>) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, ...updates } : g)))
    setHasChanges(true)
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure? This group will be permanently removed when you publish.", "Confirm Deletion", true)
    if (!isConfirmed) return

    // If it's a real record (not a temp one), queue it for API deletion
    if (!id.startsWith("temp-")) {
      setDeletedIds((prev) => [...prev, id])
    }

    setGroups((prev) => prev.filter((g) => g.id !== id))
    setHasChanges(true)
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // 1. Handle Deletions
      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => fetch(`/api/small-groups/${id}`, { method: "DELETE" })))
      }

      // 2. Handle Upserts (Saves/Updates)
      const res = await fetch("/api/small-groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groups),
      })

      if (res.ok) {
        setDeletedIds([]) // Clear queue
        await alert("Small Groups published successfully!", "Success")
      }
    } catch (e) {
      console.error(e)
      await alert("Publishing failed.", "Error")
    } finally {
      setIsSaving(false)
      setHasChanges(false)
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
      <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-emerald-100">
        <AdminHeader
          title="Small Groups"
          subtitle="Management Portal"
          primaryAction={{
            label: hasChanges ? "Publish Updates" : "Saved",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            // Add a subtle glow if there are changes
            className: hasChanges ? "ring-4 ring-emerald-100" : "",
          }}
          secondaryAction={{
            label: "Create",
            onClick: addGroup,
            icon: <Plus size={16} strokeWidth={2.5} />,
          }}
        />

        <main className="mx-auto max-w-5xl px-6 pt-12 pb-32">
          <div className="space-y-6">
            {groups.map((group) => {
              const isEditing = expandedId === group.id

              return (
                <div
                  key={group.id}
                  className={`group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isEditing
                      ? "rounded-[32px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-slate-100"
                      : "rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-1 hover:ring-slate-200"
                  }`}
                >
                  {/* HEADER ROW */}
                  <div
                    className="flex cursor-pointer items-center justify-between p-6"
                    onClick={() => setExpandedId(isEditing ? null : group.id)}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300 ${
                          isEditing ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
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
                            <label className="ml-1 text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                              Identity
                            </label>
                            <input
                              placeholder="e.g. PJ North Lighthouse"
                              value={group.name || ""}
                              onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                              className="w-full rounded-2xl border border-transparent bg-slate-50/50 px-5 py-4 text-lg font-medium transition-all placeholder:text-slate-300 focus:border-emerald-100 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="ml-1 text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                                Zone
                              </label>
                              <input
                                value={group.zone || ""}
                                onChange={(e) => updateGroup(group.id, { zone: e.target.value })}
                                className="w-full rounded-xl border border-transparent bg-slate-50/50 px-5 py-3.5 transition-all focus:border-slate-200 focus:bg-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="ml-1 text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                                Language
                              </label>
                              <select
                                value={group.language || ""}
                                onChange={(e) =>
                                  updateGroup(group.id, { language: e.target.value as SmallGroup["language"] })
                                }
                                className="w-full appearance-none rounded-xl border border-transparent bg-slate-50/50 px-5 py-3.5 transition-all focus:border-slate-200 focus:bg-white focus:outline-none"
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
                              <span className="text-xs font-semibold text-slate-500">Pinned</span>
                              <button
                                onClick={() => updateGroup(group.id, { is_featured: !group.is_featured })}
                                className={`relative h-6 w-11 rounded-full transition-all ${group.is_featured ? "bg-black" : "bg-slate-200"}`}
                              >
                                <div
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${group.is_featured ? "left-6" : "left-1"}`}
                                />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-500">Public Visibility</span>
                              <button
                                onClick={() => updateGroup(group.id, { is_active: !group.is_active })}
                                className={`relative h-6 w-11 rounded-full transition-all ${group.is_active ? "bg-slate-900" : "bg-slate-200"}`}
                              >
                                <div
                                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${group.is_active ? "left-6" : "left-1"}`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Schedule Section */}
                        <div className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-100 bg-slate-50/30 p-6 md:col-span-6 md:grid-cols-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Calendar size={14} />
                              <span className="text-[10px] font-bold tracking-widest uppercase">Meeting Day</span>
                            </div>
                            <input
                              value={group.meeting_day || ""}
                              onChange={(e) => updateGroup(group.id, { meeting_day: e.target.value })}
                              className="w-full border-b border-slate-200 bg-transparent py-1 transition-all outline-none focus:border-slate-900"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Clock size={14} />
                              <span className="text-[10px] font-bold tracking-widest uppercase">Start Time</span>
                            </div>
                            <input
                              value={group.meeting_time || ""}
                              onChange={(e) => updateGroup(group.id, { meeting_time: e.target.value })}
                              className="w-full border-b border-slate-200 bg-transparent py-1 transition-all outline-none focus:border-slate-900"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin size={14} />
                              <span className="text-[10px] font-bold tracking-widest uppercase">Venue</span>
                            </div>
                            <input
                              value={group.location_area || ""}
                              onChange={(e) => updateGroup(group.id, { location_area: e.target.value })}
                              className="w-full border-b border-slate-200 bg-transparent py-1 transition-all outline-none focus:border-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-12 flex items-center justify-between">
                        <button
                          onClick={() => handleDelete(group.id)}
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
        </main>
      </div>
    </NavigationGuardProvider>
  )
}
