"use client"
import { Suspense } from "react"
// ... Import other editors as you build them
import { NavigationGuardProvider } from "@/context/navigation-guard-context"
import { DEFAULT_SITE_DATA } from "@/types/defaults"
import AdminDashboard from "components/admin/AdminDashboard"
import AdminLayout from "components/admin/AdminLayout"

export default function AdminPage() {
  return (
    <NavigationGuardProvider>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-gray-50 text-sm font-bold tracking-widest text-gray-400 uppercase">
            Initialising Admin Shell...
          </div>
        }
      >
        <AdminLayout>
          <AdminDashboard siteData={DEFAULT_SITE_DATA} />
        </AdminLayout>
      </Suspense>
    </NavigationGuardProvider>
  )
}
