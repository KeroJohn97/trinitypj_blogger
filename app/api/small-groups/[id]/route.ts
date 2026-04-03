import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

type RouteContext = {
  params: Promise<{ id: string }>
}

// PUT: Update a single small group
export async function PUT(request: Request, { params }: RouteContext) {
  const supabase = await createClient()
  const { id } = await params // Next.js 16 async params
  const body: any = await request.json()

  const { data, error } = await supabase
    .from("small_groups")
    .update({
      name: body.name,
      leader_name: body.leader_name,
      meeting_day: body.meeting_day,
      meeting_time: body.meeting_time,
      location_area: body.location_area,
      contact_number: body.contact_number,
      category: body.category,
      is_active: body.is_active,
    })
    .eq("id", id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data: data[0] })
}

// DELETE: Remove a single small group
export async function DELETE(request: Request, { params }: RouteContext) {
  const supabase = await createClient()
  const { id } = await params

  const { error } = await supabase.from("small_groups").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
