// Individual Service Time entry
export interface ServiceTime {
  id: string
  time: string
  name: string
  location: string
}

// Social Media links
export interface SocialLinks {
  facebook: string
  instagram: string
  youtube: string
}

// Emergency / Special Alert banner
export interface SpecialAlert {
  active: boolean
  text: string
  type: "info" | "urgent"
}

// Alpha Course video entry
export interface AlphaVideo {
  id: string
  videoId: string // YouTube ID
  title: string
}

// Small Group / Cell Group entry
export interface SmallGroup {
  id: string
  name: string
  leader: string
  area: string // e.g., SS2, Section 14
  day: string
  time: string
}

// Prayer Meeting entry
export interface PrayerActivity {
  id: string
  title: string
  time: string
  location: string
}

// Vision/Mission Pillar (Image + Text)
export interface VisionPillar {
  id: string
  title: string
  description: string
  imageUrl: string
}

// Financial / Stewardship info
export interface GivingInfo {
  bankName: string
  accountName: string
  accountNumber: string
  portalUrl: string // e.g., Tithe.ly
  qrCodeUrl: string // DuitNow QR
}

// --- THE MASTER INTERFACE ---
export interface SiteData {
  // 1. Identity & Branding
  title: string
  description: string
  logoUrl: string
  primaryColor: string
  socialLinks: SocialLinks

  // 2. Weekly Pulse
  alert: SpecialAlert
  serviceTimes: ServiceTime[]
  bulletinUrl: string // Google Drive link
  announcements: { id: string; imageUrl: string; caption?: string }[]

  // 3. Community & Content
  aboutUsMarkdown: string
  visionPillars: VisionPillar[]
  alphaVideos: AlphaVideo[]
  smallGroups: SmallGroup[]

  // 4. Visual Assets & Stewardship
  infographics: {
    ministriesUrl: string
    groupsUrl: string
  }
  giving: GivingInfo
}

// types/gathering.ts
export interface GatheringItem {
  id: string;
  type: 'prayer' | 'lighthouse';
  isActive: boolean;
  title: string;
  day: string;
  time: string;
  venue: string;
  mode: 'Physical' | 'Online' | 'Hybrid';
  leader?: string;
  contact?: string;
  note?: string;
}