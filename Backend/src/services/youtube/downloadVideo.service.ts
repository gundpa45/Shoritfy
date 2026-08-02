import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

async function downloadVideo(url: string, videoId: string | undefined) {

    const outputDir = path.join(
        process.cwd(),
        "..",
        "temp",
        "video"
    );

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Download template
    const outputTemplate = path.join(outputDir, `${videoId}.%(ext)s`);

        console.log("⬇️ Downloading optimized MP4 video...");

        await youtubedl(url, {
            format:
                "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4][height<=1080]/best",
            mergeOutputFormat: "mp4",
            output: outputTemplate,
            noPlaylist: true,
        });

        console.log("✅ Download completed.");

    // Find the actual downloaded file
    const downloadedFile = fs
        .readdirSync(outputDir)
        .find(file => file.startsWith(videoId!));

    if (!downloadedFile) {
        throw new Error("Downloaded video not found.");
    }

    const videoPath = path.join(outputDir, downloadedFile);

    console.log("✅ Downloaded Video:", videoPath);

    return videoPath;
}

export default downloadVideo;