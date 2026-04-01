import { GatheringItem } from "@/types/website"

// services/gathering-service.ts
export const gatheringService = {
  async getAll(): Promise<GatheringItem[]> {
    const res = await fetch('/api/gatherings');
    const data = await res.json();
    
    // If the response is not an array, it's likely an error object
    if (!Array.isArray(data)) {
      console.error("Server Error Object:", data);
      return []; // Return empty array so the .map doesn't crash
    }
    
    // Map snake_case from DB back to camelCase for Frontend
    return data.map((item: any) => ({
      id: item.id,
      type: item.type,
      isActive: item.is_active, // Map is_active back to isActive
      title: item.title,
      day: item.day,
      time: item.time,
      venue: item.venue,
      mode: item.mode,
      leader: item.leader,
      contact: item.contact,
      note: item.note
    }));
  },

  async update(id: string, data: Partial<GatheringItem>) {
    const res = await fetch(`/api/gatherings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async create(data: GatheringItem) {
    const res = await fetch("/api/gatherings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  async delete(id: string) {
    const res = await fetch(`/api/gatherings/${id}`, {
      method: "DELETE",
    })
    return res.json()
  },

  // Bulk Publish helper for your "Publish" button
  async bulkPublish(items: GatheringItem[]) {
    // This maps through items and performs updates/creates
    const promises = items.map((item) => {
      return item.id.includes("-") // Check if it's a temp UI ID or a UUID from DB
        ? this.update(item.id, item)
        : this.create(item)
    })
    return Promise.all(promises)
  },
}
