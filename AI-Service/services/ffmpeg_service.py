import os
import subprocess
from tracemalloc import start


def cut_clip(video_path: str, start: float, end: float):

    # Create output directory
    output_dir = "outputs"

    os.makedirs(output_dir, exist_ok=True)

    output_file = os.path.join(output_dir, "clip_1.mp4")

    command = [
        "ffmpeg",
        "-y",

        "-ss",
        str(start),

        "-to",
        str(end),

        "-i",
        video_path,

        "-map",
        "0:v:0",

        "-map",
        "0:a:0",

        "-c:v",
        "libx264",

        "-preset",
        "fast",

        "-crf",
        "23",

        "-c:a",
        "aac",

        "-b:a",
        "192k",

        output_file
    ]

    subprocess.run(command, check=True)

    return output_file