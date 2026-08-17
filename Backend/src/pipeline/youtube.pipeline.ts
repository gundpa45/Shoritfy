import path from "path";
import generateClips from "../services/ai.service.js";
// import getTranscript from "../services/transcript/transcript.service.js";
import getVideoDetails from "../services/youtube.service.js";
import downloadAudio from "../services/youtube/download.service.js";
import downloadVideo from "../services/youtube/downloadVideo.service.js";
import { getVideoId, buildCanonicalUrl } from "../utils/youtube.utils.js";

async function youtubePipeline(url: string) {
    // Extract a validated video ID and build a clean canonical URL.
    // This guarantees yt-dlp always receives https://www.youtube.com/watch?v=ID
    // regardless of what the user pasted (missing protocol, short links, etc.)
    const videoId: string = getVideoId(url);
    const canonicalUrl: string = buildCanonicalUrl(videoId);

    console.log(`✅ Parsed videoId: ${videoId}`);
    console.log(`✅ Canonical URL:  ${canonicalUrl}`);

    console.log("step : 1 - Fetching video details");
    const videoDetails = await getVideoDetails(videoId);

    console.log("step : 2 - Downloading audio");
    const audioFile = await downloadAudio(canonicalUrl, videoId);

    console.log("step : 3 - Downloading video");
    const videoFile = await downloadVideo(canonicalUrl, videoId);

    console.log("step : 4 - Generating AI clips");
    const clipResult = await generateClips(videoFile);

    // Convert absolute clip paths to HTTP-accessible URLs
    let processedClips: any[] = [];
    if (clipResult?.data?.clips) {
        processedClips = clipResult.data.clips.map((clip: any, index: number) => {
            const clipFilename = path.basename(clip.clip_path);
            return {
                ...clip,
                clip_url: `/media/clips/${clipFilename}`,
                clip_filename: clipFilename,
                index: index + 1,
            };
        });
    }

    // Convert source video path to HTTP URL
    const videoFilename = path.basename(videoFile);
    const videoUrl = `/media/video/${videoFilename}`;

    console.log("✅ Pipeline complete. Clips:", processedClips.length);

    return {
        success: true,
        data: {
            videoId,
            sourceUrl: canonicalUrl,
            videoDetails,
            videoUrl,
            clips: processedClips,
            transcript: clipResult?.data?.transcript || "",
            segments: clipResult?.data?.segments || [],
            language: clipResult?.data?.language || "unknown",
        },
    };
}

export default youtubePipeline;