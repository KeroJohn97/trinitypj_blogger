import { UpcomingActivity } from "@/interface/upcoming-activity"
import { supabase } from "@/lib/supabase"

export const activityService = {
  /**
   * READ: Fetch all activities with their image paths
   */
  async getAll(): Promise<UpcomingActivity[]> {
    const { data, error } = await supabase
      .from("web_activities")
      .select(
        `
        *,
        media_assets (storage_path)
      `
      )
      .order("sort_order", { ascending: true })

    if (error) throw error
    return data || []
  },

  /**
   * CREATE: Add a new activity
   */
  async create(activities: Partial<UpcomingActivity>[]) {
    const { data, error } = await supabase
      .from("web_activities")
      .insert(activities) // Supabase .insert() accepts arrays for bulk creation
      .select()

    if (error) throw error
    return data
  },

  /**
   * UPDATE: Update existing activity fields
   */
  async update(id: number, updates: Partial<UpcomingActivity>) {
    const { data, error } = await supabase.from("web_activities").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  },

  /**
   * DELETE: Remove an activity
   */
  async delete(id: number) {
    const { error } = await supabase.from("web_activities").delete().eq("id", id)

    if (error) throw error
    return true
  },

  /**
   * UTILITY: Reorder activities (for the carousel)
   */
  async updateOrder(items: { id: number; sort_order: number }[]) {
    const { error } = await supabase.from("web_activities").upsert(items)
    if (error) throw error
  },
}
