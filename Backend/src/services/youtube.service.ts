import axios from "axios";
import config from "../config/config.js";



async function getVideoDetails(videoId: string): Promise<any> {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
            part: "snippet,contentDetails",
            id: videoId,
            key: config.YOUTUBE_API_KEY,
        },
    });

    const video= response.data.items[0];
    


 return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    thumbnail:
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.default?.url,
    duration: video.contentDetails.duration,
};  
}

   

export default getVideoDetails;