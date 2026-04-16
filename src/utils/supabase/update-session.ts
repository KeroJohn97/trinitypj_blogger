import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Robust Supabase session synchronization for Next.js Middleware.
 * This function ensures that session cookies are refreshed correctly
 * and propagated from the request to the response.
 */
export async function updateSession(request: NextRequest) {
  // 1. Create an initial response
  let res = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Initialize the Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Update request cookies for the current chain
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          // Re-clone the response to include the updated request headers
          res = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Apply the cookies to the actual response headers
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Refresh the session
  // IMPORTANT: We use getUser() as it is more secure than getSession()
  // as it revalidates the user with the Supabase Auth server.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 4. Return both the response (with updated cookies) and the user session status
  return { res, user }
}
