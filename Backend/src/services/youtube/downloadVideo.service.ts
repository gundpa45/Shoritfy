import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

async function downloadVideo(url: string, videoId: string | undefined) {
    // Create the output directory
    const outputDir = path.join(process.cwd(), "src", "temp", "video");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Output file path
    const outputPath = path.join(outputDir, `${videoId}.%(ext)s`);

    // Download the video
    await youtubedl(url, {
        format: "bestvideo+bestaudio/best",
        output: outputPath,
        noPlaylist: true,
    });

    // Return the expected video path
    return path.join(outputDir, `${videoId}.mp4`);
}

export default downloadVideo;