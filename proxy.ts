import { createClient } from "@/utils/supabase/server"
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
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // 1. Initialize Supabase Middleware Client
  // This is required to refresh the session and check authentication
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 2. Determine the current locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
  const currentLocale = pathnameHasLocale ? pathname.split("/")[1] : getLocale(request)

  // 3. Define the Admin Security Logic
  // We check if the path (with or without locale) includes "/admin"
  const isAdminPath = pathname.includes("/admin")
  const isLoginPage = pathname.includes("/admin/login")

  // AUTH GUARD: If accessing admin area without a session
  // TODO: recover the code below once admin credentials
  // if (isAdminPath && !isLoginPage && !session) {
  //   const redirectUrl = request.nextUrl.clone()
  //   // Redirect to the localized login page
  //   redirectUrl.pathname = `/${currentLocale}/admin/login`
  //   return NextResponse.redirect(redirectUrl)
  // }

  // 4. Handle Locale Redirection (Your existing logic)
  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${currentLocale}${pathname}`
    // Note: If you return a redirect here, you must pass the 'res'
    // to ensure Supabase cookies are preserved
    const redirectRes = NextResponse.redirect(request.nextUrl)

    // Transfer cookies from the Supabase response to the redirect response
    // (Crucial for keeping the user logged in!)
    res.cookies.getAll().forEach((cookie) => redirectRes.cookies.set(cookie.name, cookie.value))

    return redirectRes
  }

  // Return the default response with Supabase session headers
  return res
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, images, api, favicon)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
