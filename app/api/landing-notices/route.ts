import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("landing_notices")
    .select(`
      *,
      media_assets (storage_path)
    `)
    .order("sort_order", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const notices = await request.json()

  // Ensure it's an array for upsert
  const payload = Array.isArray(notices) ? notices : [notices]

  const { data, error } = await supabase
    .from("landing_notices")
    .upsert(
      payload.map((n: any) => {
        const { media_assets, ...clean } = n
        return clean
      }),
      { onConflict: "id" }
    )
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
