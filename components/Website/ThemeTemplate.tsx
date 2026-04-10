// components/website/ThemeTemplate.tsx

import { HeroSection } from "@/components/hero-section"
import { TemporaryBanner } from "@/components/temporary-banner"
import { hexToHslValues } from "@/lib/utils"
import { SiteData } from "@/types/website"

const fallbackDict = {
  hero: { title: "", description: "" },
  home: { explore: { title: "Explore", description: "", action: "Learn More" }, quickLinks: {} },
  ongoingEvents: { title: "Ongoing Events" },
}

export default function ThemeTemplate({ data, dict }: { data: SiteData; dict: any }) {
  // Mock data for the News section (In the real app, this comes from your DB)
  const mockNews = [
    { id: 1, title: "Grand Opening", category: "Events", date: "March 25, 2026" },
    { id: 2, title: "New Mobile App Update", category: "Product", date: "March 20, 2026" },
  ]

  const links = (data?.socialLinks as unknown as Record<string, string | null | undefined>) ?? {}

  const activeDict = dict || fallbackDict

  const hero = dict?.hero || { title: "", description: "" }
  const home = dict?.home || { explore: {}, quickLinks: {} }

  return (
    <div style={{ "--primary": hexToHslValues(data.primaryColor) } as React.CSSProperties}>
      <TemporaryBanner message={data.title} startDate={""} endDate={""} />

      <HeroSection dict={dict.hero} />

      {/* Map your social links into your footer here */}
      {/* 4. Footer (Social Links) */}
      <footer className="mt-auto bg-gray-900 py-8 text-center text-white">
        <div className="mb-4 flex justify-center gap-6">
          {Object.entries(links).map(([platform, url]) =>
            url ? (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 capitalize hover:underline"
              >
                {platform}
              </a>
            ) : null
          )}
        </div>
        <p className="text-sm text-gray-500">© 2026 {data.title}. All rights reserved.</p>
      </footer>
    </div>
  )
}
