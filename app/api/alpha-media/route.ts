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
    const supabase = createClient();
    const body = await request.json();
    
    // Ensure we are working with an array of items
    const items = Array.isArray(body) ? body : [body];
    
    // Save items using the modernized service layer
    const data = await alphaService.saveAll(items, supabase);
    
    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      data 
    });
  } catch (error: any) {
    console.error("[ALPHA_MEDIA_POST_ERROR]", error);
    return NextResponse.json({ 
      error: error.message || "Failed to save alpha media content" 
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
