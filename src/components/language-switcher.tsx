"use client"

import { usePathname, useRouter } from "next/navigation"

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Helper to switch the language path
  const handleSwitch = (newLocale: string) => {
    if (!pathname) return "/"

    const segments = pathname.split("/")
    // segments[0] is empty string because path starts with /
    // segments[1] is the locale (e.g., 'en-US')
    segments[1] = newLocale

    // Join the segments back into a URL
    const newPath = segments.join("/")
    router.push(newPath)
  }

  // Determine current language for styling
  const currentLang = pathname?.split("/")[1] || "en-US"

  return (
    <div className="flex gap-4 text-sm font-medium">
      <button
        onClick={() => handleSwitch("en-US")}
        className={currentLang === "en-US" ? "text-black underline" : "text-gray-400 hover:text-black"}
        disabled={currentLang === "en-US"}
      >
        English
      </button>

      <span className="text-gray-300">|</span>

      <button
        onClick={() => handleSwitch("zh-CN")}
        className={currentLang === "zh-CN" ? "text-black underline" : "text-gray-400 hover:text-black"}
        disabled={currentLang === "zh-CN"}
      >
        中文
      </button>
    </div>
  )
}
