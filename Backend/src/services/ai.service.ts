import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

async function generateClips(videoPath: string) {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/clips`,
      {
        video_path: videoPath
      },
      { timeout: 300000 } // 5 minutes timeout for AI processing
    );

    return response.data;
  } catch (error: any) {
    console.error("AI Service Error:", error.message || error);
    // Secure fallback: return structured response so pipeline does not crash
    return {
      success: false,
      error: "AI Service currently unavailable",
      fallbackClips: []
    };
  }
}

export default generateClips;