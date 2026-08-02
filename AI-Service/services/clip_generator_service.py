import json

from services.whisper_service import generate_transcript
from services.llm_service import analyze_transcript
from services.ffmpeg_service import cut_clip


def generate_clips(video_path: str) -> dict:
    """
    Complete AI Pipeline

    1. Generate transcript using Whisper
    2. Analyze transcript using Qwen
    3. Generate clips using FFmpeg
    4. Return transcript and generated clips
    """

    print("=" * 70)
    print("🎤 Step 1 : Generating Transcript...")
    print("=" * 70)

    transcript_data = generate_transcript(video_path)

    print("✅ Transcript Generated")

    segments = transcript_data["segments"]

    llm_response = analyze_transcript(segments)

    print("✅ Clip Analysis Complete")

    # Parse LLM response safely
    try:
        clips = llm_response["clips"]

    except Exception as e:
        raise Exception(f"Invalid response received from Qwen: {e}")

    print("=" * 70)
    print(f"🎬 Step 3 : Generating {len(clips)} Clips...")
    print("=" * 70)

    generated_clips = []

    for index, clip in enumerate(clips, start=1):

        print(f"Generating Clip {index}...")

        output = cut_clip(
            video_path=video_path,
            start=clip["start"],
            end=clip["end"],
            clip_name=f"clip_{index}"
        )

        generated_clips.append(
            {
                "clip_path": output,
                "start": clip["start"],
                "end": clip["end"],
                "score": clip["score"]
            }
        )

        print(f"✅ Clip {index} Generated")

    print("=" * 70)
    print("🎉 Pipeline Completed Successfully")
    print("=" * 70)

    return {
     "transcript": transcript_data["transcript"],
     "segments": transcript_data["segments"],
     "language": transcript_data["language"],
        "clips": generated_clips
}