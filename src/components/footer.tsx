// Removed unused icons (BookOpen, Church, MapPin, Megaphone) from import
import { Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import logo from "@/../assets/logo.jpg"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-border border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* CHANGED: md:grid-cols-4 -> md:grid-cols-3 */}
        {/* This keeps the Logo spanning 2/3rds and Service Times spanning 1/3rd */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and Description (Spans 2 columns) */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Image src={logo} alt="TMCPJ Logo" />
            </div>
            <p className="text-muted-primary mb-4 max-w-md font-bold tracking-wider">A DISCIPLE MAKING CHURCH</p>
          </div>

          {/* REMOVED: Quick Links Section */}

          {/* Service Times (Takes up the remaining 1 column) */}
          <div>
            <h3 className="text-foreground mb-4 font-semibold">Service Times</h3>
            <div className="space-y-3">
              <div className="text-muted-foreground flex items-start space-x-2">
                <Clock className="mt-0.5 h-4 w-4" />
                <div className="text-sm">
                  <div>Sunday Services</div>
                  <div>English - 9:00am & 5:00pm</div>
                  <div>Chinese - 9:00am</div>
                  <div>Sunday School - 11:00am</div>
                  <div>Methodist Youth Fellowship (MYF) - 11:00am</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Trinity Methodist Church Petaling Jaya. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link
                href="https://facebook.com/mytrinitypj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                Facebook
              </Link>
              <Link
                href="http://instagram.com/mytrinitypj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                Instagram
              </Link>
              <Link
                href="https://www.youtube.com/@tmcpj"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                target="_blank"
              >
                YouTube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
