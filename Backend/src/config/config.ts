import dotenv from "dotenv"
dotenv.config()

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env")
}

type Config = {
    DATABASE_URL: string,
    YOUTUBE_API_KEY: string,
    AI_SERVICE_URL: string,
    FRONTEND_URL: string,
    PORT: number,
}

const config: Config = {
    DATABASE_URL: process.env.DATABASE_URL,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
    AI_SERVICE_URL: process.env.AI_SERVICE_URL || "http://127.0.0.1:8000",
    FRONTEND_URL: process.env.FRONTEND_URL || "*",
    PORT: parseInt(process.env.PORT || "3200", 10),
}

export default config
