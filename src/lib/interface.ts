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

export interface Ministry {
  id: string
  name: string
  tagline?: string
  description: string
  photos?: string[]
  faqs?: FAQ[]
  pdf?: Attachment
  color?: string
  disclaimer?: string
  attachment?: Attachment
  library?: Attachment[]
}

export interface MinistriesPageProps {
  ministries: Ministry[]
}
