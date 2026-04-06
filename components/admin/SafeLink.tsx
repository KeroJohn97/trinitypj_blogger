// components/admin/SafeLink.tsx
"use client"
import { useNavigationGuard } from "@/context/navigation-guard-context"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SafeLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SafeLink({ href, children, className }: SafeLinkProps) {
  const router = useRouter()
  const { isDirty } = useNavigationGuard()

  const handleClick = (e: React.MouseEvent) => {
    if (isDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave this page?")
      if (!confirmLeave) {
        e.preventDefault()
        return
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
