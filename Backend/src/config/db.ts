import "dotenv/config"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../generated/prisma/index.js"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`
    console.log("✅ Database connection established successfully.")
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error)
    process.exit(1)
  }
}

export default prisma
