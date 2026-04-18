// lib/supabase.ts
import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables are missing! Check your .env file.")
}

export const supabase = createBrowserClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseAnonKey || "placeholder",
  {
    global: {
      fetch: (...args) => {
        if (!supabaseUrl || !supabaseAnonKey) {
          return Promise.resolve(new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } }))
        }
        return fetch(...args)
      }
    }
  }
)

