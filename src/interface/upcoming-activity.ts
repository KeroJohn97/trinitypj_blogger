export interface UpcomingActivity {
  id: number
  image_id: string // UUID from media_assets
  alt_text: string
  sort_order: number
  is_active: boolean
  // Optional join data
  media_assets?: {
    storage_path: string
  }
}
