import { SmallGroup } from "@/types/website"

export const smallGroupService = {
  /**
   * Fetch and Map: Database -> Interface
   */
  async getAll(): Promise<SmallGroup[]> {
    const res = await fetch("/api/small-groups")
    const data = await res.json()

    if (!Array.isArray(data)) {
      console.error("Small Groups API Error:", data)
      return []
    }

    // We map the DB columns to your specific SmallGroup keys
    return data.map((item: any) => ({
      id: item.id,
      name: item.name || "",
      is_active: item.is_active ?? true,
      language: item.language || "English",
      zone: item.zone || "",
      leader_name: item.leader_name || "",
      contact_number: item.contact_number || "",
      meeting_time: item.meeting_time || "",
      meeting_day: item.meeting_day || "",
      location_area: item.location_area || "",
      is_featured: item.is_featured ?? false,
    }))
  },

  async update(id: string, updates: Partial<SmallGroup>) {
    // We map keys back to DB columns if your API expects the old names
    // If your API matches the interface, you can just send 'updates'
    const res = await fetch(`/api/small-groups/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    return res.json()
  },

  async create(data: SmallGroup) {
    const res = await fetch("/api/small-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async delete(id: string) {
    const res = await fetch(`/api/small-groups/${id}`, {
      method: "DELETE",
    })
    return res.json()
  },

  /**
   * Bulk Publish: Handles batch processing of the UI state
   */
  async bulkPublish(items: SmallGroup[], deletedIds: string[] = []) {
    // 1. Process Deletions
    const deletePromises = deletedIds.map((id) => this.delete(id))

    // 2. Process Upserts
    const upsertPromises = items.map((item) => {
      // Logic: If ID starts with 'temp-', it's a new group created in the UI
      return item.id.startsWith("temp-") ? this.create(item) : this.update(item.id, item)
    })

    return Promise.all([...deletePromises, ...upsertPromises])
  },
}
