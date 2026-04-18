// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    global: {
      fetch: (...args) => {
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !key || key === "your-anon-key-here" || key === "placeholder") {
          return Promise.resolve(new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } }))
        }
        return fetch(...args)
      }
    },
    cookies: {
      async get(name: string) {
        return (await cookieStore)?.get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        try {
          ;(await cookieStore)?.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      async remove(name: string, options: CookieOptions) {
        try {
          ;(await cookieStore).set({ name, value: "", ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
        }
      },
    },
  })
}
