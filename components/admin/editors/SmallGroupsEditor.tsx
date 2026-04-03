"use client"
import { ChevronDown, Loader2, Plus, Save, Star, Trash2, Users } from "lucide-react"
import { useEffect, useState } from "react"

import { SmallGroup } from "@/types/website"
import AdminHeader from "../AdminHeader"

export default function SmallGroupsEditor() {
  const [groups, setGroups] = useState<SmallGroup[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  useEffect(() => {
    async function loadGroups() {
      const res = await fetch("/api/small-groups")
      const data = await res.json()
      setGroups(Array.isArray(data) ? (data as SmallGroup[]) : [])
      setIsLoading(false)
    }
    loadGroups()
  }, [])

  const addGroup = () => {
    const newId = crypto.randomUUID()
    const newGroup: SmallGroup = {
      id: newId,
      name: "",
      leader_name: "",
      meeting_day: "Friday",
      meeting_time: "8:00 PM",
      location_area: "",
      contact_number: "",
      category: "Adult",
      is_active: true,
      is_featured: false,
    }
    setGroups([newGroup, ...groups])
    setExpandedId(newId)
  }

  const updateGroup = (id: string, updates: Partial<SmallGroup>) => {
    setGroups(groups.map((g) => (g.id === id ? { ...g, ...updates } : g)))
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure? This group will be permanently removed when you publish.")) return

    // If it's a real record (not a temp one), queue it for API deletion
    if (!id.startsWith("temp-")) {
      setDeletedIds((prev) => [...prev, id])
    }

    setGroups((prev) => prev.filter((g) => g.id !== id))
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
        alert("Small Groups published successfully!")
      }
    } catch (e) {
      console.error(e)
      alert("Publishing failed.")
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
    <div className="min-h-screen bg-gray-50/50">
      <AdminHeader
        title="Small Groups"
        subtitle="Church Cell Groups & Fellowships"
        primaryAction={{
          label: "Publish Changes",
          onClick: handlePublish,
          icon: <Save size={18} />,
          loading: isSaving,
        }}
        secondaryAction={{
          label: "New Group",
          onClick: addGroup,
          icon: <Plus size={18} />,
        }}
      />

      {/* The Content Container - Use pt-6 to give space below the sticky header */}
      <main className="w-full px-4 pt-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-4">
          {groups.map((group) => {
            const isEditing = expandedId === group.id

            return (
              <div key={group.id} className="rounded-3xl border-2 border-gray-100 bg-white">
                {/* COLLAPSED ROW (With Quick-Star) */}
                <div
                  className="flex cursor-pointer items-center justify-between p-5 sm:p-6"
                  onClick={() => setExpandedId(isEditing ? null : group.id)}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 sm:h-12 sm:w-12">
                      <Users size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-bold text-gray-900">{group.name || "Unnamed Group"}</h3>
                        {group.is_featured && <Star size={14} className="fill-amber-400 text-amber-400" />}
                      </div>
                      <p className="truncate text-xs text-gray-500">{group.location_area || "No Location Set"}</p>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-gray-300 transition-transform ${isEditing ? "rotate-180" : ""}`}
                  />
                </div>

                {/* EXPANDED FORM (Option 2 Refactor) */}
                {isEditing && (
                  <div className="border-t border-gray-50 bg-gray-50/30 p-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Name - Spans 2 cols for prominence */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Group Name
                        </label>
                        <input
                          value={group.name}
                          onChange={(e) => updateGroup(group.id, { name: e.target.value })}
                          className="w-full rounded-2xl border-2 border-gray-100 bg-white p-4 font-bold outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* NEW: Option 2 Feature Toggle Card */}
                      <div className="flex items-center justify-between rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4">
                        <div className="flex items-center gap-3">
                          <Star
                            size={20}
                            className={group.is_featured ? "fill-amber-500 text-amber-500" : "text-amber-300"}
                          />
                          <div>
                            <p className="text-sm font-bold text-amber-900">Featured</p>
                            <p className="text-[10px] font-bold text-amber-600/60 uppercase">Pin to Top</p>
                          </div>
                        </div>
                        <button
                          onClick={() => updateGroup(group.id, { is_featured: !group.is_featured })}
                          className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${group.is_featured ? "bg-amber-500" : "bg-gray-200"}`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${group.is_featured ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </button>
                      </div>

                      {/* Area */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Location Area
                        </label>
                        <input
                          value={group.location_area}
                          onChange={(e) => updateGroup(group.id, { location_area: e.target.value })}
                          className="w-full rounded-2xl border-2 border-gray-100 bg-white p-4 outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Schedule Group */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Meeting Schedule
                        </label>
                        <div className="flex gap-2">
                          <input
                            value={group.meeting_day}
                            onChange={(e) => updateGroup(group.id, { meeting_day: e.target.value })}
                            className="w-1/2 rounded-xl border-2 border-gray-100 bg-white p-4 outline-none focus:border-blue-500"
                          />
                          <input
                            value={group.meeting_time}
                            onChange={(e) => updateGroup(group.id, { meeting_time: e.target.value })}
                            className="w-1/2 rounded-xl border-2 border-gray-100 bg-white p-4 outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Category Select */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          Category
                        </label>
                        <select
                          value={group.category}
                          onChange={(e) => updateGroup(group.id, { category: e.target.value })}
                          className="w-full rounded-2xl border-2 border-gray-100 bg-white p-4 font-bold outline-none focus:border-blue-500"
                        >
                          <option value="Adult">Adult</option>
                          <option value="Youth">Youth</option>
                          <option value="Young Adult">Young Adult</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                      <button
                        onClick={() => handleDelete(group.id)}
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                      >
                        <Trash2 size={18} /> Remove Group
                      </button>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="rounded-2xl bg-gray-900 px-8 py-3 font-bold text-white transition-all hover:bg-black"
                      >
                        Done
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
  )
}
