// types/website.ts
type SocialPlatform = "facebook" | "instagram" | "youtube"

interface SiteData {
  title: string
  primaryColor: string
  logoUrl?: string
  description?: string
  socialLinks?: Partial<Record<SocialPlatform, string>>
}
