import { supabase } from "@/lib/supabase"

export class MediaAssetService {
  /**
   * Returns a map of all media assets: { [filename]: url }
   */
  static async getMediaMap(): Promise<Record<string, string>> {
    try {
      const { data, error } = await supabase
        .from("media_assets")
        .select("id, filename, storage_path")

      if (error) {
        console.warn("Could not fetch media_assets:", error.message)
        return {}
      }

      const map: Record<string, string> = {}
      if (data) {
        data.forEach((item) => {
          const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${item.storage_path}`
          
          if (item.id) {
            map[item.id] = publicUrl
          }
          if (item.filename) {
            map[item.filename] = publicUrl
          }
        })
      }
      return map
    } catch (e) {
      console.warn("Exception while fetching media_assets:", e)
      return {}
    }
  }

  /**
   * Helper function to extract a filename from a URL and lookup the override map.
   */
  static getUrl(fallbackUrl: string, mediaMap: Record<string, string>): string {
    const filename = fallbackUrl.split("/").pop() || ""
    return mediaMap[filename] || fallbackUrl
  }
}
