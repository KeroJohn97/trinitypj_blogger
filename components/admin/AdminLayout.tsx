"use client"
import { useDialog } from "@/context/dialog-context"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "./Sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isDirty, setIsDirty } = useNavigationGuard()
  const { confirm } = useDialog()

  // Get active tab from URL: /admin?tab=groups
  const activeTab = searchParams.get("tab") || "general"

  const handleTabChange = async (newTab: string) => {
    if (isDirty) {
      const confirmLeave = await confirm("You have unsaved changes. Switching tabs will discard them. Continue?", "Unsaved Changes", true)
      if (!confirmLeave) return
      setIsDirty(false)
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
