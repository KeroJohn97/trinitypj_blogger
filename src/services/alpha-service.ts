import { supabase as defaultSupabase } from "@/lib/supabase";
import { MediaItem } from "@/components/staggered-media-gallery";

/**
 * PURE JS UUID GENERATOR (v4 COMPLIANT)
 * Guaranteed to work in Node, Edge, and Browser browser.
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const alphaService = {
  /**
   * Translate DB row to Frontend MediaItem
   */
  mapFromDb(dbData: any, assetMap: Record<string, string> = {}): MediaItem {
    const isImage = dbData.type === "image";
    
    // Resolve Main Image
    const mainPath = dbData.image_id ? assetMap[dbData.image_id] : null;
    const src = isImage && mainPath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${mainPath}`
      : undefined;

    // Resolve QR Physical
    const physId = dbData.reg_qr_id_physical ? String(dbData.reg_qr_id_physical) : null;
    const qrPhysPath = physId ? assetMap[physId] : null;
    const qrSrcPhysical = qrPhysPath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${qrPhysPath}`
      : undefined;

    // Resolve QR Online
    const onlineId = dbData.reg_qr_id_online ? String(dbData.reg_qr_id_online) : null;
    const qrOnlinePath = onlineId ? assetMap[onlineId] : null;
    const qrSrcOnline = qrOnlinePath
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${qrOnlinePath}`
      : undefined;

    // Resolve additional gallery images using the assetMap
    const gallerySrcs = Array.isArray(dbData.additional_image_ids) 
      ? dbData.additional_image_ids.map((id: string) => {
          const sid = String(id);
          const path = assetMap[sid];
          return path 
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${path}`
            : undefined;
        }).filter(Boolean) as string[]
      : [];

    return {
      id: dbData.id,
      type: dbData.type,
      youtubeId: dbData.youtube_id || undefined,
      src: src,
      title: dbData.title || "",
      description: dbData.description || "",
      category: dbData.category,
      date: dbData.created_at,
      language: dbData.language || undefined,
      image_id: dbData.image_id || undefined,
      additional_image_ids: dbData.additional_image_ids || [],
      reg_qr_id_physical: dbData.reg_qr_id_physical || undefined,
      reg_qr_id_online: dbData.reg_qr_id_online || undefined,
      gallerySrcs: gallerySrcs,
      registrationQrSrcPhysical: qrSrcPhysical,
      registrationQrSrcOnline: qrSrcOnline,
      reg_url_physical: dbData.reg_url_physical || undefined,
      reg_url_online: dbData.reg_url_online || undefined,
    };
  },

  /**
   * Fetch all Alpha media
   */
  async getAll(supabaseClient = defaultSupabase): Promise<MediaItem[]> {
    console.log("[ALPHA_SERVICE] Fetching All Media...");
    const { data: mediaRows, error } = await supabaseClient
      .from("alpha_media")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[ALPHA_SERVICE] Fetch Error:", error);
      throw error;
    }

    if (!mediaRows || mediaRows.length === 0) return [];

    // ROBUST ASSET RESOLUTION
    // Collect ALL associated IDs for a single query to media_assets
    const allAssetIds = new Set<string>();
    mediaRows.forEach(row => {
      if (row.image_id) allAssetIds.add(row.image_id);
      if (row.reg_qr_id_physical) allAssetIds.add(row.reg_qr_id_physical);
      if (row.reg_qr_id_online) allAssetIds.add(row.reg_qr_id_online);
      if (Array.isArray(row.additional_image_ids)) {
        row.additional_image_ids.forEach((id: string) => allAssetIds.add(id));
      }
    });

    const uniqueIds = Array.from(allAssetIds).filter(Boolean);
    const assetMap: Record<string, string> = {};

    if (uniqueIds.length > 0) {
      console.log(`[ALPHA_SERVICE] Resolving ${uniqueIds.length} unique assets...`);
      const { data: assets, error: assetError } = await supabaseClient
        .from("media_assets")
        .select("id, storage_path")
        .in("id", uniqueIds);

      if (!assetError && assets) {
        assets.forEach(a => {
          assetMap[a.id] = a.storage_path;
        });
        console.log("[ALPHA_SERVICE] Resolved Asset Map:", Object.keys(assetMap).length, "items found.");
      } else if (assetError) {
        console.error("[ALPHA_SERVICE] Asset Resolution Error:", assetError);
      }
    } else {
      console.warn("[ALPHA_SERVICE] No assets found to resolve.");
    }

    return mediaRows.map(row => this.mapFromDb(row, assetMap));
  },

  /**
   * Fetch a single asset by ID
   */
  async getAsset(id: string, supabaseClient = defaultSupabase) {
    if (!id) return null;
    const { data, error } = await supabaseClient
      .from("media_assets")
      .select("id, storage_path")
      .eq("id", id)
      .single();
    
    if (error || !data) return null;
    return data;
  },

  /**
   * Batch Save (Upsert)
   */
  async saveAll(items: any[], supabaseClient = defaultSupabase) {
    console.log("[ALPHA_SERVICE] Starting saveAll with count:", items.length);
    
    // Ensure we clean the items for DB consumption
    const payload = items.map((item, index) => {
      console.log(`[ALPHA_SERVICE] Processing item ${index} (ID: ${item.id})`);
      
      const dbRow: any = {
        category: item.category,
        type: item.type,
        youtube_id: (item.type === "video" && item.youtubeId) ? String(item.youtubeId) : null,
        image_id: (item.type === "image" && item.image_id) ? String(item.image_id) : null,
        additional_image_ids: Array.isArray(item.additional_image_ids) ? item.additional_image_ids : [],
        title: item.title ? String(item.title) : null,
        description: item.description ? String(item.description) : null,
        sort_order: typeof item.sort_order === 'number' ? item.sort_order : 0,
        language: item.language || null,
        reg_qr_id_physical: item.reg_qr_id_physical ? String(item.reg_qr_id_physical) : null,
        reg_qr_id_online: item.reg_qr_id_online ? String(item.reg_qr_id_online) : null,
        reg_url_physical: item.reg_url_physical || null,
        reg_url_online: item.reg_url_online || null,
      }

      // Assign a valid UUID if it's a new item (temp ID or missing)
      if (item.id && typeof item.id === "string" && !item.id.includes("temp-")) {
        dbRow.id = item.id
      } else {
        dbRow.id = generateUUID();
        console.log(`[ALPHA_SERVICE] Generated new ID for item ${index}: ${dbRow.id}`);
      }

      return dbRow
    })

    console.log("[ALPHA_SERVICE] Payload ready. Executing Upsert...");
    
    const { data, error } = await supabaseClient
      .from("alpha_media")
      .upsert(payload)
      .select();

    if (error) {
      console.error("[ALPHA_SERVICE] Upsert Failed:", error);
      throw error;
    }
    
    console.log("[ALPHA_SERVICE] Upsert Success. Rows affected:", data?.length);
    return data;
  },

  /**
   * Delete an item
   */
  async deleteItem(id: string, supabaseClient = defaultSupabase) {
    const { error } = await supabaseClient
      .from("alpha_media")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
};
