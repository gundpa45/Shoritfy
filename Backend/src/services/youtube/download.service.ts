import youtubedl from "yt-dlp-exec";
import path from "path";
import fs from "fs";

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

    await youtubedl(url, {
        extractAudio: true,
        audioFormat: "mp3",
        output: outputPath,
        noPlaylist: true,

        // ── Anti-403 & reliability flags ──
        forceOverwrites: true,          // Prevents WinError 32 file-lock crashes
        noCheckCertificates: true,      // Avoid SSL issues on some networks
        preferFreeFormats: true,        // Better compatibility
        addHeader: [                    // Mimic a real browser request
            "User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
            "Accept-Language:en-US,en;q=0.9",
        ],
        retries: 3,                     // Retry on transient failures
        jsRuntimes: "node",             // Required: yt-dlp needs Node to decrypt YouTube's JS cipher
    });

    return finalPath;
}

export default downloadAudio;