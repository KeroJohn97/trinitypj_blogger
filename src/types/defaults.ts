// constants/defaults.ts or top of your file
import { SiteData } from "@/types/website"

export const DEFAULT_SITE_DATA: SiteData = {
  title: "",
  description: "",
  logo_image_id: "",
  primaryColor: "#2563eb",
  socialLinks: { facebook: "", instagram: "", youtube: "" },

  alert: { active: false, text: "", type: "info" },
  serviceTimes: [],
  bulletinUrl: "",
  announcements: [],

  aboutUsMarkdown: "",
  visionPillars: [],
  alphaVideos: [],
  smallGroups: [],

  infographics: {
    ministriesUrl: "",
    groupsUrl: "",
  },
  giving: {
    bankName: "",
    accountName: "",
    accountNumber: "",
    portalUrl: "",
    qrCodeUrl: "",
  },
}
