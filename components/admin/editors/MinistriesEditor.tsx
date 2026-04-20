"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ChevronDown,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  LayoutGrid,
  Loader2,
  Palette,
  Plus,
  PlusCircle,
  Save,
  Trash2,
  Type,
  XCircle
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableMinistryRow } from "components/SortableItem"

import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import { Attachment, FAQ, Ministry } from "@/lib/interface"
import { ministryService } from "@/services/ministry-service"
import ImagePicker from "components/ImagePicker"
import AdminHeader from "../AdminHeader"
import EmptyState from "../EmptyState"

export default function MinistriesEditor() {
  const { confirm, alert } = useDialog()
  const { setIsDirty } = useNavigationGuard()

  const [ministries, setMinistries] = useState<Ministry[]>([])
  const [originalMinistries, setOriginalMinistries] = useState<Ministry[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor))

  const hasChanges = useMemo(() =>
    JSON.stringify(ministries) !== JSON.stringify(originalMinistries),
    [ministries, originalMinistries]
  )

  useEffect(() => {
    setIsDirty(hasChanges)
    return () => setIsDirty(false)
  }, [hasChanges, setIsDirty])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      try {
        const data = await ministryService.getAll(false)
        setMinistries(data)
        setOriginalMinistries(data)
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
    const newMinistry: Ministry = {
      id: newId,
      name: "",
      description: "",
      faqs: [],
      photos: [],
    }
    setMinistries([newMinistry, ...ministries])
    setExpandedId(newId)
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to delete this ministry? This action will be immediate on publish.", "Confirm Deletion", true)
    if (!isConfirmed) return

    try {
      setMinistries(ministries.filter(m => m.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setMinistries((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleUpdate = (id: string, updates: Partial<Ministry>) => {
    setMinistries(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      // 1. Handle Deletions (Comparing current list vs original)
      const currentIds = new Set(ministries.map(m => m.id))
      const removedIds = originalMinistries.filter(m => !currentIds.has(m.id)).map(m => m.id)

      if (removedIds.length > 0) {
        await Promise.all(removedIds.map(id => ministryService.delete(id, false)))
      }

      // 2. Handle Upserts with updated sort_order
      await Promise.all(ministries.map((m, index) => 
        ministryService.save({ ...m, sort_order: index })
      ))

      // 3. Refresh State
      const data = await ministryService.getAll()
      setMinistries(data)
      setOriginalMinistries(data)

      await alert("Ministries updated successfully!", "Success")
    } catch (err) {
      console.error(err)
      await alert("Failed to save changes. Please try again.", "Error")
    } finally {
      setIsSaving(false)
    }
  }

  // --- FAQ SUB-EDITOR ---
  const addFAQ = (ministryId: string) => {
    const m = ministries.find(m => m.id === ministryId)
    if (!m) return
    const newFaqs = [...(m.faqs || []), { question: "", answer: "" }]
    handleUpdate(ministryId, { faqs: newFaqs })
  }

  const updateFAQ = (ministryId: string, index: number, field: keyof FAQ, value: string) => {
    setMinistries(prev => prev.map(m => {
      if (m.id !== ministryId) return m
      const newFaqs: any = [...(m.faqs || [])]
      newFaqs[index] = { ...newFaqs[index], [field]: value }
      return { ...m, faqs: newFaqs }
    }))
  }

  const removeFAQ = (ministryId: string, index: number) => {
    const m = ministries.find(m => m.id === ministryId)
    if (!m) return
    handleUpdate(ministryId, { faqs: (m.faqs || []).filter((_, i) => i !== index) })
  }

  // --- LIBRARY SUB-EDITOR ---
  const addLibraryItem = (ministryId: string) => {
    const m = ministries.find(m => m.id === ministryId)
    if (!m) return
    const newLibrary = [...(m.library || []), { id: `lib-${Date.now()}`, title: "", src: "", thumb: "" }]
    handleUpdate(ministryId, { library: newLibrary })
  }

  const updateLibraryItem = (ministryId: string, itemId: string, updates: Partial<Attachment>) => {
    setMinistries(prev => prev.map(m => {
      if (m.id !== ministryId) return m
      const newLibrary = (m.library || []).map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
      return { ...m, library: newLibrary }
    }))
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
          title="Ministries & Groups"
          subtitle="Manage high-level church ministries, FAQs, and media libraries."
          primaryAction={{
            label: "Save Changes",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !hasChanges,
            className: hasChanges ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200"
          }}
          secondaryAction={{
            label: "Add Ministry",
            onClick: handleAdd,
            icon: <Plus size={16} strokeWidth={2.5} />
          }}
        />

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <main className="pb-32">
            {ministries.length === 0 ? (
              <EmptyState title="No Ministries Found" description="Click the button above to create your first ministry entry." />
            ) : (
              <SortableContext items={ministries.map(m => m.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {ministries.map((ministry) => {
                    const isEditing = expandedId === ministry.id

                    return (
                      <SortableMinistryRow key={ministry.id} id={ministry.id}>
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
                      onClick={() => setExpandedId(isEditing ? null : ministry.id)}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${isEditing ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
                          }`}>
                          <LayoutGrid size={22} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-800">{ministry.name || "Untitled Ministry"}</h3>
                          <p className="text-xs font-medium text-slate-400">{ministry.tagline || (ministry.id.startsWith("temp") ? "New Draft" : ministry.id)}</p>
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
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Ministry Name</label>
                                    <input
                                      value={ministry.name}
                                      onChange={e => handleUpdate(ministry.id, { name: e.target.value })}
                                      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                      placeholder="e.g. Boys' Brigade"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Tagline</label>
                                    <input
                                      value={ministry.tagline || ""}
                                      onChange={e => handleUpdate(ministry.id, { tagline: e.target.value })}
                                      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none"
                                      placeholder="Sub-label/Motto"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Description</label>
                                  <textarea
                                    rows={4}
                                    value={ministry.description}
                                    onChange={e => handleUpdate(ministry.id, { description: e.target.value })}
                                    className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50 outline-none resize-none"
                                    placeholder="Detailed overview of the ministry..."
                                  />
                                </div>
                              </section>

                              {/* FAQ SECTION */}
                              <section className="space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                                  <div className="flex items-center gap-2">
                                    <HelpCircle size={16} className="text-emerald-500" />
                                    <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Frequently Asked Questions</h4>
                                  </div>
                                  <button onClick={() => addFAQ(ministry.id)} className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 hover:text-emerald-700">
                                    <Plus size={14} /> Add FAQ
                                  </button>
                                </div>

                                <div className="space-y-4">
                                  {ministry.faqs?.map((faq, idx) => (
                                    <div key={idx} className="relative space-y-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                                      <button
                                        onClick={() => removeFAQ(ministry.id, idx)}
                                        className="absolute -top-2 -right-2 rounded-full bg-white p-1 text-slate-300 shadow-sm transition-colors hover:text-red-500"
                                      >
                                        <XCircle size={16} />
                                      </button>
                                      <input
                                        placeholder="Question"
                                        value={faq.question || ""}
                                        onChange={e => updateFAQ(ministry.id, idx, "question", e.target.value)}
                                        className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-300"
                                      />
                                      <textarea
                                        placeholder="Answer"
                                        value={faq.answer || ""}
                                        onChange={e => updateFAQ(ministry.id, idx, "answer", e.target.value)}
                                        className="w-full bg-transparent min-h-[60px] text-xs font-medium text-slate-500 outline-none resize-none placeholder:text-slate-300"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </section>
                            </div>

                            {/* Right Column: Media & Assets */}
                            <div className="space-y-8 lg:col-span-5">
                              {/* STYLES & CONFIG */}
                              <section className="space-y-6 rounded-3xl bg-slate-50 p-6">
                                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                                  <Palette size={16} className="text-emerald-500" />
                                  <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Styling & Config</h4>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Theme Color</label>
                                  <div className="flex items-center gap-3">
                                    <input
                                      value={ministry.color || ""}
                                      onChange={e => handleUpdate(ministry.id, { color: e.target.value })}
                                      className="flex-1 rounded-xl bg-white px-4 py-2.5 text-xs font-bold ring-1 ring-slate-200 transition-all outline-none focus:ring-emerald-200"
                                      placeholder="e.g. emerald, blue, rose..."
                                    />
                                    <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: ministry.color || "transparent" }} />
                                  </div>
                                </div>
                              </section>

                              {/* MEDIA ASSETS */}
                              <section className="space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                  <ImageIcon size={16} className="text-emerald-500" />
                                  <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Photo Gallery</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
                                  {(ministry.photos || []).map((photo, idx) => (
                                    <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 group/img">
                                      <ImagePicker
                                        label=""
                                        value={photo}
                                        onChange={(newId) => {
                                          const newPhotos = [...(ministry.photos || [])]
                                          newPhotos[idx] = newId
                                          handleUpdate(ministry.id, { photos: newPhotos })
                                        }}
                                        bucket="brand-assets"
                                      />
                                      <button
                                        onClick={() => {
                                          const newPhotos = (ministry.photos || []).filter((_, i) => i !== idx)
                                          handleUpdate(ministry.id, { photos: newPhotos })
                                        }}
                                        className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity backdrop-blur-md group-hover/img:opacity-100"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => handleUpdate(ministry.id, { photos: [...(ministry.photos || []), ""] })}
                                    className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-100"
                                  >
                                    <PlusCircle size={24} />
                                    <span className="text-[9px] font-black tracking-widest uppercase">Add Image</span>
                                  </button>
                                </div>
                              </section>

                              {/* RESOURCES / DOWNLOADS */}
                              <section className="space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                                  <FileText size={16} className="text-emerald-500" />
                                  <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Documents & Links</h4>
                                </div>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Main Promo PDF</span>
                                    <div className="flex items-center gap-2">
                                      <input
                                        placeholder="Title"
                                        value={ministry.pdf?.title || ""}
                                        onChange={e => handleUpdate(ministry.id, { pdf: { ...ministry.pdf, title: e.target.value } as any })}
                                        className="w-1/3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold"
                                      />
                                      <input
                                        placeholder="URL / File Path"
                                        value={ministry.pdf?.src || ""}
                                        onChange={e => handleUpdate(ministry.id, { pdf: { ...ministry.pdf, src: e.target.value } as any })}
                                        className="flex-1 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </div>

                          {/* Expansion Area Footer */}
                          <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
                            <button
                              onClick={() => handleDelete(ministry.id)}
                              className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={18} /> Delete Ministry
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
