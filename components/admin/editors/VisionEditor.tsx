"use client"
import { VisionPillar, VisionService } from "@/services/vision-service"
import ImagePicker from "components/ImagePicker"
import { AlertCircle, CheckCircle2, Loader2, Plus, Save, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function VisionEditor() {
  const [pillars, setPillars] = useState<VisionPillar[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    const loadPillars = async () => {
      try {
        setIsLoading(true)
        const data = await VisionService.getAll()
        setPillars(data)
      } catch (error) {
        console.error("Fetch vision pillars error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPillars()
  }, [])

  const handleAddPillar = () => {
    const newPillar: VisionPillar = {
      id: `new-${Date.now()}`,
      title: "",
      description: "",
      image_id: null,
      sort_order: pillars.length
    }
    setPillars([...pillars, newPillar])
  }

  const handleRemovePillar = (id: string) => {
    setPillars(pillars.filter((p) => p.id !== id))
  }

  const updatePillar = (id: string, updates: Partial<VisionPillar>) => {
    setPillars(pillars.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setStatus("idle")
    try {
      const updated = await VisionService.saveAll(pillars)
      setPillars(updated)
      setStatus("success")
      setTimeout(() => setStatus("idle"), 3000)
    } catch (error) {
      console.error("Save error:", error)
      setStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vision & Mission</h2>
          <p className="text-sm text-gray-500">Manage the core identity pillars of the church.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white transition-all active:scale-95 disabled:opacity-50 ${status === "success" ? "bg-emerald-500" : status === "error" ? "bg-red-500" : "bg-slate-900"
            }`}
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : status === "success" ? (
            <CheckCircle2 size={18} />
          ) : status === "error" ? (
            <AlertCircle size={18} />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "Saving..." : status === "success" ? "Saved" : status === "error" ? "Error" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {pillars.map((pillar) => (
          <div key={pillar.id} className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex-row">
            {/* Image Picker */}
            <div className="w-full md:w-64 shrink-0">
              <ImagePicker
                label="Pillar Image"
                value={pillar.image_id || ""}
                onChange={(id) => updatePillar(pillar.id, { image_id: id || null })}
                bucket="brand-assets"
                aspectRatio="video"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 space-y-4">
              <input
                placeholder="Pillar Title (e.g. Our Mission)"
                className="w-full border-b border-transparent pb-1 text-xl font-bold outline-none focus:border-emerald-500 transition-colors"
                value={pillar.title}
                onChange={(e) => updatePillar(pillar.id, { title: e.target.value })}
              />
              <textarea
                placeholder="Describe this vision pillar..."
                className="h-24 w-full rounded-lg border-none bg-gray-50 p-3 text-sm text-gray-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={pillar.description}
                onChange={(e) => updatePillar(pillar.id, { description: e.target.value })}
              />
            </div>

            <button
              onClick={() => handleRemovePillar(pillar.id)}
              className="self-start p-2 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddPillar}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-6 font-bold text-gray-400 transition-all hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/30"
        >
          <Plus size={20} /> Add New Vision Pillar
        </button>
      </div>
    </div>
  )
}

