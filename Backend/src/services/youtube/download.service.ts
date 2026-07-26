import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

async function downloadAudio(url: string, videoId: string) {
    const outputDir = path.join(process.cwd(), "src/temp", "audio");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${videoId}.%(ext)s`);

    await youtubedl(url, {
        extractAudio: true,
        audioFormat: "mp3",
        output: outputPath,
        noPlaylist: true,   
    });

    return path.join(outputDir, `${videoId}.mp3`);
}

export default downloadAudio;