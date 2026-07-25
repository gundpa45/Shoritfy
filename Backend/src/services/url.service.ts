import getVideoId from "../utils/youtube.utils.js";
import getVideoDetails from "./youtube.service.js";
import downloadAudio from "./youtube/download.service.js";

async function urlService(url: string) {
    // Extract the video ID
    const videoId = getVideoId(url);

    // Fetch video details
    const videoDetails = await getVideoDetails(videoId);

    // Download the audio
    const audioFile = await downloadAudio(url, videoId);

    return {
        success: true,
        data: {
            videoDetails,
            audioFile,
        },
    };
}

export default urlService;