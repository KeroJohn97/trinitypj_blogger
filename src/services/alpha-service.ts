import { supabase as defaultSupabase } from "@/lib/supabase";
import { MediaItem } from "@/components/staggered-media-gallery";
import crypto from "crypto";

export const alphaService = {
  /**
   * Translate DB row to Frontend MediaItem
   */
  mapFromDb(dbData: any): MediaItem {
    const isImage = dbData.type === "image";
    const src = isImage && dbData.image_asset?.storage_path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dbData.image_asset.storage_path}`
      : undefined;

    const qrSrcPhysical = dbData.qr_asset_physical?.storage_path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dbData.qr_asset_physical.storage_path}`
      : undefined;

    const qrSrcOnline = dbData.qr_asset_online?.storage_path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${dbData.qr_asset_online.storage_path}`
      : undefined;

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
      registrationQrSrcPhysical: qrSrcPhysical,
      registrationQrSrcOnline: qrSrcOnline,
    };
  },

  /**
   * Fetch all Alpha media
   */
  async getAll(supabaseClient = defaultSupabase): Promise<MediaItem[]> {
    const { data, error } = await supabaseClient
      .from("alpha_media")
      .select(`
        *,
        image_asset:image_id(storage_path),
        qr_asset_physical:reg_qr_id_physical(storage_path),
        qr_asset_online:reg_qr_id_online(storage_path)
      `)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return (data || []).map(row => this.mapFromDb(row));
  },

  /**
   * Batch Save (Upsert)
   */
  async saveAll(items: any[], supabaseClient = defaultSupabase) {
    // Ensure we clean the items for DB consumption
    const payload = items.map(item => {
      const dbRow: any = {
        category: item.category,
        type: item.type,
        youtube_id: item.type === "video" ? item.youtubeId : null,
        image_id: item.type === "image" ? (item.image_id || null) : null,
        title: item.title,
        description: item.description,
        sort_order: item.sort_order || 0,
        language: item.language || null,
        reg_qr_id_physical: item.reg_qr_id_physical || null,
        reg_qr_id_online: item.reg_qr_id_online || null,
      }

      // Assign a valid UUID if it's a new item (temp ID or missing)
      if (item.id && typeof item.id === "string" && !item.id.includes("temp-")) {
        dbRow.id = item.id
      } else {
        dbRow.id = crypto.randomUUID()
      }

      return dbRow
    })

    const { data, error } = await supabaseClient
      .from("alpha_media")
      .upsert(payload)
      .select();

    if (error) throw error;
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
