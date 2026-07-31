from services.ffmpeg_service import cut_clip

video_path = r"D:\ME\Projects\Shortify\Backend\src\temp\video\fDiEUxt9l7c.webm"

clip = cut_clip(
    video_path=video_path,
    start=10,
    end=20
)

print("Clip created:")
print(clip)