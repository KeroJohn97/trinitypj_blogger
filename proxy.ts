import { updateSession } from "@/utils/supabase/update-session"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const locales = ["en-US", "zh-CN"]
const defaultLocale = "en-US"

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  try {
    return match(languages, locales, defaultLocale)
  } catch (e) {
    return defaultLocale
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Sync Supabase Session and get refreshed user
  const { res, user } = await updateSession(request)

  // DEBUG: Useful for diagnosing redirection issues
  if (pathname.includes("/admin")) {
    console.log(`[MIDDLEWARE DEBUG] Path: ${pathname}, Authenticated: ${!!user}`)
  }


  // 2. Determine the current locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  const currentLocale = pathnameHasLocale ? pathname.split("/")[1] : getLocale(request)

  // 3. Define the Admin Security Logic
  const isAdminPath = pathname.includes("/admin")
  const isLoginPage = pathname.includes("/admin/login")

  // AUTH GUARD: If accessing admin area without a valid session
  if (isAdminPath && !isLoginPage && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${currentLocale}/admin/login`
    
    // Create a new redirect response but copy over any session cookies
    const redirectRes = NextResponse.redirect(redirectUrl)
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie)
    })
    return redirectRes
  }

  // 4. Handle Locale Redirection
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${currentLocale}${pathname}`
    
    // Create a new redirect response but copy over any session cookies
    const redirectRes = NextResponse.redirect(request.nextUrl)
    res.cookies.getAll().forEach((cookie) => {
      redirectRes.cookies.set(cookie.name, cookie.value, cookie)
    })
    return redirectRes
  }

  // Return the synced response (NextResponse.next())
  return res
}

export const config = {
  matcher: [
    // Skip internal paths and assets
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
