from concurrent.futures import ThreadPoolExecutor

from utils.logger import (
    section,
    info,
    success,
    error
)

from utils.timer import PipelineTimer

from services.whisper_service import generate_transcript
from services.compress_transcript_service import compress_transcript
from services.transcript_chunk_service import create_chunks
from services.llm_service import analyze_transcript
from services.ffmpeg_service import cut_clip


timer = PipelineTimer()


def generate_single_clip(video_path, clip, index):
    """
    Generate a single clip using FFmpeg.
    """

    info(f"Generating Clip {index}")

    with timer.track(f"FFmpeg Clip {index}"):

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


def generate_clips(video_path: str):

    section("🎤 Step 1 : Generating Transcript")

    with timer.track("Whisper"):

        transcript_data = generate_transcript(video_path)

    success("Transcript Generated")

    segments = transcript_data["segments"]

    with timer.track("Compress Transcript"):

        compressed_segments = compress_transcript(segments)

    info(f"Original Segments   : {len(segments)}")
    info(f"Compressed Segments : {len(compressed_segments)}")

    with timer.track("Chunk Creation"):

        chunks = create_chunks(compressed_segments)

    section("📦 Transcript Chunks")

    info(f"Total Chunks : {len(chunks)}")

    for index, chunk in enumerate(chunks, start=1):
        info(f"Chunk {index} : {len(chunk)} segments")

    section("🧠 Step 2 : Analyzing Chunks")

    all_clips = []

    for index, chunk in enumerate(chunks, start=1):

        info(f"Analyzing Chunk {index}/{len(chunks)}")

        with timer.track(f"LLM Chunk {index}"):

            llm_response = analyze_transcript(chunk)

        try:

            chunk_clips = llm_response["clips"]

            success(
                f"Chunk {index} Completed ({len(chunk_clips)} clips)"
            )

            all_clips.extend(chunk_clips)

        except Exception as e:

            error(f"Chunk {index} Failed")

            raise Exception(
                f"Invalid response received from Qwen: {e}"
            )

    section("🏆 Ranking Clips")

    with timer.track("Ranking"):

        all_clips.sort(
            key=lambda clip: clip["score"],
            reverse=True
        )

        clips = all_clips[:5]

    success(f"Selected Top {len(clips)} Clips")

    section(f"🎬 Generating {len(clips)} Clips")

    with timer.track("FFmpeg Total"):

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

    section("🎉 Pipeline Completed Successfully")

    return {

        "transcript": transcript_data["transcript"],

        "segments": transcript_data["segments"],

        "language": transcript_data["language"],

        "clips": generated_clips

    }