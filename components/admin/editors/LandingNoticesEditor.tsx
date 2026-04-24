"use client"

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { AnimatePresence, motion } from "framer-motion"
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ExternalLink,
  GripVertical,
  ImageIcon,
  LayoutGrid,
  Link as LinkIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  Type,
  Video,
} from "lucide-react"
import { useEffect, useState } from "react"

import { SortableMinistryRow } from "components/SortableItem"
import { LandingNotice, LandingNoticeService } from "@/services/landing-notice-service"
import { useDialog } from "@/context/dialog-context"
import ImagePicker from "components/ImagePicker"
import AdminHeader from "../AdminHeader"
import EmptyState from "../EmptyState"

export default function LandingNoticesEditor() {
  const [notices, setNotices] = useState<LandingNotice[]>([])
  const [originalNotices, setOriginalNotices] = useState<LandingNotice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { confirm, alert } = useDialog()
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setIsLoading(true)
      const data = await LandingNoticeService.getAll(false)
      setNotices(data)
      setOriginalNotices(JSON.parse(JSON.stringify(data)) as LandingNotice[])
    } catch (error) {
      console.error("Failed to fetch notices:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addNotice = () => {
    const newId = `temp-${Date.now()}`
    const newNotice: LandingNotice = {
      id: newId,
      title: "",
      description: "",
      sort_order: notices.length,
      is_active: true,
      link_label: "Learn More",
    }
    setNotices([newNotice, ...notices])
    setExpandedId(newId)
  }

  const updateNotice = (id: string, updates: Partial<LandingNotice>) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)))
  }

  const deleteNotice = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to delete this spotlight? Changes will be permanent after publishing.", "Confirm Deletion", true)
    if (!isConfirmed) return

    if (!id.startsWith("temp-")) {
      setDeletedIds((prev) => [...prev, id])
    }
    setNotices((prev) => prev.filter((n) => n.id !== id))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setNotices((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      if (deletedIds.length > 0) {
        await Promise.all(deletedIds.map((id) => LandingNoticeService.delete(id)))
      }

      await LandingNoticeService.publish(notices)
      await alert("Landing Notices updated successfully!", "Success")
      setDeletedIds([])
      fetchNotices()
    } catch (error: any) {
      alert(error.message || "Failed to save notices")
    } finally {
      setIsSaving(false)
    }
  }

  const hasChanges = JSON.stringify(notices) !== JSON.stringify(originalNotices) || deletedIds.length > 0

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:px-6 md:py-10">
      <AdminHeader
        title="Landing Notices"
        subtitle="Manage temporary banners and spotlight notices for the homepage."
        primaryAction={{
          label: "Publish Changes",
          onClick: handlePublish,
          icon: <Save size={18} />,
          loading: isSaving,
          disabled: !hasChanges,
          className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
        }}
        secondaryAction={{
          label: "Add Spotlight",
          onClick: addNotice,
          icon: <Plus size={16} strokeWidth={2.5} />,
        }}
      />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <main className="pb-32">
          {notices.length === 0 ? (
            <EmptyState title="No Spotlights Found" description="Add your first banner to feature it on the landing page." />
          ) : (
            <SortableContext items={notices.map((n) => n.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {notices.map((notice, index) => {
                  const isEditing = expandedId === notice.id

                  return (
                    <SortableMinistryRow key={notice.id} id={notice.id}>
                      <motion.div
                        layout
                        className={`group overflow-hidden transition-all duration-300 ${
                          isEditing
                            ? "rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-100"
                            : "rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:ring-slate-200"
                        }`}
                      >
                        {/* Header Row */}
                        <div
                          className="flex cursor-pointer items-center justify-between p-5 md:p-6"
                          onClick={() => setExpandedId(isEditing ? null : notice.id)}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                                isEditing
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                              }`}
                            >
                              <LayoutGrid size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-slate-800">{notice.title || "Untitled Spotlight"}</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Position #{index + 1} {notice.is_active ? "• Active" : "• Hidden"}
                              </p>
                            </div>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`text-slate-300 transition-transform ${isEditing ? "rotate-180" : ""}`}
                          />
                        </div>

                        {/* Expanded Content */}
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
                                {/* Media Column */}
                                <div className="space-y-8 lg:col-span-5">
                                  <section className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                      <ImageIcon size={16} className="text-emerald-500" />
                                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Cover Media
                                      </h4>
                                    </div>
                                    <ImagePicker
                                      label="Banner Image"
                                      value={notice.image_id || ""}
                                      onChange={(id) => updateNotice(notice.id, { image_id: id })}
                                      bucket="brand-assets"
                                    />
                                    <div className="space-y-2">
                                      <label className="ml-1 text-[10px] font-bold uppercase text-slate-400">
                                        Video Link (Optional)
                                      </label>
                                      <div className="relative">
                                        <Video className="absolute top-3.5 left-4 text-slate-300" size={16} />
                                        <input
                                          value={notice.video_url || ""}
                                          onChange={(e) => updateNotice(notice.id, { video_url: e.target.value })}
                                          placeholder="Youtube / Vimeo URL..."
                                          className="w-full rounded-xl bg-slate-50 py-3.5 pl-11 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                        />
                                      </div>
                                    </div>
                                  </section>

                                  <section className="space-y-4 rounded-3xl bg-slate-50 p-6">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Visibility
                                      </span>
                                      <button
                                        onClick={() => updateNotice(notice.id, { is_active: !notice.is_active })}
                                        className={`relative h-6 w-11 rounded-full transition-all ${
                                          notice.is_active ? "bg-emerald-600 shadow-lg shadow-emerald-200" : "bg-slate-200"
                                        }`}
                                      >
                                        <div
                                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                                            notice.is_active ? "left-6" : "left-1"
                                          }`}
                                        />
                                      </button>
                                    </div>
                                  </section>
                                </div>

                                {/* Form Column */}
                                <div className="space-y-8 lg:col-span-7">
                                  <section className="space-y-6">
                                    <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                      <Type size={16} className="text-emerald-500" />
                                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Content Details
                                      </h4>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="ml-1 text-[10px] font-bold uppercase text-slate-400">Title</label>
                                      <input
                                        value={notice.title}
                                        onChange={(e) => updateNotice(notice.id, { title: e.target.value })}
                                        placeholder="Headline for this spotlight..."
                                        className="w-full rounded-xl bg-slate-50 px-5 py-3.5 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <label className="ml-1 text-[10px] font-bold uppercase text-slate-400">Description</label>
                                      <textarea
                                        rows={4}
                                        value={notice.description || ""}
                                        onChange={(e) => updateNotice(notice.id, { description: e.target.value })}
                                        placeholder="Add more details about this notice..."
                                        className="w-full resize-none rounded-xl bg-slate-50 px-5 py-3.5 text-sm font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                      <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-bold uppercase text-slate-400">Button Label</label>
                                        <input
                                          value={notice.link_label || ""}
                                          onChange={(e) => updateNotice(notice.id, { link_label: e.target.value })}
                                          placeholder="e.g. Learn More"
                                          className="w-full rounded-xl bg-slate-50 px-5 py-3.5 text-xs font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-bold uppercase text-slate-400">Action Link</label>
                                        <div className="relative">
                                          <LinkIcon className="absolute top-3.5 left-4 text-slate-300" size={14} />
                                          <input
                                            value={notice.link_url || ""}
                                            onChange={(e) => updateNotice(notice.id, { link_url: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full rounded-xl bg-slate-50 py-3.5 pl-11 pr-4 text-xs font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-2">
                                      <label className="ml-1 text-[10px] font-bold uppercase text-slate-400 flex items-center gap-2">
                                        <Calendar size={14} /> Expiry Date (Auto-hide after this date)
                                      </label>
                                      <input
                                        type="date"
                                        value={notice.expiry_date ? notice.expiry_date.split("T")[0] : ""}
                                        onChange={(e) =>
                                          updateNotice(notice.id, {
                                            expiry_date: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                                          })
                                        }
                                        className="w-full rounded-xl bg-slate-50 px-5 py-3.5 text-xs font-bold outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                                      />
                                    </div>
                                  </section>
                                </div>
                              </div>

                              <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                                <button
                                  onClick={() => deleteNotice(notice.id)}
                                  className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={18} /> Delete Spotlight
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
  )
}
