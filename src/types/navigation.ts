import {
  LayoutGrid,
  Megaphone,
  Newspaper,
  Image as ImageIcon,
  Clock,
  Calendar,
  Users,
  HeartHandshake
} from "lucide-react"

export const ADMIN_NAV = [
  {
    group: "Dashboard",
    items: [
      { name: "Overview", icon: LayoutGrid, slug: "overview" },
    ],
  },
  {
    group: "Brand & Identity",
    items: [
      { name: "Landing Notices", icon: Megaphone, slug: "landing-notices" },
      { name: "What's New", icon: Newspaper, slug: "whats-new" },
      { name: "Vision & Mission", icon: ImageIcon, slug: "vision" },
      { name: "LCEC Page", icon: ImageIcon, slug: "lcec-page" },
      { name: "Media Assets", icon: ImageIcon, slug: "media-assets" },
    ],
  },
  {
    group: "Weekly Pulse",
    items: [
      { name: "Upcoming Activities", icon: Calendar, slug: "activities" },
    ],
  },
  {
    group: "Community Life",
    items: [
      { name: "Fellowship Groups", icon: Users, slug: "church-groups" },
      { name: "Lighthouses (SG)", icon: Users, slug: "groups" },
      { name: "Prayer Gatherings", icon: HeartHandshake, slug: "prayer" },
      { name: "Ministries", icon: LayoutGrid, slug: "ministries" },
    ],
  },
]
