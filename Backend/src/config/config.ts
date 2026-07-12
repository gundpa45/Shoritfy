import dotenv from "dotenv"
dotenv.config()

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env")
}
if(!process.env.YOUTUBE_API_KEY){
    throw new Error("YOUTUBE_API_KEY is not defined in .env")
}

type Config = {
    DATABASE_URL: string,
    YOUTUBE_API_KEY:string,
}

const config: Config = {
    DATABASE_URL: process.env.DATABASE_URL,
    YOUTUBE_API_KEY:process.env.YOUTUBE_API_KEY,    
}

export default config
