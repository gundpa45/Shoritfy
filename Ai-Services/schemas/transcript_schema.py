from pydantic import BaseModel

class TranscriptRequest(BaseModel):
    audio_path: str