import os
import asyncio
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.clip import router as clip_router
import sys
import io
import httpx

# Force UTF-8 encoding for standard output on Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

from schemas.transcript_schema import TranscriptRequest
from services.whisper_service import generate_transcript

load_dotenv()

SELF_PING_INTERVAL = 14 * 60  # 14 minutes — Render sleeps after 15min inactivity


async def keep_alive_loop():
    """Ping our own /health endpoint every 14 minutes to prevent Render sleep."""
    self_url = os.getenv("RENDER_EXTERNAL_URL", f"http://localhost:{os.getenv('PORT', '8000')}")
    await asyncio.sleep(30)  # Wait 30s after startup before first ping
    async with httpx.AsyncClient() as client:
        while True:
            try:
                res = await client.get(f"{self_url}/health", timeout=10)
                print(f"💓 Keep-alive ping: {res.status_code}")
            except Exception as e:
                print(f"💔 Keep-alive ping failed: {e}")
            await asyncio.sleep(SELF_PING_INTERVAL)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI lifespan: start keep-alive on startup, clean up on shutdown."""
    task = asyncio.create_task(keep_alive_loop())
    print(f"💓 Keep-alive enabled: pinging every {SELF_PING_INTERVAL // 60}min")
    yield
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        pass


app = FastAPI(
    title="Shortify AI Service",
    version="1.0.0",
    description="AI-powered video clip detection service using Whisper + Gemini",
    lifespan=lifespan,
)

# CORS — allow backend to call this service
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "Shortify AI Service Running"
    }


@app.get("/health")
def health():
    """Health check endpoint for cloud platform readiness probes."""
    return {
        "status": "healthy",
        "service": "shortify-ai",
        "version": "1.0.0"
    }


@app.post("/transcribe")
def transcribe(request: TranscriptRequest):
    return generate_transcript(request.audio_path)


app.include_router(clip_router)


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )