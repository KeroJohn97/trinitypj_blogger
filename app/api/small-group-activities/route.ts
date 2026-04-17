// app/api/small-group-activities/route.ts
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("small_group_activities")
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
  const activities = await request.json()

  const { data, error } = await supabase
    .from("small_group_activities")
    .upsert(activities, { onConflict: "id" })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

  const { error } = await supabase
    .from("small_group_activities")
    .delete()
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
