// src/utils/storage-helpers.ts
export const storageHelpers = {
  generateFileName: (file: File) => {
    const fileExt = file.name.split(".").pop()
    return `logo-${Date.now()}.${fileExt}`
  },

  isValidImage: (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"]
    return validTypes.includes(file.type)
  },
}
