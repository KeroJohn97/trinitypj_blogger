// types/navigation.ts or within your component
import {
  Clock,
  HeartHandshake,
  Image as ImageIcon,
  Info,
  LayoutDashboard,
  Megaphone,
  Type,
  Users,
  Video,
} from "lucide-react"

export const ADMIN_NAV = [
  {
    group: "Brand & Identity",
    items: [
      { name: "General Settings", icon: LayoutDashboard, slug: "general" },
      { name: "About Us (Editor)", icon: Type, slug: "about" },
      { name: "Vision & Mission", icon: ImageIcon, slug: "vision" },
    ],
  },
  {
    group: "Weekly Pulse",
    items: [
      { name: "Service Times", icon: Clock, slug: "services" },
      { name: "Special Alerts", icon: Megaphone, slug: "alerts" },
      { name: "Digital Bulletin", icon: Info, slug: "bulletin" },
    ],
  },
  {
    group: "Community Life",
    items: [
      { name: "Small Groups", icon: Users, slug: "groups" },
      { name: "Prayer Gatherings", icon: HeartHandshake, slug: "prayer" },
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
