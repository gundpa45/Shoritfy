import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

/**
 * Clean up any leftover .part files from previous failed downloads.
 */
function cleanPartFiles(dir: string, videoId: string) {
    if (!fs.existsSync(dir)) return;
    const partFiles = fs.readdirSync(dir).filter(
        (f) => f.startsWith(videoId) && f.endsWith(".part")
    );
    for (const pf of partFiles) {
        try {
            fs.unlinkSync(path.join(dir, pf));
            console.log(`🧹 Cleaned up partial file: ${pf}`);
        } catch {
            // ignore cleanup errors
        }
    }
}

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

    // Clean up any stale .part files from previous failed attempts
    cleanPartFiles(outputDir, videoId);

    console.log("⬇️ Downloading optimized MP4 video...");

    try {
        await (youtubedl as any)(url, {
            format:
                "bestvideo[ext=mp4][height<=1080]+bestaudio[ext=m4a]/best[ext=mp4][height<=1080]/best",
            mergeOutputFormat: "mp4",
            output: outputTemplate,
            noPlaylist: true,

            // ── Anti-403 & reliability flags ──
            forceOverwrites: true,
            noCheckCertificates: true,
            addHeader: [
                "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "Accept-Language:en-US,en;q=0.9",
            ],
            retries: 5,
        });
    } catch (err: any) {
        // Surface the actual yt-dlp error message
        const stderr = err?.stderr || err?.message || "Unknown error";
        throw new Error(`Video download failed: ${stderr}`);
    }

    console.log("✅ Download completed.");

    // Find the actual downloaded file
    const downloadedFile = fs
        .readdirSync(outputDir)
        .find((file) => file.startsWith(videoId) && !file.endsWith(".part"));

    if (!downloadedFile) {
        throw new Error("Downloaded video not found.");
    }

    const videoPath = path.join(outputDir, downloadedFile);
    console.log("✅ Downloaded Video:", videoPath);

    return videoPath;
}

export default downloadVideo;