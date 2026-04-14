import { alphaService } from "@/services/alpha-service";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();
    const items = await alphaService.getAll(supabase);
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log("[ALPHA_API] POST Request Received");
    const supabase = createClient();
    console.log("[ALPHA_API] Checkpoint 1: Supabase Client Initialized");

    const body = await request.json();
    console.log("[ALPHA_API] Checkpoint 2: Body Parsed, items count:", Array.isArray(body) ? body.length : 1);

    // Ensure we are working with an array of items
    const items = Array.isArray(body) ? body : [body];

    // Save items using the modernized service layer
    console.log("[ALPHA_API] Checkpoint 3: Calling alphaService.saveAll...");
    const rawData = await alphaService.saveAll(items, supabase);
    console.log("[ALPHA_API] Checkpoint 4: saveAll completed gracefully.");

    // Defensive serialization: strip any non-serializable properties (like circular refs)
    const safeData: any = JSON.parse(JSON.stringify(rawData || []));

    return NextResponse.json({
      success: true,
      count: safeData?.length || 0,
      data: safeData
    });
  } catch (error: any) {
    console.error("[ALPHA_API] Checkpoint FAILURE:", error);
    // Explicitly convert to strings to avoid circular reference crashes in NextResponse.json
    return NextResponse.json({
      error: String(error?.message || "Failed to save alpha media content"),
      detail: error?.details ? String(error.details) : (error?.hint ? String(error.hint) : null),
      checkpoint: "FAILED"
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const supabase = createClient();
    await alphaService.deleteItem(id, supabase);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
