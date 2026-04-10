// components/admin/SafeLink.tsx
"use client"
import { useDialog } from "@/context/dialog-context"
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
  const { isDirty, setIsDirty } = useNavigationGuard()
  const { confirm } = useDialog()

  const handleClick = async (e: React.MouseEvent) => {
    if (isDirty) {
      e.preventDefault()
      const confirmLeave = await confirm("You have unsaved changes. Are you sure you want to leave this page?", "Unsaved Changes", true)
      if (confirmLeave) {
        setIsDirty(false)
        router.push(href)
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
