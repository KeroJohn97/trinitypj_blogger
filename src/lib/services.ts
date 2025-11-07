import ExifParser from "exif-parser"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

/**
 * GET /api/image-date?file=example.jpg
 * Returns the image creation date from EXIF metadata or file stats.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const fileName = searchParams.get("file")

    if (!fileName) {
      return NextResponse.json({ error: "Missing 'file' query parameter" }, { status: 400 })
    }

    // Locate image inside the public folder
    const imagePath = path.join(process.cwd(), "public", fileName)

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const buffer = fs.readFileSync(imagePath)

    // Try reading EXIF metadata
    try {
      const parser = ExifParser.create(buffer)
      const exifData = parser.parse()

      if (exifData.tags?.CreateDate) {
        // EXIF CreateDate is usually in seconds since epoch
        const createDate = new Date(exifData.tags.CreateDate * 1000)
        return NextResponse.json({ source: "exif", date: createDate.toISOString() })
      }
    } catch (exifErr) {
      console.warn("No EXIF data found or parsing failed:", exifErr)
    }

    // Fallback: use file system creation date
    const stats = fs.statSync(imagePath)
    return NextResponse.json({ source: "filesystem", date: stats.birthtime.toISOString() })
  } catch (error) {
    console.error("Error reading image date:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
