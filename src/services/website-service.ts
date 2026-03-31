// src/services/website-service.ts
import { supabase } from "@/lib/supabase"
import { SiteData } from "@/types/website"
import { storageHelpers } from "@/utils/storage-helpers"

export const websiteService = {
  async getSettings(): Promise<SiteData | null> {
    const response = await fetch("/api/website-settings")
    const result: any = await response.json()
    return result.success ? result.data : null
  },

  async saveSettings(data: SiteData) {
    console.log("🚀 SERVICE: Attempting to save...", data) // Log 1

    try {
      const response = await fetch("/api/website-settings", {
        // Verify this URL!
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      console.log("📡 SERVICE: Response status:", response.status) // Log 2

      const result = await response.json()
      console.log("✅ SERVICE: Full Result:", result) // Log 3

      return result
    } catch (error) {
      console.error("❌ SERVICE: Fetch crashed!", error) // Log 4
      throw error
    }
  },

  async uploadLogo(file: File): Promise<string> {
    const fileName = storageHelpers.generateFileName(file)

    const { error: uploadError } = await supabase.storage.from("logos").upload(fileName, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage.from("logos").getPublicUrl(fileName)

    return urlData.publicUrl
  },
}
