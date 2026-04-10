// lib/db/website.ts
import { supabase } from "@/lib/supabase" // Ensure this path is correct
import { SiteData, DEFAULT_SITE_DATA } from "@/types/website"
import "server-only"

export async function getWebsiteSettings(): Promise<SiteData> {
  try {
    // 1. Fetch the singleton record from the "WebsiteSettings" table
    const { data: settings, error } = await supabase.from("WebsiteSettings").select("*").single()

    // 2. Handle "No Data" gracefully
    // PGRST116 is the Supabase error for "The query returned 0 rows"
    if (error?.code === "PGRST116" || !settings) {
      return {
        ...DEFAULT_SITE_DATA,
        title: "Trinity Methodist Church PJ",
        primaryColor: "#2563eb",
        description: "Welcome to our community portal.",
      }
    }

    // 3. If there's a real database error (not just missing rows), throw it
    if (error) throw error

    // 4. Return the data mapped to your SiteData interface
    return {
      ...DEFAULT_SITE_DATA,
      title: settings.title,
      primaryColor: settings.primaryColor,
      logo_image_id: settings.logo_image_id || settings.logoUrl || "",
      description: settings.description || "",
      socialLinks: (settings.socialLinks as any) || DEFAULT_SITE_DATA.socialLinks,
    }
  } catch (error) {
    // This catches network issues or RLS permission failures
    console.error("Supabase fetch failed, using emergency defaults:", error)
    return {
      ...DEFAULT_SITE_DATA,
      title: "Emergency Default",
      primaryColor: "#000000",
      description: "Database connection lost.",
    }
  }
}
