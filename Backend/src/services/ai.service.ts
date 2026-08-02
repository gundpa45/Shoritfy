import axios from "axios";

const AI_SERVICE_URL = "http://127.0.0.1:8000";

async function generateClips(videoPath: string) {
    const response = await axios.post(
        `${AI_SERVICE_URL}/clips`,
        {
            video_path: videoPath
        }
    );

    return response.data;
}

export default generateClips;