from concurrent.futures import ThreadPoolExecutor

from utils.logger import (
    section,
    info,
    success,
    error
)

from services.whisper_service import generate_transcript
from services.compress_transcript_service import compress_transcript
from services.transcript_chunk_service import create_chunks
from services.llm_service import analyze_transcript
from services.ffmpeg_service import cut_clip


def generate_single_clip(video_path, clip, index):
    """
    Generate a single clip using FFmpeg.
    """

    info(f"Generating Clip {index}")

    output = cut_clip(
        video_path=video_path,
        start=clip["start"],
        end=clip["end"],
        clip_name=f"clip_{index}"
    )

    success(f"Clip {index} Generated")

    return {
        "clip_path": output,
        "start": clip["start"],
        "end": clip["end"],
        "score": clip["score"]
    }


def generate_clips(video_path: str) -> dict:
    """
    Complete AI Pipeline

    1. Whisper Transcript
    2. Compress Transcript
    3. Split into Chunks
    4. Analyze each Chunk
    5. Rank Best Clips
    6. Generate Clips using FFmpeg
    """

    # ==========================================================
    # Step 1 - Transcript
    # ==========================================================

    section("🎤 Step 1 : Generating Transcript")

    transcript_data = generate_transcript(video_path)

    success("Transcript Generated")

    segments = transcript_data["segments"]

    compressed_segments = compress_transcript(segments)

    info(f"Original Segments   : {len(segments)}")
    info(f"Compressed Segments : {len(compressed_segments)}")

    # ==========================================================
    # Step 2 - Chunking
    # ==========================================================

    chunks = create_chunks(compressed_segments)

    section("📦 Transcript Chunks")

    info(f"Total Chunks : {len(chunks)}")

    for index, chunk in enumerate(chunks, start=1):
        info(f"Chunk {index} : {len(chunk)} segments")

    # ==========================================================
    # Step 3 - LLM Analysis
    # ==========================================================

    section("🧠 Step 2 : Analyzing Chunks")

    all_clips = []

    for index, chunk in enumerate(chunks, start=1):

        info(f"Analyzing Chunk {index}/{len(chunks)}")

        llm_response = analyze_transcript(chunk)

        try:

            chunk_clips = llm_response["clips"]

            success(
                f"Chunk {index} Completed "
                f"({len(chunk_clips)} clips)"
            )

            all_clips.extend(chunk_clips)

        except Exception as e:

            error(f"Chunk {index} Failed")

            raise Exception(
                f"Invalid response received from Qwen: {e}"
            )

    # ==========================================================
    # Step 4 - Ranking
    # ==========================================================

    section("🏆 Ranking Clips")

    all_clips.sort(
        key=lambda clip: clip["score"],
        reverse=True
    )

    clips = all_clips[:5]

    success(f"Selected Top {len(clips)} Clips")

    # ==========================================================
    # Step 5 - Clip Generation
    # ==========================================================

    section(f"🎬 Generating {len(clips)} Clips")

    with ThreadPoolExecutor(max_workers=2) as executor:

        generated_clips = list(
            executor.map(
                lambda item: generate_single_clip(
                    video_path,
                    item[1],
                    item[0]
                ),
                enumerate(clips, start=1)
            )
        )

    # ==========================================================
    # Finished
    # ==========================================================

    section("🎉 Pipeline Completed Successfully")

    return {
        "transcript": transcript_data["transcript"],
        "segments": transcript_data["segments"],
        "language": transcript_data["language"],
        "clips": generated_clips
    }