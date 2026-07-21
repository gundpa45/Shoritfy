
import getVideoId from "../utils/youtube.utils.js";
import getVideoDetails from "./youtube.service.js";

async function urlService(url:string){

 

    // business logic of the shortify
    // extract th ervideo id fro mthe vide of friom link 

    const videoId=  getVideoId(url)

    const videoDetails= await getVideoDetails(videoId)

    return {
        success :true,
       data:videoDetails,
    }
}


export default urlService;