import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// 1. Define your supported locales and the default
const locales = ["en-US", "zh-CN"]
const defaultLocale = "en-US"

// 2. Helper to determine the user's preferred language
function getLocale(request: NextRequest): string {
  // Convert request headers to a simple object for Negotiator
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore: negotiator types mismatch with strict TS
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  // Match the user's languages against your supported locales
  try {
    return match(languages, locales, defaultLocale)
  } catch (e) {
    // Fallback if match fails
    return defaultLocale
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 3. Check if the path already contains a supported locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // If the locale is already present, do nothing (let Next.js render the page)
  if (pathnameHasLocale) return

  // 4. If no locale is found (e.g. user visits '/'), redirect to the localized URL
  const locale = getLocale(request)

  // Construct the new URL (e.g. /products -> /en-US/products)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, images, api, favicon)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
