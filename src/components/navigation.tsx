"use client"

import logo from "@/../assets/logo.jpg"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

// Define the type for the specific dictionary part we need
interface NavigationProps {
  dict: {
    imNew: string
    bulletin: string
    calendar: string
    connect: string
  }
}

export function Navigation({ dict }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // 1. Get current language (e.g., "en-US" or "zh-CN")
  const currentLang = pathname?.split("/")[1] || "en-US"

  // 2. Helper to prefix internal links with the current language
  // e.g., "/location-services" -> "/zh-CN/location-services"
  const getLocalizedHref = (path: string) => `/${currentLang}${path}`

  // 3. Move navigationItems INSIDE the component to use 'dict' and 'currentLang'
  const navigationItems = [
    {
      name: dict.imNew, // Use translation
      href: getLocalizedHref("/location-services"), // Use localized path
      target: "_self",
    },
    {
      name: dict.bulletin,
      href: "https://drive.google.com/file/d/1hWNuf_mfG2Jykg4dEk59RwwJubyPpynA/view",
      target: "_blank",
    },
    {
      name: dict.calendar,
      href: "https://drive.google.com/file/d/1KqUtMRxhW4SWLvmEI1LgLdYh2R--gTjy/view",
      target: "_blank",
    },
  ]

  const switchLanguage = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
  }

  return (
    <nav className="border-border/10 sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - also localized */}
          <Link href={`/${currentLang}`} className="flex shrink-0 items-center">
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
              <Link href={getLocalizedHref("/connect-serve")}>{dict.connect}</Link>
            </Button>

            {/* Language Toggles (Same as before) */}
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
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="overflow-y-auto bg-white">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                </SheetHeader>

                <div className="mx-4 mt-8 flex flex-col space-y-4">
                  <Link href={`/${currentLang}`} onClick={() => setIsOpen(false)}>
                    <img src={logo.src} alt="Logo" className="h-24 w-auto object-contain" />
                  </Link>
                  {navigationItems.map((item) => (
                    <SheetClose asChild key={item.name}>
                      <Link href={item.href} target={item.target} className="text-lg font-medium">
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href={getLocalizedHref("/connect-serve")}>{dict.connect}</Link>
                    </Button>
                  </SheetClose>

                  {/* Mobile Language Toggle */}
                  <div className="mt-8 border-t pt-6 pb-8">
                    <p className="mb-3 text-sm font-semibold text-gray-500">Language</p>
                    <div className="flex gap-4">
                      <Button
                        variant={currentLang === "en-US" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
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
                        className="flex-1"
                        onClick={() => {
                          switchLanguage("zh-CN")
                          setIsOpen(false)
                        }}
                      >
                        中文
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
