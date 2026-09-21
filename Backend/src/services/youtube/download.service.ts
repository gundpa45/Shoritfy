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

async function downloadAudio(url: string, videoId: string) {
    const outputDir = path.join(process.cwd(), "..", "temp", "audio");

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${videoId}.%(ext)s`);
    const finalPath = path.join(outputDir, `${videoId}.mp3`);

    // If the file already exists from a previous run, skip download
    if (fs.existsSync(finalPath)) {
        console.log(`♻️  Audio cache hit: ${finalPath}`);
        return finalPath;
    }

    // Clean up any stale .part files from previous failed attempts
    cleanPartFiles(outputDir, videoId);

    console.log("⬇️  Downloading audio...");

    try {
        await (youtubedl as any)(url, {
            extractAudio: true,
            audioFormat: "mp3",
            output: outputPath,
            noPlaylist: true,

            // ── Anti-403 & reliability flags ──
            forceOverwrites: true,
            noCheckCertificates: true,
            preferFreeFormats: true,
            addHeader: [
                "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "Accept-Language:en-US,en;q=0.9",
            ],
            retries: 5,
        });
    } catch (err: any) {
        // Surface the actual yt-dlp error message
        const stderr = err?.stderr || err?.message || "Unknown error";
        throw new Error(`Audio download failed: ${stderr}`);
    }

    if (!fs.existsSync(finalPath)) {
        throw new Error(
            `Audio download completed but file not found at ${finalPath}. ` +
            `Check if yt-dlp produced a different extension.`
        );
    }

    console.log(`✅ Audio downloaded: ${finalPath}`);
    return finalPath;
}

export default downloadAudio;