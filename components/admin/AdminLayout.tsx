"use client"
import { useDialog } from "@/context/dialog-context"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Sidebar from "./Sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const { isDirty, setIsDirty } = useNavigationGuard()
  const lang = params?.lang ?? "en-US"
  const { alert, confirm } = useDialog()

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

  const handleSignOut = async () => {
    if (isDirty) {
      const confirmLeave = await confirm(
        "You have unsaved changes. Signing out will discard them. Continue?",
        "Unsaved Changes",
        true
      )
      if (!confirmLeave) return
      setIsDirty(false)
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message, "Sign Out Error")
      return
    }

    router.push(`/${lang}/admin/login`)
    router.refresh()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar is now persistent in the layout */}
      <Sidebar activeSlug={activeTab} onSelect={handleTabChange} onSignOut={handleSignOut} />

      <main className="flex min-w-0 flex-1 flex-col bg-white">{children}</main>
    </div>
  )
}
