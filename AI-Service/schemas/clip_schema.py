from pydantic import BaseModel

class ClipRequest(BaseModel):
    transcript: str