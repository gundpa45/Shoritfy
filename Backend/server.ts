import "dotenv/config"
import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"

const PORT = parseInt(process.env.PORT || "3200", 10)
const SELF_PING_INTERVAL_MS = 14 * 60 * 1000 // 14 minutes — Render sleeps after 15min inactivity
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000"

/**
 * Keep-alive: Ping our own /health endpoint every 14 minutes
 * to prevent Render's free tier from spinning down the service.
 */
function startKeepAlive() {
    const selfUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`

    setInterval(async () => {
        try {
            const res = await fetch(`${selfUrl}/health`)
            console.log(`💓 Keep-alive ping: ${res.status}`)
        } catch (err) {
            console.warn("💔 Keep-alive ping failed:", (err as Error).message)
        }
    }, SELF_PING_INTERVAL_MS)

    console.log(`💓 Keep-alive enabled: pinging every ${SELF_PING_INTERVAL_MS / 60000}min`)
}

/**
 * Warm up the AI Service on startup so it's ready when the first request arrives.
 * Non-blocking — failures are expected during local dev.
 */
async function warmupAIService() {
    try {
        const res = await fetch(`${AI_SERVICE_URL}/health`, { signal: AbortSignal.timeout(10000) })
        console.log(`🤖 AI Service warmup: ${res.status}`)
    } catch {
        console.warn("🤖 AI Service not reachable yet (will retry on first request)")
    }
}

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`🚀 Server started at port ${PORT}`)
    await connectDB()
    startKeepAlive()
    warmupAIService()
})