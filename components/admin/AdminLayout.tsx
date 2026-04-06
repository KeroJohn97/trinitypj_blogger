"use client"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "./Sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDirty } = useNavigationGuard()

  // Get active tab from URL: /admin?tab=groups
  const activeTab = searchParams.get("tab") || "general"

  const handleTabChange = (newTab: string) => {
    if (isDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Switching tabs will discard them. Continue?")
      if (!confirmLeave) return
    }
    // Update the URL which triggers the dashboard to re-render
    router.push(`?tab=${newTab}`)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar is now persistent in the layout */}
      <Sidebar activeSlug={activeTab} onSelect={handleTabChange} />

      <main className="flex min-w-0 flex-1 flex-col bg-white">{children}</main>
    </div>
  )
}
