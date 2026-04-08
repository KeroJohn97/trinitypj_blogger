// components/admin/editors/ServiceTimesEditor.tsx
"use client"
import { websiteService } from "@/services/website-service"
import { Plus, Save, Trash2 } from "lucide-react"
import { useState } from "react"

interface ServiceTime {
  id: string
  time: string
  name: string
  location: string
}

export default function ServiceTimesEditor({ initialData }: { initialData: ServiceTime[] | undefined }) {
  const [services, setServices] = useState<ServiceTime[]>(initialData || [])
  const [isSaving, setIsSaving] = useState(false)

  const addService = () => {
    const newService = { id: Date.now().toString(), time: "", name: "", location: "" }
    setServices([...services, newService])
  }

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const updateService = (id: string, field: keyof ServiceTime, value: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // We assume your websiteService.saveSettings handles the full SiteData object
      // You may need to fetch the current formData first or pass it as a prop
      await websiteService.saveSettings({ serviceTimes: services } as any)
      alert("Service times updated!")
    } catch (error) {
      alert("Failed to save service times.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Service Times</h2>
          <p className="text-sm text-gray-500">Manage your weekly worship schedule.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700 disabled:bg-gray-400"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Publish Changes"}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Time</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Service Name</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
              <th className="w-16 p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service.id} className="group hover:bg-gray-50">
                <td className="p-4">
                  <input
                    type="text"
                    placeholder="e.g. 8:30 AM"
                    value={service.time}
                    onChange={(e) => updateService(service.id, "time", e.target.value)}
                    className="w-full border-b border-transparent bg-transparent p-1 transition-all outline-none group-hover:border-gray-200 focus:border-emerald-500"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    placeholder="e.g. Traditional Service"
                    value={service.name}
                    onChange={(e) => updateService(service.id, "name", e.target.value)}
                    className="w-full border-b border-transparent bg-transparent p-1 transition-all outline-none group-hover:border-gray-200 focus:border-emerald-500"
                  />
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    placeholder="e.g. Sanctuary"
                    value={service.location}
                    onChange={(e) => updateService(service.id, "location", e.target.value)}
                    className="w-full border-b border-transparent bg-transparent p-1 transition-all outline-none group-hover:border-gray-200 focus:border-emerald-500"
                  />
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => removeService(service.id)}
                    className="text-gray-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-8 text-center text-gray-400 italic">
            No services added. Click the button below to start.
          </div>
        )}

        <div className="border-t bg-gray-50 p-4">
          <button
            onClick={addService}
            className="flex items-center gap-2 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-800"
          >
            <Plus size={18} />
            Add Another Service
          </button>
        </div>
      </div>
    </div>
  )
}
