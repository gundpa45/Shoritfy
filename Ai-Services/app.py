from fastapi import FastAPI

from schemas.transcript_schema import TranscriptRequest
from services.transcript_service import generate_transcript

app = FastAPI(
    title="Shortify AI Service",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Shortify AI Service Running"
    }

@app.post("/transcribe")
def transcribe(request: TranscriptRequest):
    return generate_transcript(request.audio_path)