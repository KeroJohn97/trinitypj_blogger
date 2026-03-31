// types/website.ts
type SocialPlatform = "facebook" | "instagram" | "youtube"

export interface SiteData {
  title: string
  primaryColor: string
  logoUrl?: string
  description?: string
  socialLinks: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}
