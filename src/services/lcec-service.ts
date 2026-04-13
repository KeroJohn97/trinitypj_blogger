import { supabase as defaultSupabase } from "@/lib/supabase"

export const lcecService = {
  // Translate DB (snake_case) -> UI (camelCase)
  mapFromDb(dbData: any) {
    if (!dbData) return null
    return {
      banner_image_id: dbData.banner_image_id || null,
      chart_image_id: dbData.chart_image_id || null,
      bannerUrl: dbData.banner_media?.storage_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dbData.banner_media.storage_path}`
        : null,
      chartUrl: dbData.chart_media?.storage_path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dbData.chart_media.storage_path}`
        : null,
    }
  },

  // Translate UI (camelCase) -> DB (snake_case)
  mapToDb(uiData: any) {
    return {
      id: 1, // Singleton row
      banner_image_id: uiData.banner_image_id || null,
      chart_image_id: uiData.chart_image_id || null,
      updated_at: new Date().toISOString(),
    }
  },

  async getSettings(supabaseClient = defaultSupabase) {
    const { data, error } = await supabaseClient
      .from("lcec_settings")
      .select(`
        *,
        banner_media:media_assets!banner_image_id(storage_path),
        chart_media:media_assets!chart_image_id(storage_path)
      `)
      .eq("id", 1)
      .single()

    if (error && error.code !== "PGRST116") throw error // Ignore "not found"
    return this.mapFromDb(data)
  },

  async saveSettings(formData: any, supabaseClient = defaultSupabase) {
    const payload = this.mapToDb(formData)
    const { error } = await supabaseClient.from("lcec_settings").upsert(payload)

    if (error) throw error
    // Re-fetch to get joined media URLs
    return this.getSettings(supabaseClient)
  },
}
