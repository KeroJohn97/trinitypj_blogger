import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import logo from "@/../assets/logo.jpg"

// Define the shape of the dictionary part required
interface FooterProps {
  dict: {
    tagline: string
    serviceTimes: {
      title: string
      sunday: string
      english: string
      chinese: string
      sundaySchool: string
      myf: string
    }
    copyright: string
    social: {
      facebook: string
      instagram: string
      youtube: string
    }
  }
}

export function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Image src={logo} alt="TMCPJ Logo" />
            </div>
            <p className="text-muted-primary mb-4 max-w-md font-bold tracking-wider">{dict.tagline}</p>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">{dict.serviceTimes.title}</h3>
            <div className="space-y-3">
              <div className="text-muted-foreground flex items-start space-x-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="space-y-1 text-sm">
                  <div className="font-medium">{dict.serviceTimes.sunday}</div>
                  <div>{dict.serviceTimes.english}</div>
                  <div>{dict.serviceTimes.chinese}</div>
                  <div className="pt-1">{dict.serviceTimes.sundaySchool}</div>
                  <div>{dict.serviceTimes.myf}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="border-border mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-muted-foreground text-center text-sm md:text-left">
              © {currentYear} {dict.copyright}
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="https://facebook.com/mytrinitypj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                {dict.social.facebook}
              </Link>
              <Link
                href="http://instagram.com/mytrinitypj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                {dict.social.instagram}
              </Link>
              <Link
                href="https://www.youtube.com/@tmcpj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                {dict.social.youtube}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
