import getVideoDetails from "../services/youtube.service.js";
import downloadAudio from "../services/youtube/download.service.js";
import getVideoId from "../utils/youtube.utils.js";

async function youtubePipeline(url: string) {
    const videoId: string | undefined = getVideoId(url);

    console.log("step : 1");

    const videoDetails = await getVideoDetails(videoId);

    console.log("step : 2");    
    // console.log(videoDetails);

    const audioFile = await downloadAudio(url, videoId);
      console.log("step : 3");    
    // console.log(audioFile);
    return {
        success: true,
        data: {
            videoId,
            videoDetails,
            audioFile,
        },
    };
}

export default youtubePipeline;