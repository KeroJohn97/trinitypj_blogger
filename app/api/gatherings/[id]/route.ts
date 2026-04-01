import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

// Update the type definition: params is now a Promise
type RouteContext = {
  params: Promise<{ id: string }>
}

export async function PUT(request: Request, { params }: RouteContext) {
  const supabase = createClient()

  // 1. Unwrapping the params Promise
  const { id } = await params

  const body: any = await request.json()

  const { error } = await supabase
    .from("prayer_gathering")
    .update({
      type: body.type,
      is_active: body.isActive,
      title: body.title,
      day: body.day,
      time: body.time,
      venue: body.venue,
      mode: body.mode,
      leader: body.leader,
      contact: body.contact,
      note: body.note,
    })
    .eq("id", id) // Use the unwrapped id

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type as Promise
) {
  const supabase = createClient()
  const { id } = await params // MUST await this in Next.js 16

  const { error } = await supabase.from("prayer_gathering").delete().eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
