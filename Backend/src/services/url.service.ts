
import getVideoId from "../utils/youtube.utils.js";

async function urlService(url:string){

 

    // business logic of the shortify
    // extract th ervideo id fro mthe vide of friom link 

    const videoId=  getVideoId(url)



    return {
        success :true,
        videoId:videoId,
        
    }
}


export default urlService;