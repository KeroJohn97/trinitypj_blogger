"use client"

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { AnimatePresence, motion } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  LayoutGrid,
  Loader2,
  MapPin,
  Plus,
  Save,
  Trash2,
  Type,
  Users,
  User as UserIcon,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { SortableMinistryRow } from "components/SortableItem"
import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { ChurchGroup } from "@/lib/interface"
import { groupService } from "@/services/group-service"
import ImagePicker from "components/ImagePicker"
import AdminHeader from "../AdminHeader"
import EmptyState from "../EmptyState"

export default function GroupsEditor() {
  const { confirm, alert } = useDialog()
  const { setIsDirty } = useNavigationGuard()

  const [groups, setGroups] = useState<ChurchGroup[]>([])
  const [originalGroups, setOriginalGroups] = useState<ChurchGroup[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const hasChanges = useMemo(() =>
    JSON.stringify(groups) !== JSON.stringify(originalGroups),
    [groups, originalGroups]
  )

  useEffect(() => {
    setIsDirty(hasChanges)
    return () => setIsDirty(false)
  }, [hasChanges, setIsDirty])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const data = await groupService.getAll(false)
        setGroups(data)
        setOriginalGroups(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAdd = () => {
    const newId = `temp-${Date.now()}`
    const newGroup: ChurchGroup = {
      id: newId,
      type: "fellowship",
      slug: "",
      name: "",
      meeting_time: "",
      location_name: "",
      description: "",
      leader_name: "",
      is_active: true,
      is_featured: false,
      sort_order: 0,
      metadata: {}
    }
    setGroups([newGroup, ...groups])
    setExpandedId(newId)
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to delete this group? This action will be immediate on publish.", "Confirm Deletion", true)
    if (!isConfirmed) return

    setGroups(groups.filter(g => g.id !== id))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setGroups((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleUpdate = (id: string, updates: Partial<ChurchGroup>) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // 1. Handle Deletions
      const currentIds = new Set(groups.map(g => g.id))
      const removedIds = originalGroups.filter(g => !currentIds.has(g.id)).map(g => g.id)

      if (removedIds.length > 0) {
        await Promise.all(removedIds.map(id => groupService.delete(id, false)))
      }

      // 2. Handle Upserts
      await Promise.all(groups.map((g, index) => 
        groupService.save({ ...g, sort_order: index })
      ))

      // 3. Refresh State
      const data = await groupService.getAll(false)
      setGroups(data)
      setOriginalGroups(data)

      await alert("Church Groups updated successfully!", "Success")
    } catch (err) {
      console.error(err)
      await alert("Failed to save changes. Please try again.", "Error")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-200" size={40} />
    </div>
  )

  return (
    <NavigationGuardProvider>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-10">
        <AdminHeader
          title="Fellowship Groups"
          subtitle="Manage high-level church groups like MSF, MAF, MYF, and more."
          primaryAction={{
            label: "Save Changes",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !hasChanges,
            className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200"
          }}
          secondaryAction={{
            label: "Add Group",
            onClick: handleAdd,
            icon: <Plus size={16} strokeWidth={2.5} />
          }}
        />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <main className="pb-32">
            {groups.length === 0 ? (
              <EmptyState title="No Groups Found" description="Click the button above to create your first church group." />
            ) : (
              <SortableContext items={groups.map(g => g.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {groups.map((group) => {
                    const isEditing = expandedId === group.id

                    return (
                      <SortableMinistryRow key={group.id} id={group.id}>
                        <motion.div
                          layout
                          className={`group overflow-hidden transition-all duration-300 ${isEditing
                            ? "rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-100"
                            : "rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-slate-200"
                            }`}
                        >
                          {/* Compact Header */}
                          <div
                            className="flex cursor-pointer items-center justify-between p-5 md:p-6"
                            onClick={() => setExpandedId(isEditing ? null : group.id)}
                          >
                            <div className="flex items-center gap-5">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${isEditing ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                                }`}>
                                <Users size={22} strokeWidth={1.5} />
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-slate-800">{group.name || "Untitled Group"}</h3>
                                <p className="text-xs font-medium text-slate-400">{group.meeting_time || "No time set"}</p>
                              </div>
                            </div>
                            <ChevronDown size={20} className={`text-slate-300 transition-transform ${isEditing ? "rotate-180" : ""}`} />
                          </div>

                          <AnimatePresence>
                            {isEditing && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-8 md:px-10"
                              >
                                <div className="mb-8 h-px bg-slate-100" />

                                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                                  {/* Left Column: Basic Info */}
                                  <div className="space-y-8 lg:col-span-7">
                                    <section className="space-y-6">
                                      <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                        <Type size={16} className="text-emerald-500" />
                                        <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">General Identity</h4>
                                      </div>
                                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Group Name</label>
                                          <input
                                            value={group.name}
                                            onChange={e => handleUpdate(group.id, { name: e.target.value })}
                                            className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                            placeholder="e.g. Methodist Women"
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">URL Slug</label>
                                          <input
                                            value={group.slug}
                                            onChange={e => handleUpdate(group.id, { slug: e.target.value })}
                                            className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                            placeholder="e.g. methodist-women"
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Meeting Time</label>
                                          <div className="relative">
                                            <Calendar className="absolute top-3.5 left-4 text-slate-300" size={16} />
                                            <input
                                              value={group.meeting_time || ""}
                                              onChange={e => handleUpdate(group.id, { meeting_time: e.target.value })}
                                              className="w-full rounded-xl bg-slate-50 pl-11 pr-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                              placeholder="e.g. Saturdays, 8:30 AM"
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Location / Venue</label>
                                          <div className="relative">
                                            <MapPin className="absolute top-3.5 left-4 text-slate-300" size={16} />
                                            <input
                                              value={group.location_name || ""}
                                              onChange={e => handleUpdate(group.id, { location_name: e.target.value })}
                                              className="w-full rounded-xl bg-slate-50 pl-11 pr-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                              placeholder="e.g. Fellowship Hall"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Lead Contact / Leader</label>
                                        <div className="relative">
                                          <UserIcon className="absolute top-3.5 left-4 text-slate-300" size={16} />
                                          <input
                                            value={group.leader_name || ""}
                                            onChange={e => handleUpdate(group.id, { leader_name: e.target.value })}
                                            className="w-full rounded-xl bg-slate-50 pl-11 pr-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                            placeholder="Leader name..."
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Description</label>
                                        <textarea
                                          rows={4}
                                          value={group.description || ""}
                                          onChange={e => handleUpdate(group.id, { description: e.target.value })}
                                          className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none resize-none"
                                          placeholder="Tell us about this fellowship..."
                                        />
                                      </div>
                                    </section>
                                  </div>

                                  {/* Right Column: Media */}
                                  <div className="space-y-8 lg:col-span-5">
                                    <section className="space-y-4">
                                      <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                        <LayoutGrid size={16} className="text-emerald-500" />
                                        <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Main Group Photo</h4>
                                      </div>
                                      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                                        <ImagePicker
                                          label="Group Photo"
                                          value={group.image || ""}
                                          onChange={(newId) => handleUpdate(group.id, { image: newId })}
                                          bucket="brand-assets"
                                        />
                                      </div>
                                    </section>
                                    
                                    <section className="space-y-4 rounded-3xl bg-slate-50 p-6">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Active Status</span>
                                        <button
                                          onClick={() => handleUpdate(group.id, { is_active: !group.is_active })}
                                          className={`relative h-6 w-11 rounded-full transition-all ${group.is_active ? "bg-emerald-600 shadow-lg shadow-emerald-200" : "bg-slate-200"}`}
                                        >
                                          <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${group.is_active ? "left-6" : "left-1"}`} />
                                        </button>
                                      </div>
                                    </section>
                                  </div>
                                </div>

                                {/* Expansion Area Footer */}
                                <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                                  <button
                                    onClick={() => handleDelete(group.id)}
                                    className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                                  >
                                    <Trash2 size={18} /> Delete Group
                                  </button>
                                  <button
                                    onClick={() => setExpandedId(null)}
                                    className="rounded-[20px] bg-slate-900 px-12 py-3.5 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-slate-200 transition-all hover:bg-black active:scale-[0.98]"
                                  >
                                    Collapse Editor
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </SortableMinistryRow>
                    )
                  })}
                </div>
              </SortableContext>
            )}
          </main>
        </DndContext>
      </div>
    </NavigationGuardProvider>
  )
}
