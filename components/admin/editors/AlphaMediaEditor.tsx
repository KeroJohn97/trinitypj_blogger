"use client"
import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import ImagePicker from "components/ImagePicker"
import { FileImage, LayoutGrid, Loader2, Plus, Save, Trash2, Video, Youtube } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AdminHeader from "../AdminHeader"

type EditorCategory = "images" | "videos" | "posters"

interface LocalMediaItem {
  id: string
  category: EditorCategory
  type: "video" | "image"
  youtubeId?: string
  image_id?: string
  title?: string
  description?: string
  sort_order: number
  language?: "en" | "zh" | "ms"
  reg_qr_id_physical?: string
  reg_qr_id_online?: string
}

export default function AlphaMediaEditor() {
  const { confirm, alert } = useDialog()
  const { setIsDirty } = useNavigationGuard()

  const [activeTab, setActiveTab] = useState<EditorCategory>("images")
  const [items, setItems] = useState<LocalMediaItem[]>([])
  const [originalItems, setOriginalItems] = useState<LocalMediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const isDirty = useMemo(() => {
    return JSON.stringify(items) !== JSON.stringify(originalItems)
  }, [items, originalItems])

  useEffect(() => {
    setIsDirty(isDirty)
    return () => setIsDirty(false)
  }, [isDirty, setIsDirty])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/alpha-media")
      const data: any = await res.json()

      if (res.ok && Array.isArray(data)) {
        setItems(data as LocalMediaItem[])
        setOriginalItems(data as LocalMediaItem[])
      } else {
        console.error("Failed to load Alpha media:", data.error || data)
        setItems([])
        setOriginalItems([])
      }
    } catch (error) {
      console.error(error)
      setItems([])
      setOriginalItems([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAdd = () => {
    let newItem: LocalMediaItem = {
      id: `temp-${Date.now()}`,
      category: "journey",
      type: "image",
      youtubeId: "",
      image_id: "",
      title: "",
      description: "",
      sort_order: items.length
    }

    if (activeTab === "videos") {
      newItem.type = "video"
    } else if (activeTab === "posters") {
      newItem.category = "advertising"
    }

    setItems([...items, newItem])
  }

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm("Are you sure you want to delete this item?", "Confirm Removal", true)
    if (!isConfirmed) return

    if (id.startsWith("temp-")) {
      setItems(items.filter(i => i.id !== id))
      return
    }

    try {
      const res = await fetch(`/api/alpha-media?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        setItems(items.filter(i => i.id !== id))
        setOriginalItems(originalItems.filter(i => i.id !== id))
      } else {
        throw new Error("Deletion failed")
      }
    } catch (error: any) {
      await alert(error.message, "Error")
    }
  }

  const handleUpdate = (id: string, updates: Partial<LocalMediaItem>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/alpha-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      })

      if (!res.ok) {
        const body: any = await res.json().catch(() => ({}))
        throw new Error(body.error || "Failed to save changes")
      }

      await loadData()
      await alert("Alpha content updated successfully!", "Success")
    } catch (error: any) {
      await alert(error.message, "Error")
    } finally {
      setIsSaving(false)
    }
  }

  const currentItems = items
    .filter(i => {
      if (activeTab === "images") return i.category === "journey" && i.type === "image"
      if (activeTab === "videos") return i.category === "journey" && i.type === "video"
      if (activeTab === "posters") return i.category === "advertising"
      return false
    })
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-emerald-500" /></div>
  }

  return (
    <NavigationGuardProvider>
      <div className="mx-auto max-w-6xl animate-in fade-in space-y-12 px-4 py-12 duration-1000 md:px-8">
        {/* CINEMA HEADER */}
        <div className="flex flex-col gap-10 border-b-2 border-slate-100 pb-12 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-5">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-7xl">Alpha Content</h1>
              {isDirty ? (
                <span className="flex animate-pulse items-center gap-2.5 rounded-full bg-amber-50 px-5 py-2 text-xs font-black tracking-widest text-amber-600 uppercase ring-2 ring-amber-100">
                  Save Required
                </span>
              ) : (
                <span className="flex items-center gap-2.5 rounded-full bg-emerald-50 px-5 py-2 text-xs font-black tracking-widest text-emerald-600 uppercase ring-2 ring-emerald-100">
                  Live & Online
                </span>
              )}
            </div>
            <p className="max-w-2xl text-lg font-medium text-slate-500/70 leading-relaxed">
              Curate and manage your mission-critical media assets for the Alpha Experience.
            </p>
          </div>

          <button
            onClick={handlePublish}
            disabled={isSaving || !isDirty}
            className={`flex items-center justify-center gap-4 rounded-[32px] px-12 py-5 text-base font-black text-white transition-all active:scale-95 disabled:opacity-20 shadow-2xl ${
              isDirty ? "bg-emerald-600 shadow-emerald-200" : "bg-slate-900"
            }`}
          >
            {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
            {isSaving ? "Saving..." : isDirty ? "Publish Changes" : "Already Live"}
          </button>
        </div>

        {/* NAVIGATION & ACTIONS */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        {/* Category Tabs */}
        <div className="flex w-fit items-center gap-2 rounded-[28px] bg-slate-100 p-2 shadow-inner">
          <button
            onClick={() => setActiveTab("images")}
            className={`flex items-center gap-3 rounded-[24px] px-10 py-3.5 text-sm font-black transition-all ${
              activeTab === "images" ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <FileImage size={20} /> Images
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-3 rounded-[24px] px-10 py-3.5 text-sm font-black transition-all ${
              activeTab === "videos" ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Youtube size={20} /> Videos
          </button>
          <button
            onClick={() => setActiveTab("posters")}
            className={`flex items-center gap-3 rounded-[24px] px-10 py-3.5 text-sm font-black transition-all ${
              activeTab === "posters" ? "bg-white text-emerald-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LayoutGrid size={20} /> Posters
          </button>
        </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAdd}
              className={`group flex items-center gap-3 rounded-[24px] px-8 py-4 text-sm font-black text-white transition-all hover:scale-105 active:scale-95 ${
                activeTab === "videos" ? "bg-red-600" : "bg-slate-900"
              }`}
            >
              <Plus size={20} className="transition-transform group-hover:rotate-90" />
              Add {activeTab === "images" ? "Image" : activeTab === "videos" ? "Video" : "Poster"}
            </button>
          </div>
        </div>

        {/* CINEMA GRID (Single Column Focus) */}
        <div className="grid grid-cols-1 gap-12">
          {currentItems.length === 0 ? (
            <div className="py-32 text-center rounded-[4rem] bg-slate-50 border-4 border-dashed border-slate-100">
              <p className="text-2xl font-black text-slate-200 uppercase tracking-tighter">Your gallery is waiting...</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-[4rem] bg-white ring-2 ring-slate-100 transition-all duration-700 hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.12)] hover:ring-emerald-200"
              >
                {/* LARGE MEDIA ROW */}
                <div className="flex flex-col xl:flex-row">
                  {/* Hero Media Block */}
                  <div className="w-full xl:w-2/3 p-10">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400">Primary Curated Asset</label>
                        <span className="text-[12px] font-black text-slate-300">#{(index + 1).toString().padStart(2, '0')}</span>
                      </div>
                      <div className="relative aspect-video overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-1 ring-slate-100">
                        {item.type === "video" ? (
                          <div className="relative h-full w-full">
                            {item.youtubeId ? (
                              <img
                                src={`https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center bg-slate-100">
                                <Video className="text-slate-200" size={64} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>
                        ) : (
                          <ImagePicker
                            value={item.image_id || ""}
                            onChange={(val) => handleUpdate(item.id, { image_id: val })}
                            label=""
                            aspectRatio="video"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* High-Scale Options Block */}
                  <div className="flex flex-1 flex-col justify-between border-t border-slate-50 p-10 xl:border-l xl:border-t-0 bg-slate-50/30">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Identity</label>
                        <input
                          value={item.title || ""}
                          onChange={(e) => handleUpdate(item.id, { title: e.target.value })}
                          placeholder="What is this item titled?"
                          className="w-full rounded-[24px] bg-white border-none px-6 py-5 text-xl font-black text-slate-900 shadow-sm outline-none ring-1 ring-slate-100 transition-all focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>

                      {item.category === "advertising" ? (
                        <div className="space-y-4">
                          <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Course Registration (QRs)</label>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <ImagePicker
                                value={item.reg_qr_id_physical || ""}
                                onChange={(val) => handleUpdate(item.id, { reg_qr_id_physical: val })}
                                label=""
                                aspectRatio="square"
                              />
                              <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Physical</p>
                            </div>
                            <div className="space-y-3">
                              <ImagePicker
                                value={item.reg_qr_id_online || ""}
                                onChange={(val) => handleUpdate(item.id, { reg_qr_id_online: val })}
                                label=""
                                aspectRatio="square"
                              />
                              <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Online</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                         <div className="space-y-2">
                            <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 px-1">Specifics</label>
                            <div className="flex h-[80px] items-center px-6 bg-white/50 rounded-[24px] ring-1 ring-slate-100 text-sm font-bold text-slate-400">
                               Journey Gallery Asset
                            </div>
                         </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="mt-8 flex items-center justify-center gap-2 rounded-[24px] bg-red-50 py-4 text-xs font-black text-red-500 transition-all hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} /> Delete Curated Item
                    </button>
                  </div>
                </div>

                {/* EXPANDED CONTENT FOOTER */}
                <div className="grid grid-cols-1 xl:grid-cols-2 border-t border-slate-100 bg-white">
                   <div className="p-10 space-y-3 border-b xl:border-b-0 xl:border-r border-slate-100">
                      <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Context & Story</label>
                      <textarea
                        value={item.description || ""}
                        onChange={(e) => handleUpdate(item.id, { description: e.target.value })}
                        placeholder="Add some depth to this media asset..."
                        rows={4}
                        className="w-full rounded-[24px] bg-slate-50 border-none px-6 py-5 text-base font-medium text-slate-600 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-500/5 ring-1 ring-transparent resize-none"
                      />
                   </div>
                   <div className="p-10 space-y-8 bg-slate-50/20">
                      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Type Specifics</label>
                          <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
                             <p className="text-lg font-black text-slate-700">{item.type.toUpperCase()}</p>
                             <p className="text-[10px] font-bold text-slate-400">Content category</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[12px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">Configuration</label>
                           {item.type === "video" ? (
                              <input
                                value={item.youtubeId || ""}
                                onChange={(e) => handleUpdate(item.id, { youtubeId: e.target.value })}
                                placeholder="YouTube ID"
                                className="w-full rounded-[24px] bg-red-50 px-6 py-5 text-base font-black text-red-600 outline-none ring-2 ring-red-100"
                              />
                           ) : (
                              <select
                                value={item.language || ""}
                                onChange={(e) => handleUpdate(item.id, { language: e.target.value as any })}
                                className="w-full appearance-none rounded-[24px] bg-blue-50 px-6 py-5 text-base font-black text-blue-600 outline-none ring-2 ring-blue-100"
                              >
                                <option value="">Auto Select</option>
                                <option value="en">English</option>
                                <option value="zh">Mandarin</option>
                                <option value="ms">Malay</option>
                              </select>
                           )}
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </NavigationGuardProvider>
  )
}
