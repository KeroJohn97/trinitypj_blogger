import { LucideIcon } from "lucide-react"

interface QuickLink {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export interface FAQ {
  question: string
  answer: string
}

export interface Attachment {
  id: string
  src: string
  title: string
  thumb?: string
}

export type CommunityType = 'ministry' | 'fellowship' | 'small_group';

export interface CommunityEntity {
  id: string;
  type: CommunityType;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  
  // Logistics
  meeting_day?: string;
  meeting_time?: string;
  location_name?: string;
  location_area?: string;
  
  // People
  leader_name?: string;
  contact_info?: {
    email?: string;
    phone?: string;
  };
  
  // Media
  image?: string;
  photos?: string[];
  
  // Metadata
  metadata?: {
    faqs?: FAQ[];
    pdf?: Attachment;
    library?: Attachment[];
    disclaimer?: string;
    attachment?: Attachment;
    language?: string;
    zone?: string;
    contact_number?: string;
    theme_color?: string;
  };
  
  sort_order: number;
  is_active: boolean;
  is_featured: boolean;
}

// Legacy Aliases (to prevent breaking current code)
export type Ministry = CommunityEntity;
export type ChurchGroup = CommunityEntity;

export interface MinistriesPageProps {
  ministries: CommunityEntity[]
  groups?: CommunityEntity[]
}
