import { PrismaClient } from "../../generated/prisma/index.js"

const prisma = new PrismaClient()

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
