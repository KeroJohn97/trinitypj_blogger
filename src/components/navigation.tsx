"use client"

import logo from "@/../assets/logo.jpg"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const navigationItems = [
  { name: "I'm New", href: "/location-services", target: "_self" },
  {
    name: "Bulletin",
    href: "https://drive.google.com/file/d/1hWNuf_mfG2Jykg4dEk59RwwJubyPpynA/view",
    target: "_blank",
  },
  {
    name: "Calendar",
    href: "https://drive.google.com/file/d/1KqUtMRxhW4SWLvmEI1LgLdYh2R--gTjy/view",
    target: "_blank",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // --- Language Switcher Logic ---
  // 1. Get current language from URL (default to en-US)
  const currentLang = pathname?.split("/")[1] || "en-US"

  // 2. Handle the switch while preserving the rest of the URL
  const switchLanguage = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = newLocale // Swap the locale segment
    const newPath = segments.join("/")
    router.push(newPath)
  }
  // -------------------------------

  return (
    <nav className="border-border/10 sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image src={logo} alt="Logo" height={40} width={120} className="h-10 w-auto object-contain" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.target}
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-4">
              <Link href="/connect-serve">Connect & Serve</Link>
            </Button>

            {/* --- Desktop Language Toggle --- */}
            <div className="ml-4 flex items-center gap-2 border-l pl-4 text-sm">
              <button
                onClick={() => switchLanguage("en-US")}
                disabled={currentLang === "en-US"}
                className={`cursor-pointer font-medium transition-colors ${
                  currentLang === "en-US" ? "text-black underline" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                EN
              </button>
              <span className="text-gray-300">/</span>
              <button
                onClick={() => switchLanguage("zh-CN")}
                disabled={currentLang === "zh-CN"}
                className={`cursor-pointer font-medium transition-colors ${
                  currentLang === "zh-CN" ? "text-black underline" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                中文
              </button>
            </div>
            {/* ------------------------------- */}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-white">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                </SheetHeader>

                <div className="mx-4 mt-8 flex flex-col space-y-4">
                  <a href="/">
                    <img src={logo.src} alt="Logo" className="h-24 w-auto object-contain" />
                  </a>
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link href={item.href} target={item.target} className="text-lg font-medium">
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/connect-serve">Connect & Serve</Link>
                    </Button>
                  </SheetClose>

                  {/* --- Mobile Language Toggle --- */}
                  <div className="mt-8 border-t pt-6">
                    <p className="mb-3 text-sm font-semibold text-gray-500">Language</p>
                    <div className="flex gap-4">
                      <Button
                        variant={currentLang === "en-US" ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          switchLanguage("en-US")
                          setIsOpen(false)
                        }}
                      >
                        English
                      </Button>
                      <Button
                        variant={currentLang === "zh-CN" ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          switchLanguage("zh-CN")
                          setIsOpen(false)
                        }}
                      >
                        中文
                      </Button>
                    </div>
                  </div>
                  {/* ------------------------------ */}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
