"use client"

import logo from "@/../assets/logo.jpg"
import { Button } from "@/components/ui/button"
// 1. Add SheetHeader and SheetTitle to imports
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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

  return (
    <nav className="border-border/10 sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image src={logo} alt="Logo" height={40} width={120} className="h-10 w-auto object-contain" priority />
          </Link>

          {/* Desktop */}
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
          </div>

          {/* Mobile */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-white">
                {/* 2. FIX: Added SheetHeader and SheetTitle. 
                    "sr-only" makes it visible ONLY to screen readers. */}
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
