from services.ffmpeg_service import cut_clip


video_path = r"D:\ME\Projects\Shortify\temp\video\FvkjmoQRApc.webm"

clip = cut_clip(
    video_path=video_path,
    start=10,
    end=20,
    clip_name="clip_1"
)

print(clip)