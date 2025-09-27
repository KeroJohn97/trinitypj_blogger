import Image from "next/image" // If using Next.js
import logo from "@/../assets/logo.jpg" // Adjust path as needed
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import "globals.css"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trinity Methodist Church Petaling Jaya – TMCPJ | Methodist Church in Petaling Jaya, Selangor, Malaysia",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <body className="relative text-emerald-800">{children}</body>
    </html>
  )
}
