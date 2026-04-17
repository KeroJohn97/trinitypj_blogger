import { supabase } from "@/lib/supabase"

export interface LandingNotice {
  id: string
  title: string
  description?: string
  image_id?: string
  video_url?: string
  link_url?: string
  link_label?: string
  sort_order: number
  is_active: boolean
  expiry_date?: string
  created_at?: string
  media_assets?: {
    storage_path: string
  }
}

export class LandingNoticeService {
  static async getAll(onlyActive = true) {
    try {
      let query = supabase
        .from("landing_notices")
        .select(`
          *,
          media_assets (storage_path)
        `)
        .order("sort_order", { ascending: true })

      if (onlyActive) {
        query = query.eq("is_active", true)
      }

      const { data, error } = await query
      if (error) {
        console.warn("LandingNotices table might be missing or inaccessible:", error.message)
        return []
      }
      return (data || []) as LandingNotice[]
    } catch (e) {
      console.error("Critical error fetching landing notices:", e)
      return []
    }
  }

  static async publish(notices: LandingNotice[]) {
    const { data, error } = await supabase
      .from("landing_notices")
      .upsert(
        notices.map((n) => {
          const { media_assets, ...clean } = n
          return clean
        }),
        { onConflict: "id" }
      )
      .select()

    if (error) throw error
    return data
  }

  static async delete(id: string) {
    const { error } = await supabase.from("landing_notices").delete().eq("id", id)
    if (error) throw error
  }
}
