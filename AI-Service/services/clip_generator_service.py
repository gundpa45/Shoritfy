import json

from services.transcript_chunk_service import create_chunks
from services.whisper_service import generate_transcript
from services.llm_service import analyze_transcript
from services.ffmpeg_service import cut_clip
from services.compress_transcript_service import compress_transcript
from concurrent.futures import ThreadPoolExecutor


def generate_single_clip(video_path, clip, index):

    print(f"Generating Clip {index}...")

    output = cut_clip(
        video_path=video_path,
        start=clip["start"],
        end=clip["end"],
        clip_name=f"clip_{index}"
    )

    print(f"✅ Clip {index} Generated")

    return {
        "clip_path": output,
        "start": clip["start"],
        "end": clip["end"],
        "score": clip["score"]
    }


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

    compressed_segments = compress_transcript(segments)

    print(f"Original Segments : {len(segments)}")
    print(f"Compressed Segments : {len(compressed_segments)}")


    # chunk separting 
    chunks = create_chunks(compressed_segments)

    print("=" * 60)
    print(f"Total Chunks : {len(chunks)}")

    for i, chunk in enumerate(chunks, start=1):
        print(f"Chunk {i} -> {len(chunk)} segments")
            # ending 
    print("=" * 70)
    print("🧠 Step 2 : Analyzing Chunks...")
    print("=" * 70)

    all_clips = []

    for index, chunk in enumerate(chunks, start=1):

        print(f"\nAnalyzing Chunk {index}/{len(chunks)}")

        llm_response = analyze_transcript(chunk)

        try:
            chunk_clips = llm_response["clips"]

            print(f"✅ Chunk {index} -> {len(chunk_clips)} clips found")

            all_clips.extend(chunk_clips)

        except Exception as e:
            print(f"❌ Failed Chunk {index}")

            raise Exception(
                f"Invalid response received from Qwen : {e}"
            )


    print("\nSorting clips...")

    all_clips.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    clips = all_clips[:5]

    print(f"Selected Top {len(clips)} Clips")


    # different top 
    print("=" * 70)
    print(f"🎬 Step 3 : Generating {len(clips)} Clips...")
    print("=" * 70)

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

    print("=" * 70)
    print("🎉 Pipeline Completed Successfully")
    print("=" * 70)

    return {
     "transcript": transcript_data["transcript"],
     "segments": transcript_data["segments"],
     "language": transcript_data["language"],
        "clips": generated_clips
}