from fastapi import APIRouter

from schemas.clip_schema import ClipRequest
from services.clip_generator_service import generate_clips

router = APIRouter()


@router.post("/clips")
def create_clips(request: ClipRequest):

    result = generate_clips(request.video_path)

    return {
        "success": True,
        "data": result
    }