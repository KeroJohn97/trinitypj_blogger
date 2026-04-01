// app/api/gatherings/route.ts
import { createClient } from "@/utils/supabase/server" // Adjust path
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase.from("prayer_gathering").select("*").order("created_at", { ascending: false })

  // If there's a DB error, return it clearly
  if (error) {
    console.error("Supabase Error:", error)
    return NextResponse.json({ db_error: error.message }, { status: 500 })
  }

  // Ensure we return an empty array if data is null
  return NextResponse.json(data || [])
}

export async function POST(request: Request) {
  const supabase = createClient()
  const body = await request.json() // This will be the array of items

  // 1. Ensure body is an array
  const items = Array.isArray(body) ? body : [body]

  // 2. Map frontend camelCase to database snake_case
  const dbItems = items.map((item: any, index: number) => ({
    sort_order: index,
    id: item.id,
    type: item.type,
    is_active: item.isActive,
    title: item.title,
    day: item.day,
    time: item.time,
    venue: item.venue,
    mode: item.mode,
    leader: item.leader,
    contact: item.contact,
    note: item.note,
  }))

  // 3. Use UPSERT
  // onConflict: 'id' tells Supabase to use the ID to decide between Insert vs Update
  const { data, error } = await supabase.from("prayer_gathering").upsert(dbItems, { onConflict: "id" }).select()

  if (error) {
    console.error("Upsert Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
