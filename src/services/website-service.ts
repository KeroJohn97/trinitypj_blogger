// src/services/website-service.ts
import { supabase } from "@/lib/supabase"

export const websiteService = {
  // Translate DB (snake_case) -> UI (camelCase)
  mapFromDb(dbData: any) {
    if (!dbData) return null
    return {
      title: dbData.title || "",
      description: dbData.description || "",
      primaryColor: dbData.primary_color || "#10b981",
      // Ensure this key is preserved exactly as used in the ImagePicker value
      logo_image_id: dbData.logo_image_id || null,
      socialLinks: dbData.social_links || { facebook: "", instagram: "", youtube: "" },
    }
  },

  // Translate UI (camelCase) -> DB (snake_case)
  mapToDb(uiData: any) {
    return {
      id: 1, // Singleton row
      title: uiData.title,
      description: uiData.description,
      primary_color: uiData.primaryColor,
      logo_image_id: uiData.logo_image_id,
      social_links: uiData.socialLinks,
      updated_at: new Date().toISOString(),
    }
  },

  async getSettings() {
    const { data, error } = await supabase.from("website_settings").select("*").eq("id", 1).single()

    if (error && error.code !== "PGRST116") throw error // Ignore "not found"
    return this.mapFromDb(data)
  },

  async saveSettings(formData: any) {
    const payload = this.mapToDb(formData)
    const { data, error } = await supabase.from("website_settings").upsert(payload).select()

    if (error) throw error
    return this.mapFromDb(data?.[0])
  },
}
