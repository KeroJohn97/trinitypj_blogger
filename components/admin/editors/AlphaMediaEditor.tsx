"use client"
import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import ImagePicker from "components/ImagePicker"
import { FileImage, LayoutGrid, Loader2, Plus, Save, Trash2, Video, Youtube } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AdminHeader from "../AdminHeader"
import { alphaService } from "@/services/alpha-service"
import { scanQRCodeFromUrl } from "@/utils/qr-utils"

type EditorCategory = "images" | "videos" | "posters"

interface LocalMediaItem {
  id: string
  category: "journey" | "advertising"
  type: "video" | "image"
  youtubeId?: string
  image_id?: string
  title?: string
  description?: string
  sort_order: number
  language?: "en" | "zh" | "ms"
  reg_qr_id_physical?: string
  reg_qr_id_online?: string
  reg_url_physical?: string
  reg_url_online?: string
  additional_image_ids?: string[]
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

  const loadData = async (silent: boolean = false) => {
    try {
      if (!silent) setIsLoading(true)
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
      if (!silent) setIsLoading(false)
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
      language: "en", // Default to EN for safety
      reg_qr_id_physical: "",
      reg_qr_id_online: "",
      reg_url_physical: "",
      reg_url_online: "",
      additional_image_ids: [],
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
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i))
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
        let errorMsg = "Failed to save changes"
        try {
          const body: any = await res.json()
          errorMsg = body.error || errorMsg
          if (body.detail) errorMsg += `\n\nDetail: ${body.detail}`
          if (body.hint) errorMsg += `\n\nHint: ${body.hint}`
        } catch (e) {
          // If JSON parse fails, show the status text
          errorMsg = `Server Error (${res.status}): ${res.statusText}`
        }
        throw new Error(errorMsg)
      }

      await loadData(true)
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
      <div className="mx-auto max-w-5xl animate-in fade-in space-y-8 px-4 py-6 duration-700 md:px-0 md:py-10">
        <AdminHeader
          title="Alpha Content"
          subtitle="Manage mission-critical images, videos, and advertising posters."
          primaryAction={{
            label: isSaving ? "Saving..." : isDirty ? "Publish Changes" : "Save Changes",
            onClick: handlePublish,
            icon: isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />,
            disabled: isSaving || !isDirty,
            loading: isSaving,
            className: isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900"
          }}
        />

        {/* REFINED NAVIGATION */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-fit items-center gap-1 rounded-2xl bg-slate-100 p-1.5">
            {[
              { id: 'images', label: 'Images', icon: <FileImage size={18} /> },
              { id: 'videos', label: 'Videos', icon: <Youtube size={18} /> },
              { id: 'posters', label: 'Posters', icon: <LayoutGrid size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as EditorCategory)}
                className={`flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-sm font-bold transition-all ${activeTab === tab.id
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 shadow-lg shadow-slate-200"
          >
            <Plus size={18} /> Add {activeTab === "images" ? "Image" : activeTab === "videos" ? "Video" : "Poster"}
          </button>
        </div>

        {/* MINIMALIST GRID */}
        <div className="space-y-6">
          {currentItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-300">
                <FileImage size={40} />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">No items found in this category</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative rounded-3xl border border-slate-100 bg-white p-5 transition-all"
              >
                <div className="flex flex-col gap-8 lg:flex-row">
                  {/* MEDIA PREVIEW */}
                  <div className={`shrink-0 overflow-hidden rounded-2xl ${activeTab === 'posters' ? 'w-full lg:w-48 xl:w-56' : 'w-full lg:w-64 xl:w-72'}`}>
                    <div className="relative aspect-video lg:aspect-square">
                      {item.type === "video" ? (
                        <div className="h-full w-full">
                          {item.youtubeId ? (
                            <img
                              src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Video className="text-slate-200" size={32} />
                            </div>
                          )}
                        </div>
                      ) : (
                        <ImagePicker
                          value={item.image_id || ""}
                          onChange={(val) => handleUpdate(item.id, { image_id: val })}
                          label=""
                          aspectRatio={activeTab === 'posters' ? "square" : "video"}
                        />
                      )}
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <div className="flex flex-1 flex-col justify-between space-y-6 lg:space-y-0">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                      <div className="lg:col-span-12 xl:col-span-8 space-y-1 bg-slate-50/10 p-4 rounded-2xl">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Identity</label>
                        <input
                          value={item.title || ""}
                          onChange={(e) => handleUpdate(item.id, { title: e.target.value })}
                          placeholder="Title or label..."
                          className="w-full bg-transparent p-0 text-lg font-bold text-slate-900 outline-none placeholder:text-slate-200"
                        />
                        <textarea
                          value={item.description || ""}
                          onChange={(e) => handleUpdate(item.id, { description: e.target.value })}
                          placeholder="Add description..."
                          rows={2}
                          className="w-full bg-transparent text-sm font-medium text-slate-500 outline-none placeholder:text-slate-300 resize-none"
                        />
                      </div>

                      {/* ZONE 3: EDITORIAL CONTROLS */}
                      {activeTab === 'posters' && (
                        <div className="lg:col-span-4">
                          <div className="flex flex-col space-y-6">
                            {/* Language Selector */}
                            <div className="flex flex-col space-y-3">
                              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Language Pack</label>
                              <div className="flex flex-wrap gap-2">
                                {["en", "zh", "ms"].map((lang) => (
                                  <button
                                    key={lang}
                                    onClick={() => handleUpdate(item.id, { language: lang as any })}
                                    className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${item.language === lang
                                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                                      : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                      }`}
                                  >
                                    {lang === "en" ? "English" : lang === "zh" ? "Chinese" : "Malay"}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Poster Gallery */}
                            <div className="flex flex-col space-y-4">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Poster Gallery</label>
                                <button
                                  onClick={() => {
                                    const current = item.additional_image_ids || []
                                    handleUpdate(item.id, { additional_image_ids: [...current, ""] })
                                  }}
                                  className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-tighter text-emerald-600 hover:text-emerald-700"
                                >
                                  <Plus size={12} />
                                  <span>Add Image</span>
                                </button>
                              </div>

                              <div className="space-y-3">
                                {(item.additional_image_ids || []).map((imgId, idx) => (
                                  <div key={idx} className="group/gallery relative">
                                    <ImagePicker
                                      label=""
                                      value={imgId}
                                      onChange={(val) => {
                                        const newIds = [...(item.additional_image_ids || [])]
                                        newIds[idx] = val
                                        handleUpdate(item.id, { additional_image_ids: newIds })
                                      }}
                                      aspectRatio="video"
                                    />
                                    <button
                                      onClick={() => {
                                        const newIds = (item.additional_image_ids || []).filter((_, i) => i !== idx)
                                        handleUpdate(item.id, { additional_image_ids: newIds })
                                      }}
                                      className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-opacity group-hover/gallery:opacity-100"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                ))}
                                {(item.additional_image_ids || []).length === 0 && (
                                  <div className="flex h-20 items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/50">
                                    <p className="text-[10px] font-medium text-slate-400">No additional images</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                     {/* QR SECTION FOR POSTERS */}
                     {activeTab === 'posters' && (
                       <div className="mt-6 space-y-8 pt-6 border-t border-slate-50">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           {/* Physical QR Section */}
                           <div className="flex flex-col space-y-4">
                             <div className="flex items-center gap-4">
                               <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100">
                                 <ImagePicker
                                   value={item.reg_qr_id_physical || ""}
                                   onChange={async (val) => {
                                     // 1. Always update the ID first (Crucial for UI)
                                     handleUpdate(item.id, { reg_qr_id_physical: val });
                                     
                                     // 2. Attempt Auto-Scan defensively
                                     if (!val) return;
                                     try {
                                       const asset = await alphaService.getAsset(val);
                                       if (asset?.storage_path) {
                                         const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${asset.storage_path}`;
                                         const decoded = await scanQRCodeFromUrl(url);
                                         if (decoded) handleUpdate(item.id, { reg_url_physical: decoded });
                                       }
                                     } catch (err) {
                                       console.error("[AUTO_SCAN] Error scanning physical QR:", err);
                                     }
                                   }}
                                   label=""
                                   aspectRatio="square"
                                 />
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Physical Registration</p>
                                 <p className="text-xs font-semibold text-slate-600">Scan code for manual signup</p>
                               </div>
                             </div>
                             <div className="flex flex-col space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registration Link (Physical)</label>
                               <input 
                                 type="text"
                                 value={item.reg_url_physical || ""}
                                 onChange={(e) => handleUpdate(item.id, { reg_url_physical: e.target.value })}
                                 placeholder="Paste Form or Signup URL"
                                 className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-semibold text-emerald-600 outline-none ring-1 ring-slate-100 focus:ring-emerald-200 transition-all"
                               />
                             </div>
                           </div>

                           {/* Online QR Section */}
                           <div className="flex flex-col space-y-4">
                             <div className="flex items-center gap-4">
                               <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-100">
                                 <ImagePicker
                                   value={item.reg_qr_id_online || ""}
                                   onChange={async (val) => {
                                     // 1. Always update the ID first (Crucial for UI)
                                     handleUpdate(item.id, { reg_qr_id_online: val });
                                     
                                     // 2. Attempt Auto-Scan defensively
                                     if (!val) return;
                                     try {
                                       const asset = await alphaService.getAsset(val);
                                       if (asset?.storage_path) {
                                         const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${asset.storage_path}`;
                                         const decoded = await scanQRCodeFromUrl(url);
                                         if (decoded) handleUpdate(item.id, { reg_url_online: decoded });
                                       }
                                     } catch (err) {
                                       console.error("[AUTO_SCAN] Error scanning online QR:", err);
                                     }
                                   }}
                                   label=""
                                   aspectRatio="square"
                                 />
                               </div>
                               <div className="space-y-1">
                                 <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Online Registration</p>
                                 <p className="text-xs font-semibold text-slate-600">Scan code for online course</p>
                               </div>
                             </div>
                             <div className="flex flex-col space-y-2">
                               <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Registration Link (Online)</label>
                               <input 
                                 type="text"
                                 value={item.reg_url_online || ""}
                                 onChange={(e) => handleUpdate(item.id, { reg_url_online: e.target.value })}
                                 placeholder="Paste Zoom or Webinar Link"
                                 className="w-full rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-semibold text-emerald-600 outline-none ring-1 ring-slate-100 focus:ring-emerald-200 transition-all"
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                     )}

                    {/* VIDEO CONFIG */}
                    {activeTab === 'videos' && (
                      <div className="flex items-center gap-3 bg-red-50 p-3 rounded-xl ring-1 ring-red-100 mt-4">
                        <Youtube size={16} className="text-red-500" />
                        <input
                          value={item.youtubeId || ""}
                          onChange={(e) => handleUpdate(item.id, { youtubeId: e.target.value })}
                          placeholder="Paste YouTube Video ID"
                          className="bg-transparent text-sm font-bold text-red-600 outline-none w-full"
                        />
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col justify-between border-t border-slate-50 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-2 rounded-xl p-2 text-slate-300 transition-all hover:bg-red-50 hover:text-red-500"
                      title="Delete Item"
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="hidden lg:block text-[10px] font-bold text-slate-200 uppercase">
                      ID: {item.id.slice(0, 4)}
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
