import { supabase as defaultSupabase } from "@/lib/supabase";
import { ChurchGroup } from "@/lib/interface";
import { MediaAssetService } from "./media-asset-service";

export const groupService = {
  /**
   * Map Database row to Frontend ChurchGroup object
   */
  async mapFromDb(dbData: any, assetMap: Record<string, string> = {}, resolveMedia: boolean = true): Promise<ChurchGroup> {
    return {
      id: dbData.id,
      type: 'fellowship',
      slug: dbData.slug,
      name: dbData.name,
      meeting_time: dbData.time || dbData.meeting_time,
      location_name: dbData.location || dbData.location_name,
      description: dbData.description || undefined,
      leader_name: dbData.leader || dbData.leader_name,
      sort_order: dbData.sort_order,
      is_active: dbData.is_active,
      is_featured: dbData.is_featured || false,
      image: dbData.image ? (resolveMedia ? MediaAssetService.getUrl(dbData.image, assetMap) : dbData.image) : undefined,
      metadata: dbData.metadata || {}
    };
  },

  /**
   * Fetch all active church groups
   */
  async getAll(resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<ChurchGroup[]> {
    console.log(`[GROUP_SERVICE] Fetching All Church Groups (Resolve: ${resolveMedia})...`);
    
    // First try the new unified table
    const { data: unifiedRows, error: unifiedError } = await supabaseClient
      .from("communities")
      .select("*")
      .eq("type", "fellowship")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!unifiedError && unifiedRows && unifiedRows.length > 0) {
      const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
      return Promise.all(unifiedRows.map(row => this.mapFromDb(row, mediaMap, resolveMedia)));
    }

    // Fallback to legacy table
    const { data: rows, error } = await supabaseClient
      .from("church_groups")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("[GROUP_SERVICE] Fetch Error:", error);
      throw error;
    }

    if (!rows || rows.length === 0) return [];

    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return Promise.all(rows.map(row => this.mapFromDb(row, mediaMap, resolveMedia)));
  },

  /**
   * Fetch a single church group by slug or id
   */
  async getBySlug(slug: string, resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<ChurchGroup | null> {
    const { data, error } = await supabaseClient
      .from("church_groups")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (error || !data) return null;
    
    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return this.mapFromDb(data, mediaMap, resolveMedia);
  },

  /**
   * Save (Upsert) a church group
   */
  async save(group: ChurchGroup, supabaseClient = defaultSupabase) {
    const dbRow = {
      type: 'fellowship',
      slug: group.slug,
      name: group.name,
      meeting_time: group.meeting_time,
      location_name: group.location_name,
      description: group.description || null,
      leader_name: group.leader_name || null,
      image: group.image || null,
      sort_order: group.sort_order || 0,
      is_active: group.is_active !== undefined ? group.is_active : true,
      metadata: group.metadata || {}
    };

    const { data, error } = await supabaseClient
      .from("communities")
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
        .from("church_groups")
        .update({ is_active: false })
        .or(`slug.eq.${id},id.eq.${id}`);
      if (error) throw error;
    } else {
      const { error } = await supabaseClient
        .from("church_groups")
        .delete()
        .or(`slug.eq.${id},id.eq.${id}`);
      if (error) throw error;
    }
  }
};
