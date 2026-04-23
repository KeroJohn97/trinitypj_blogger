import { supabase } from "@/lib/supabase"

export interface VisionPillar {
  id: string
  title: string
  description: string
  image_id: string | null
  sort_order: number
  media_assets?: {
    storage_path: string
  }
}

export class VisionService {
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from("vision_pillars")
        .select(`
          *,
          media_assets (storage_path)
        `)
        .order("sort_order", { ascending: true })

      if (error) {
        console.warn("vision_pillars table might be missing or inaccessible:", error.message)
        return []
      }

      return (data || []) as VisionPillar[]
    } catch (e) {
      console.error("Critical error fetching vision pillars:", e)
      return []
    }
  }

  static async saveAll(pillars: VisionPillar[]) {
    try {
      // 1. First, get all current IDs to identify which ones were deleted
      const { data: existing } = await supabase.from("vision_pillars").select("id")
      const currentIds = pillars.map(p => p.id).filter(id => !id.startsWith("new-"))
      const existingIds = existing?.map(e => e.id) || []
      const idsToDelete = existingIds.filter(id => !currentIds.includes(id))

      // 2. Perform deletions
      if (idsToDelete.length > 0) {
        await supabase.from("vision_pillars").delete().in("id", idsToDelete)
      }

      // 3. Split into updates and inserts
      const updates = pillars
        .filter((p) => !p.id.startsWith("new-"))
        .map((p, index) => {
          const { media_assets, ...clean } = p
          return { ...clean, sort_order: index }
        })

      const inserts = pillars
        .filter((p) => p.id.startsWith("new-"))
        .map((p, index) => {
          const { media_assets, id, ...clean } = p
          return { ...clean, sort_order: index }
        })

      // 4. Execute updates and inserts
      let results: VisionPillar[] = []

      if (updates.length > 0) {
        const { data: updateData, error: updateError } = await supabase
          .from("vision_pillars")
          .upsert(updates)
          .select(`*, media_assets (storage_path)`)
        if (updateError) throw updateError
        if (updateData) results = [...results, ...(updateData as VisionPillar[])]
      }

      if (inserts.length > 0) {
        const { data: insertData, error: insertError } = await supabase
          .from("vision_pillars")
          .insert(inserts)
          .select(`*, media_assets (storage_path)`)
        if (insertError) throw insertError
        if (insertData) results = [...results, ...(insertData as VisionPillar[])]
      }

      return results.sort((a, b) => a.sort_order - b.sort_order)
    } catch (e) {
      console.error("Save vision pillars error:", e)
      throw e
    }
  }

  static async delete(id: string) {
    if (id.startsWith("new-")) return
    const { error } = await supabase.from("vision_pillars").delete().eq("id", id)
    if (error) throw error
  }
}
