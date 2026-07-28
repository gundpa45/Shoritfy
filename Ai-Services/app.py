from fastapi import FastAPI

app = FastAPI(
    title="Shortify AI Service",
    version="1.0.0",
    description="AI microservice for transcription, clip detection, subtitles, and more."
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Shortify AI Service is running 🚀"
    }