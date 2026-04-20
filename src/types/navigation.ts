// types/navigation.ts or within your component
import {
  Calendar,
  Clock,
  HeartHandshake,
  Image as ImageIcon,
  Info,
  LayoutGrid,
  Megaphone,
  Type,
  Users,
  Video
} from "lucide-react"

export const ADMIN_NAV = [
  {
    group: "Brand & Identity",
    items: [
      { name: "Landing Notices", icon: Megaphone, slug: "landing-notices" },
      { name: "About Us (Editor)", icon: Type, slug: "about" },
      { name: "Vision & Mission", icon: ImageIcon, slug: "vision" },
      { name: "LCEC Page", icon: ImageIcon, slug: "lcec-page" },
      { name: "Media Assets", icon: ImageIcon, slug: "media-assets" },
    ],
  },
  {
    group: "Weekly Pulse",
    items: [
      { name: "Service Times", icon: Clock, slug: "services" },
      { name: "Special Alerts", icon: Megaphone, slug: "alerts" },
      { name: "Digital Bulletin", icon: Info, slug: "bulletin" },
      { name: "Upcoming Activities", icon: Calendar, slug: "activities" }, // Added here
    ],
  },
  {
    group: "Community Life",
    items: [
      { name: "Small Groups", icon: Users, slug: "groups" },
      { name: "Fellowship Groups", icon: Users, slug: "church-groups" },
      { name: "Prayer Gatherings", icon: HeartHandshake, slug: "prayer" },
      { name: "Ministries", icon: LayoutGrid, slug: "ministries" },
      { name: "Ministry Spotlights", icon: ImageIcon, slug: "spotlights" },
    ],
  },
  {
    group: "Resources",
    items: [
      { name: "Alpha Course", icon: Video, slug: "alpha" },
      { name: "Infographics", icon: ImageIcon, slug: "infographics" },
      { name: "Giving & Tithe", icon: HeartHandshake, slug: "giving" },
    ],
  },
]
