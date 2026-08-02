import generateClips from "../services/ai.service.js";
// import getTranscript from "../services/transcript/transcript.service.js";
import getVideoDetails from "../services/youtube.service.js";
import downloadAudio from "../services/youtube/download.service.js";
import downloadVideo from "../services/youtube/downloadVideo.service.js";
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
    const videoFile = await downloadVideo(url, videoId);
     console.log("step : 4");
    // const transcriptFile= await getTranscript(videoId);
    const clip =await generateClips(videoFile);
console.log("Video File Sent To AI:", videoFile);
    return {
        success: true,
        data: {
            videoId,
            videoDetails,
            audioFile,
            videoFile,
            clip,
            // transcriptFile,
        },
    };
}

export default youtubePipeline;