import axios from "axios";
import config from "../config/config.js";


async function getVideoDetails(videoId: string) {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
            part: "snippet,contentDetails",
            id: videoId,
            key: config.YOUTUBE_API_KEY,
        },
    });

    return response.data.items[0];
}

export default getVideoDetails;