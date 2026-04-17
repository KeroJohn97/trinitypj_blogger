// src/services/small-group-activity-service.ts
export interface SmallGroupActivity {
  id: string
  image_id: string
  caption: string
  sort_order: number
  is_active: boolean
  media_assets?: {
    storage_path: string
  }
}

export const groupActivityService = {
  async getAll(): Promise<SmallGroupActivity[]> {
    const res: any = await fetch("/api/small-group-activities")
    if (!res.ok) throw new Error("Failed to fetch activities")
    return res.json()
  },

  async publish(activities: SmallGroupActivity[]) {
    const res = await fetch("/api/small-group-activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activities),
    })
    if (!res.ok) throw new Error("Failed to publish activities")
    return res.json()
  },

  async delete(id: string) {
    const res = await fetch(`/api/small-group-activities?id=${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete activity")
    return res.json()
  }
}
