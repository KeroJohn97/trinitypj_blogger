import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabase
    .from("website_settings") // snake_case
    .select("*")
    .single()

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  // Map snake_case back to camelCase for the frontend
  const formattedData = data
    ? {
        title: data.title,
        primaryColor: data.primary_color,
        logoUrl: data.logo_url,
        description: data.description,
        socialLinks: data.social_links,
      }
    : null

  return NextResponse.json({ success: true, data: formattedData })
}

export async function POST(req: Request) {
  try {
    const body: any = await req.json()

    // SERVER-SIDE LOG: Watch your terminal!
    console.log("Saving to DB:", body)

    const { data, error } = await supabase
      .from("website_settings") // snake_case table
      .upsert({
        id: "default-settings",
        title: body.title,
        primary_color: body.primaryColor, // Mapping camel -> snake
        logo_url: body.logoUrl, // Mapping camel -> snake
        description: body.description,
        social_links: body.socialLinks, // Mapping camel -> snake
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("SUPABASE ERROR:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error.details,
        },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
