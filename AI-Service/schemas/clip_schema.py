from pydantic import BaseModel


class ClipRequest(BaseModel):
    video_path: str