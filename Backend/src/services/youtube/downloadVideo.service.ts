import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

async function downloadVideo(url: string, videoId: string) {
    const outputDir = path.join(process.cwd(), "..", "temp", "video");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputTemplate = path.join(outputDir, `${videoId}.%(ext)s`);
    const expectedPath = path.join(outputDir, `${videoId}.mp4`);

    // If the file already exists from a previous run, skip download
    if (fs.existsSync(expectedPath)) {
        console.log(`♻️  Video cache hit: ${expectedPath}`);
        return expectedPath;
    }

    console.log("⬇️ Downloading optimized MP4 video...");

    await youtubedl(url, {
        format:
            "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4][height<=1080]/best",
        mergeOutputFormat: "mp4",
        output: outputTemplate,
        noPlaylist: true,

        // ── Anti-403 & reliability flags ──
        forceOverwrites: true,          // Prevents WinError 32 file-lock crashes
        noCheckCertificates: true,      // Avoid SSL issues on some networks
        addHeader: [                    // Mimic a real browser request
            "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "Accept-Language:en-US,en;q=0.9",
        ],
        retries: 3,                     // Retry on transient failures
        jsRuntimes: "node",             // Required: yt-dlp needs Node to decrypt YouTube's JS cipher
    });

    console.log("✅ Download completed.");

    // Find the actual downloaded file
    const downloadedFile = fs
        .readdirSync(outputDir)
        .find((file) => file.startsWith(videoId));

    if (!downloadedFile) {
        throw new Error("Downloaded video not found.");
    }

    const videoPath = path.join(outputDir, downloadedFile);
    console.log("✅ Downloaded Video:", videoPath);

    return videoPath;
}

export default downloadVideo;