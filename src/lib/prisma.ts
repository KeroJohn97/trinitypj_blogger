import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

// 1. Initialize the connection pool
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })

// 2. Create the adapter
// If you still see a red line here, use: new PrismaPg(pool as any)
const adapter = new PrismaPg(pool as any)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter, // Now this should be recognized
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
