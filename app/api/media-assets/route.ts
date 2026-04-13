import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()
  // Order by created_at desc so latest uploaded are first
  const { data, error } = await supabase.from("media_assets").select("*").order("created_at", { ascending: false })
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const assets = await request.json() 

  // Batch upsert to update filename or alt_text
  const { data, error } = await supabase.from("media_assets").upsert(assets).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) return NextResponse.json({ error: "Missing id parameter" }, { status: 400 })

  // 1. Fetch file to get storage path
  const { data: asset } = await supabase.from("media_assets").select("storage_path").eq("id", id).single()

  // 2. Try to Delete from database first to catch Foreign Key Violations (In-Use Checks)
  // === MANUAL VALIDATION: Some projects lack explicit Postgres FK constraints ===
  
  // Check if it's used in web_activities
  const { count: actCount } = await supabase
    .from("web_activities")
    .select("*", { count: 'exact', head: true })
    .eq("image_id", id)
    
  if (actCount && actCount > 0) {
    return NextResponse.json({ error: "Cannot delete this asset. It is currently linked to an active Upcoming Activity carousel item." }, { status: 409 })
  }

  // Check if it's used in website_settings (Logo)
  const { count: setCount } = await supabase
    .from("website_settings")
    .select("*", { count: 'exact', head: true })
    .eq("logo_image_id", id)

  if (setCount && setCount > 0) {
    return NextResponse.json({ error: "Cannot delete this asset. It is currently set as the primary Website Logo in General Settings." }, { status: 409 })
  }

  // Check if it's used in lcec_settings (Banner or Chart)
  const { count: lcecCount } = await supabase
    .from("lcec_settings")
    .select("*", { count: 'exact', head: true })
    .or(`banner_image_id.eq.${id},chart_image_id.eq.${id}`)

  if (lcecCount && lcecCount > 0) {
    return NextResponse.json({ error: "Cannot delete this asset. It is currently set as an image on the LCEC Page. Please change it there first." }, { status: 409 })
  }

  // Fallback to strict Postgres constraint (Just in case)
  const { error } = await supabase.from("media_assets").delete().eq("id", id)

  if (error) {
    if (error.code === "23503") {
      return NextResponse.json({ error: "Cannot delete this asset. It is currently linked to an active component in the database." }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // 3. Deletion succeeded in DB, now safely remove the physical file
  if (asset?.storage_path) {
    // Determine bucket from path if needed, assuming 'brand-assets'
    const bucket = asset.storage_path.split('/')[0]
    const filePath = asset.storage_path.replace(`${bucket}/`, '')

    // Delete from storage
    if (bucket && filePath) {
      await supabase.storage.from(bucket).remove([filePath])
    }
  }

  return NextResponse.json({ success: true })
}
