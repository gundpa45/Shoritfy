import os
import subprocess


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

        # Input video
        "-i",
        video_path,

        # Clip timestamps
        "-ss",
        str(start),

        "-to",
        str(end),

        # Select first video and audio stream
        "-map",
        "0:v:0",

        "-map",
        "0:a:0",

        # Video encoding
        # GPU Encoding (NVIDIA NVENC)
        "-c:v",
        "h264_nvenc",

        "-preset",
        "p5",

        "-rc",
        "vbr",

        "-cq",
        "23",

        "-b:v",
        "0",

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

    print("=" * 70)
    print("Running FFmpeg...")
    print(" ".join(command))
    print("=" * 70)

    subprocess.run(command, check=True)

    print(f"✅ Clip generated: {output_file}")

    return output_file