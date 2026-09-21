import os
import subprocess
from utils.logger import section, info, success


# Project root (Shortify/)
PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")
)


# Shared clips directory
OUTPUT_DIR = os.path.join(
    PROJECT_ROOT,
    "temp",
    "clips"
)

os.makedirs(OUTPUT_DIR, exist_ok=True)


def cut_clip(
    video_path: str,
    start: float,
    end: float,
    clip_name: str,
) -> str:
    """
    Cuts a clip from the original video.

    Args:
        video_path (str): Full path of the original video.
        start (float): Clip start time (seconds).
        end (float): Clip end time (seconds).
        clip_name (str): Output clip name.

    Returns:
        str: Full path of generated clip.
    """

    output_file = os.path.join(
        OUTPUT_DIR,
        f"{clip_name}.mp4"
    )

    command = [
        "ffmpeg",
        "-y",

        # Seek BEFORE input for speed (input seeking)
        "-ss",
        str(start),

        # Input video
        "-i",
        video_path,

        # Clip end relative to input
        "-to",
        str(end - start),

        # Select first video and audio stream
        "-map",
        "0:v:0",

        "-map",
        "0:a:0",

        # Video encoding — CPU-based (works everywhere, no GPU needed)
        "-c:v",
        "libx264",

        "-preset",
        "fast",

        "-crf",
        "23",

        # Audio encoding
        "-c:a",
        "aac",

        "-b:a",
        "192k",

        # Optimize MP4 for streaming
        "-movflags",
        "+faststart",

        output_file
    ]

    section("🎬 FFmpeg")

    info("Running FFmpeg")

    info(" ".join(command))

    subprocess.run(command, check=True)

    success(f"Clip generated: {output_file}")

    return output_file