// app/api/admin/website-settings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { title: string; primaryColor: string; description: string; socialLinks: any };
    const { title, primaryColor, description, socialLinks } = body;

    // Use upsert to handle both first-time setup and updates
    const settings = await prisma.websiteSettings.upsert({
      where: { id: "default-settings" }, // We use a hardcoded ID for single-site builders
      update: {
        title,
        primaryColor,
        description,
        socialLinks,
      },
      create: {
        id: "default-settings",
        title,
        primaryColor,
        description,
        socialLinks,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to save settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}