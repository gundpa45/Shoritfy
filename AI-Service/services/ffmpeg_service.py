import os
import subprocess


def cut_clip(
    video_path: str,
    start: float,
    end: float,
    clip_name: str,
) -> str:

    output_dir = "outputs"
    os.makedirs(output_dir, exist_ok=True)

    output_file = os.path.join(output_dir, f"{clip_name}.mp4")

    command = [
        "ffmpeg",
        "-y",
        "-i", video_path,
        "-ss", str(start),
        "-to", str(end),

        "-map", "0:v:0",
        "-map", "0:a:0",

        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",

        "-c:a", "aac",
        "-b:a", "192k",

        "-movflags", "+faststart",

        output_file,
    ]

    subprocess.run(command, check=True)

    return output_file