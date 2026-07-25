
import getVideoId from "../utils/youtube.utils.js";
import getVideoDetails from "./youtube.service.js";
import downloadAudio from "./youtube/download.service.js";

async function urlService(url:string){

 

    // business logic of the shortify
    // extract th ervideo id fro mthe vide of friom link 

    const videoId=  getVideoId(url)

    const videoDetails= await getVideoDetails(videoId);
    const audeioFile= await downloadAudio(url, videoId);

    return {
        success :true,
       data:videoDetails,
    }
}


export default urlService;