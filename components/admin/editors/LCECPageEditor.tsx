"use client"
import { useDialog } from "@/context/dialog-context"
import { NavigationGuardProvider, useNavigationGuard } from "@/context/navigation-guard-context"
import ImagePicker from "components/ImagePicker"
import { Loader2, Save, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import AdminHeader from "../AdminHeader"

export default function LCECPageEditor() {
  const { alert } = useDialog()
  const [data, setData] = useState<any>(null)
  const [originalData, setOriginalData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { setIsDirty } = useNavigationGuard()

  useEffect(() => {
    loadLCECSettings()
  }, [])

  const loadLCECSettings = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/lcec-settings")
      const fetchedData: any = await res.json()
      // Initialise empty if not found
      const cleanData = Object.keys(fetchedData).length > 0 ? fetchedData : { banner_image_id: null, chart_image_id: null }
      setData(cleanData)
      setOriginalData(cleanData)
    } catch (error) {
      console.error(error)
      await alert("Failed to load LCEC settings", "Error")
    } finally {
      setIsLoading(false)
    }
  }

  const isDirty = useMemo(() => {
    if (!data || !originalData) return false
    return JSON.stringify(data) !== JSON.stringify(originalData)
  }, [data, originalData])

  useEffect(() => {
    setIsDirty(isDirty)
    return () => setIsDirty(false)
  }, [isDirty, setIsDirty])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty])

  const handleUpdate = (field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    try {
      const res = await fetch("/api/lcec-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body: any = await res.json().catch(() => ({}))
        throw new Error(body.error || "Failed to save LCEC settings")
      }

      const responseData: any = await res.json()
      setData(responseData.data)
      setOriginalData(responseData.data)
      await alert("LCEC Settings saved successfully!", "Success")
    } catch (error: any) {
      console.error(error)
      await alert(error.message, "Error")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <NavigationGuardProvider>
      <div className="animate-in fade-in space-y-6 duration-700">
        <AdminHeader
          title="LCEC Page Configuration"
          subtitle="Manage the images displayed on the Local Church Executive Committee page."
          primaryAction={{
            label: "Publish Changes",
            onClick: handlePublish,
            icon: <Save size={18} />,
            loading: isSaving,
            disabled: !isDirty,
            className: isDirty ? "bg-emerald-600 shadow-emerald-100" : "bg-slate-900 shadow-slate-200",
          }}
          secondaryAction={{
            label: "Cancel",
            onClick: () => {
              setData(originalData)
            },
            icon: <X size={18} />,

          }}
        />

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">LCEC Page Banner</h3>
                <p className="text-sm text-slate-500">The main cover photo at the top of the LCEC page.</p>
              </div>
              <ImagePicker
                label="Select Banner Image"
                value={data?.banner_image_id || ""}
                onChange={(val) => handleUpdate("banner_image_id", val)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">LCEC Organization Chart</h3>
                <p className="text-sm text-slate-500">The primary content poster detailing the organization structure.</p>
              </div>
              <ImagePicker
                label="Select Chart Image"
                value={data?.chart_image_id || ""}
                onChange={(val) => handleUpdate("chart_image_id", val)}
              />
            </div>
          </div>
        </div>
      </div>
    </NavigationGuardProvider>
  )
}
