import { supabase as defaultSupabase } from "@/lib/supabase";
import { CommunityEntity, CommunityType } from "@/lib/interface";
import { MediaAssetService } from "./media-asset-service";

export const communityService = {
  /**
   * Map Database row to Frontend CommunityEntity object
   */
  async mapFromDb(dbData: any, assetMap: Record<string, string> = {}, resolveMedia: boolean = true): Promise<CommunityEntity> {
    return {
      id: dbData.id,
      type: dbData.type as CommunityType,
      slug: dbData.slug,
      name: dbData.name,
      tagline: dbData.tagline || undefined,
      description: dbData.description || undefined,
      
      meeting_day: dbData.meeting_day || undefined,
      meeting_time: dbData.meeting_time || undefined,
      location_name: dbData.location_name || undefined,
      location_area: dbData.location_area || undefined,
      
      leader_name: dbData.leader_name || undefined,
      contact_info: dbData.contact_info || undefined,
      
      image: dbData.image ? (resolveMedia ? MediaAssetService.getUrl(dbData.image, assetMap) : dbData.image) : undefined,
      photos: Array.isArray(dbData.gallery) ? (resolveMedia ? dbData.gallery.map((img: string) => MediaAssetService.getUrl(img, assetMap)) : dbData.gallery) : [],
      
      metadata: dbData.metadata || {},
      
      sort_order: dbData.sort_order || 0,
      is_active: dbData.is_active,
      is_featured: dbData.is_featured || false,
    };
  },

  /**
   * Fetch entities by type
   */
  async getByType(type: CommunityType, resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<CommunityEntity[]> {
    console.log(`[COMMUNITY_SERVICE] Fetching ${type}s...`);
    const { data: rows, error } = await supabaseClient
      .from("communities")
      .select("*")
      .eq("type", type)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!rows) return [];

    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return Promise.all(rows.map(row => this.mapFromDb(row, mediaMap, resolveMedia)));
  },

  /**
   * Fetch all communities
   */
  async getAll(resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<CommunityEntity[]> {
    const { data: rows, error } = await supabaseClient
      .from("communities")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!rows) return [];

    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return Promise.all(rows.map(row => this.mapFromDb(row, mediaMap, resolveMedia)));
  },

  /**
   * Fetch a single community by slug or id
   */
  async getBySlug(slug: string, resolveMedia: boolean = true, supabaseClient = defaultSupabase): Promise<CommunityEntity | null> {
    const { data, error } = await supabaseClient
      .from("communities")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (error || !data) return null;
    
    const mediaMap = resolveMedia ? await MediaAssetService.getMediaMap() : {};
    return this.mapFromDb(data, mediaMap, resolveMedia);
  },

  /**
   * Save (Upsert) a community entity
   */
  async save(entity: Partial<CommunityEntity>, supabaseClient = defaultSupabase) {
    const { data, error } = await supabaseClient
      .from("communities")
      .upsert(entity, { onConflict: "slug" })
      .select();

    if (error) throw error;
    return data;
  }
};
