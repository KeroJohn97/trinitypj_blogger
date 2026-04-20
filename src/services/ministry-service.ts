import { supabase as defaultSupabase } from "@/lib/supabase";
import { Ministry, FAQ, Attachment } from "@/lib/interface";
import { MediaAssetService } from "./media-asset-service";

/**
 * PURE JS UUID GENERATOR (v4 COMPLIANT)
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const ministryService = {
  /**
   * Map Database row to Frontend Ministry object
   */
  async mapFromDb(dbData: any, assetMap: Record<string, string> = {}, resolveMedia: boolean = true): Promise<Ministry> {
    // 1. Resolve Photos
    const mappedPhotos = (dbData.photos || []).map((urlOrId: string) => 
      resolveMedia ? MediaAssetService.getUrl(urlOrId, assetMap) : urlOrId
    );

    // 2. Resolve PDF
    const mappedPdf = dbData.pdf ? {
      ...dbData.pdf,
      src: resolveMedia ? MediaAssetService.getUrl(dbData.pdf.src, assetMap) : dbData.pdf.src
    } : undefined;

    // 3. Resolve Attachment
    const mappedAttachment = dbData.attachment ? {
      ...dbData.attachment,
      src: resolveMedia ? MediaAssetService.getUrl(dbData.attachment.src, assetMap) : dbData.attachment.src
    } : undefined;

    // 4. Resolve Library
    const mappedLibrary = (dbData.library || []).map((item: any) => ({
      ...item,
      thumb: item.thumb ? (resolveMedia ? MediaAssetService.getUrl(item.thumb, assetMap) : item.thumb) : undefined,
      src: resolveMedia ? MediaAssetService.getUrl(item.src, assetMap) : item.src
    }));

    return {
      id: dbData.slug || dbData.id, // Prefer slug for existing data compatibility
      name: dbData.name,
      tagline: dbData.tagline || undefined,
      description: dbData.description,
      color: dbData.color || undefined,
      disclaimer: dbData.disclaimer || undefined,
      photos: mappedPhotos.length > 0 ? mappedPhotos : undefined,
      faqs: dbData.faqs || [],
      pdf: mappedPdf,
      attachment: mappedAttachment,
      library: mappedLibrary.length > 0 ? mappedLibrary : undefined
    };
  },

  /**
   * Fetch all active ministries
   */
  async getAll(resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<Ministry[]> {
    console.log(`[MINISTRY_SERVICE] Fetching All Ministries (Resolve: ${resolveMedia})...`);
    const { data: rows, error } = await supabaseClient
      .from("ministries")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[MINISTRY_SERVICE] Fetch Error:", error);
      throw error;
    }

    if (!rows || rows.length === 0) return [];

    // Resolve Media Assets if requested
    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    
    return Promise.all(rows.map(row => this.mapFromDb(row, mediaMap, resolveMedia)));
  },

  /**
   * Fetch a single ministry by slug or id
   */
  async getBySlug(slug: string, resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<Ministry | null> {
    const { data, error } = await supabaseClient
      .from("ministries")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (error || !data) return null;
    
    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return this.mapFromDb(data, mediaMap, resolveMedia);
  },

  /**
   * Save (Upsert) a ministry
   */
  async save(ministry: any, supabaseClient = defaultSupabase) {
    const dbRow = {
      slug: ministry.id || ministry.slug, // Map frontend 'id' to DB 'slug'
      name: ministry.name,
      tagline: ministry.tagline || null,
      description: ministry.description,
      color: ministry.color || null,
      disclaimer: ministry.disclaimer || null,
      photos: ministry.photos || [],
      faqs: ministry.faqs || [],
      pdf: ministry.pdf || null,
      attachment: ministry.attachment || null,
      library: ministry.library || [],
      sort_order: ministry.sort_order || 0,
      is_active: ministry.is_active !== undefined ? ministry.is_active : true
    };

    const { data, error } = await supabaseClient
      .from("ministries")
      .upsert(dbRow, { onConflict: "slug" })
      .select();

    if (error) throw error;
    return data;
  },

  /**
   * Delete (Soft or Hard)
   */
  async delete(id: string, soft: boolean = true, supabaseClient = defaultSupabase) {
    if (soft) {
      const { error } = await supabaseClient
        .from("ministries")
        .update({ is_active: false })
        .or(`slug.eq.${id},id.eq.${id}`);
      if (error) throw error;
    } else {
      const { error } = await supabaseClient
        .from("ministries")
        .delete()
        .or(`slug.eq.${id},id.eq.${id}`);
      if (error) throw error;
    }
  }
};
