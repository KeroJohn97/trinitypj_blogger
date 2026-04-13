import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.from("managed_assets").select("*, media_assets(*)")
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const assets = await request.json() 

  const { data, error } = await supabase.from("managed_assets").upsert(assets, { onConflict: "key" }).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  if (!key) return NextResponse.json({ error: "Missing key parameter" }, { status: 400 })

  const { error } = await supabase.from("managed_assets").delete().eq("key", key)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
