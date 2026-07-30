from fastapi import APIRouter

from schemas.clip_schema import ClipRequest
from services.llm_service import analyze_transcript

router = APIRouter()


@router.post("/clips")
def detect_clips(request: ClipRequest):
    return analyze_transcript(request.segments)