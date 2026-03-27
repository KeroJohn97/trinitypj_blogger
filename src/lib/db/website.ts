// lib/db/website.ts

import { prisma } from "../prisma"

export async function getWebsiteSettings(): Promise<SiteData> {
  try {
    const settings = await prisma.websiteSettings.findFirst()

    if (!settings) {
      return {
        title: "Default App Name",
        primaryColor: "#2563eb",
        description: "Welcome to our community portal.",
        socialLinks: { facebook: "", instagram: "", youtube: "" },
      }
    }

    // Ensure the data matches our SiteData interface
    return {
      title: settings.title,
      primaryColor: settings.primaryColor,
      description: settings.description || "",
      socialLinks: (settings.socialLinks as any) || {},
    }
  } catch (error) {
    console.error("Database fetch failed, using defaults", error)
    return {
      title: "Emergency Default",
      primaryColor: "#000000",
      socialLinks: {},
    }
  }
}
