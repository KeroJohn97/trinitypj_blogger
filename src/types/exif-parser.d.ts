declare module "exif-parser" {
  interface ExifTags {
    [key: string]: any
    CreateDate?: number
  }

  interface ExifData {
    tags: ExifTags
  }

  interface ExifParser {
    parse(): ExifData
  }

  interface ExifParserStatic {
    create(buffer: Buffer): ExifParser
  }

  const parser: ExifParserStatic
  export = parser
}
