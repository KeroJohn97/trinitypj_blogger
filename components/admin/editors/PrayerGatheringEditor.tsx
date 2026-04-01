"use client"
import { gatheringService } from "@/services/gathering-service"
import { GatheringItem } from "@/types/website"
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableGatheringRow } from "components/SortableItem"
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Loader2,
  MapPin,
  Plus,
  Power,
  Save,
  Trash2,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"

export default function PrayerGatheringEditor({ initialData }: { initialData: GatheringItem[] }) {
  const [items, setItems] = useState<GatheringItem[]>(Array.isArray(initialData) ? initialData : [])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  const handleDelete = (id: string) => {
    // TODO custom dialog in the future?
    if (!confirm("Are you sure you want to delete this gathering? This will be finalized when you click Publish."))
      return

    // If the ID is a real UUID (not a fresh temporary one), track it for deletion
    // Fresh items usually don't exist in the DB yet, so no need to delete them there
    if (!id.includes("temp-")) {
      // assuming you might prefix temp IDs, or just check length
      setDeletedIds((prev) => [...prev, id])
    }

    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // --- The "Constructor" (Initial Data Load) ---
  useEffect(() => {
    // If we already have initialData from the parent, don't fetch again
    if (initialData && initialData.length > 0) {
      setItems(initialData)
      setIsLoading(false)
      return
    }

    async function loadGatherings() {
      try {
        const data = await gatheringService.getAll()

        // 2. CRITICAL: Check if data is actually an array before setting state
        if (Array.isArray(data)) {
          setItems(data)
        } else {
          console.error("API did not return an array:", data)
          setItems([]) // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to load gatherings:", error)
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }
    loadGatherings()
  }, [initialData])

  const addItem = () => {
    const newId = crypto.randomUUID()
    const newItem: GatheringItem = {
      id: newId,
      type: "lighthouse",
      isActive: true,
      title: "",
      day: "Wednesday",
      time: "8:00 PM",
      venue: "",
      mode: "Physical",
      leader: "",
      contact: "",
      note: "",
    }
    setItems([newItem, ...items])
    setExpandedId(newId) // Open the new item immediately for editing
  }

  const updateItem = (id: string, updates: Partial<GatheringItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => gatheringService.delete(id)))
      }

      // TODO fetch folder
      const res = await fetch("/api/gatherings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items), // Send the whole array
      })

      const result: any = await res.json()

      if (result.success) {
        alert("Gatherings published successfully!")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Publish failed:", error)
      alert("Publish failed. Check console for details.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 flex-col items-center justify-center text-gray-400">
        <Loader2 className="mb-4 animate-spin" size={40} />
        <p className="text-xs font-bold tracking-widest uppercase">Loading Prayer Gatherings...</p>
      </div>
    )
  }

  if (!Array.isArray(items)) {
    return <div className="p-8 text-red-500">Error: Prayer Gatherings data is corrupted.</div>
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* --- Page Header (Rendered ONCE) --- */}
        <div className="mt-8 mb-8 flex flex-col gap-6 rounded-3xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Prayer Gatherings
            </h2>
            <p className="mt-1 font-medium text-gray-500">Manage Prayer Meetings and Lighthouse Groups.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={addItem}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-gray-100 px-5 py-3 font-bold text-gray-700 transition-all hover:bg-gray-200 sm:flex-none"
            >
              <Plus size={20} /> <span className="whitespace-nowrap">Add New</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-xl shadow-emerald-100 transition-all hover:bg-emerald-700 disabled:bg-gray-400 sm:flex-none"
            >
              <Save size={20} />{" "}
              <span className="whitespace-nowrap">{isSaving ? "Publishing..." : "Publish Updates"}</span>
            </button>
          </div>
        </div>

        {/* --- List of Gatherings (Sortable Area) --- */}
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {items.map((item) => {
              const isEditing = expandedId === item.id

              return (
                <SortableGatheringRow key={item.id} id={item.id}>
                  <div
                    className={`overflow-hidden rounded-3xl border-2 bg-white transition-all duration-300 ${
                      isEditing
                        ? "border-emerald-500 shadow-2xl ring-4 ring-emerald-50"
                        : "border-gray-100 hover:border-emerald-200"
                    } ${!item.isActive && !isEditing ? "bg-gray-50 opacity-60" : ""}`}
                  >
                    {/* 1. COLLAPSED VIEW */}
                    <div
                      onClick={() => toggleExpand(item.id)}
                      className="group flex cursor-pointer items-center gap-4 p-5 sm:gap-6 sm:p-6"
                    >
                      <div
                        className={`shrink-0 rounded-2xl p-3 ${
                          item.type === "prayer" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.type === "prayer" ? <Heart size={24} fill="currentColor" /> : <Users size={24} />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                            {item.title || "Untitled Gathering"}
                          </h3>
                          {!item.isActive && (
                            <span className="shrink-0 rounded bg-gray-200 px-2 py-0.5 text-[10px] font-black tracking-widest text-gray-500 uppercase">
                              OFF
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-500 sm:text-sm">
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <CalendarIcon size={14} /> {item.day}
                          </span>
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <Clock size={14} /> {item.time}
                          </span>
                          <span className="flex items-center gap-1.5 truncate">
                            <MapPin size={14} className="shrink-0" /> <span className="truncate">{item.venue}</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isEditing ? (
                          <button className="hidden items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md sm:flex">
                            <CheckCircle2 size={16} /> Finish
                          </button>
                        ) : (
                          <div className="text-gray-400 transition-colors group-hover:text-emerald-500">
                            <ChevronDown size={24} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 2. EXPANDED EDIT VIEW */}
                    {isEditing && (
                      <div className="border-t-2 border-gray-50 bg-gray-50/30 p-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                          {/* Form fields stay exactly the same */}
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Category
                            </label>
                            <select
                              value={item.type}
                              onChange={(e) => updateItem(item.id, { type: e.target.value as any })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 font-bold outline-none focus:border-emerald-500"
                            >
                              <option value="prayer">Prayer Meeting</option>
                              <option value="lighthouse">Lighthouse Group</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Attendance
                            </label>
                            <select
                              value={item.mode}
                              onChange={(e) => updateItem(item.id, { mode: e.target.value as any })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 font-bold outline-none focus:border-emerald-500"
                            >
                              <option value="Physical">Physical</option>
                              <option value="Online">Online</option>
                              <option value="Hybrid">Hybrid</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Status
                            </label>
                            <button
                              onClick={() => updateItem(item.id, { isActive: !item.isActive })}
                              className={`flex w-full items-center justify-center gap-2 rounded-2xl border-2 p-3.5 font-bold transition-all ${
                                item.isActive
                                  ? "border-green-100 bg-green-50 text-green-700"
                                  : "border-gray-200 bg-white text-gray-400"
                              }`}
                            >
                              <Power size={18} /> {item.isActive ? "Online" : "Hidden"}
                            </button>
                          </div>

                          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Name
                            </label>
                            <input
                              value={item.title}
                              onChange={(e) => updateItem(item.id, { title: e.target.value })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 font-bold outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">Day</label>
                            <input
                              value={item.day}
                              onChange={(e) => updateItem(item.id, { day: e.target.value })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Time
                            </label>
                            <input
                              value={item.time}
                              onChange={(e) => updateItem(item.id, { time: e.target.value })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Venue / Link
                            </label>
                            <input
                              value={item.venue}
                              onChange={(e) => updateItem(item.id, { venue: e.target.value })}
                              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 outline-none focus:border-emerald-500"
                            />
                          </div>

                          {item.type === "lighthouse" && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                                  Leader
                                </label>
                                <input
                                  value={item.leader}
                                  onChange={(e) => updateItem(item.id, { leader: e.target.value })}
                                  className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 font-bold outline-none focus:border-emerald-500"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                                  Contact
                                </label>
                                <input
                                  value={item.contact}
                                  onChange={(e) => updateItem(item.id, { contact: e.target.value })}
                                  className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3.5 font-mono outline-none focus:border-emerald-500"
                                />
                              </div>
                            </>
                          )}

                          <div className="space-y-2 sm:col-span-full">
                            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                              Notes
                            </label>
                            <textarea
                              value={item.note}
                              onChange={(e) => updateItem(item.id, { note: e.target.value })}
                              className="h-20 w-full resize-none rounded-2xl border-2 border-gray-200 bg-white p-3.5 italic outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="mt-10 flex justify-between border-t border-gray-200 pt-6">
                          <button
                            onClick={() => handleDelete(item.id)} // Use the new function
                            className="flex items-center justify-center gap-2 rounded-xl py-2 font-bold text-red-500 transition-all hover:bg-red-50 sm:px-4"
                          >
                            <Trash2 size={20} /> Delete
                          </button>
                          <button
                            onClick={() => setExpandedId(null)}
                            className="rounded-2xl bg-gray-800 px-8 py-3 font-bold text-white transition-all hover:bg-black"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </SortableGatheringRow>
              )
            })}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  )
}
