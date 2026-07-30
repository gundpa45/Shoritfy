from pydantic import BaseModel


class Segment(BaseModel):
    start: float
    end: float
    text: str


class ClipRequest(BaseModel):
    segments: list[Segment]