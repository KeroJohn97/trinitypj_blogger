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
  private static readonly TABLE = "web_landing_notices"

  static async getAll(onlyActive = true) {
    try {
      let query = supabase
        .from(this.TABLE)
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
        console.warn(`${this.TABLE} table might be missing or inaccessible:`, error.message)
        return []
      }
      return (data || []) as LandingNotice[]
    } catch (e) {
      console.error(`Critical error fetching ${this.TABLE}:`, e)
      return []
    }
  }

  static async publish(items: LandingNotice[]) {
    // 1. Split into updates (UUID) and inserts (Temp IDs)
    const updates = items
      .filter((item) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id))
      .map((item, index) => {
        const { media_assets, ...clean } = item
        return { ...clean, sort_order: index }
      })

    const inserts = items
      .filter((item) => !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(item.id))
      .map((item, index) => {
        const { media_assets, id, ...clean } = item
        return { ...clean, sort_order: index }
      })

    let results: LandingNotice[] = []

    if (updates.length > 0) {
      const { data: updateData, error: updateError } = await supabase
        .from(this.TABLE)
        .upsert(updates)
        .select(`*, media_assets (storage_path)`)
      if (updateError) throw updateError
      if (updateData) results = [...results, ...(updateData as LandingNotice[])]
    }

    if (inserts.length > 0) {
      const { data: insertData, error: insertError } = await supabase
        .from(this.TABLE)
        .insert(inserts)
        .select(`*, media_assets (storage_path)`)
      if (insertError) throw insertError
      if (insertData) results = [...results, ...(insertData as LandingNotice[])]
    }

    return results.sort((a, b) => a.sort_order - b.sort_order)
  }

  static async delete(id: string) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return
    const { error } = await supabase.from(this.TABLE).delete().eq("id", id)
    if (error) throw error
  }
}
