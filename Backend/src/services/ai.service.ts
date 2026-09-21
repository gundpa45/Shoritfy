import axios from "axios";
import config from "../config/config.js";

async function generateClips(videoPath: string) {
  try {
    console.log(`🤖 Calling AI Service at: ${config.AI_SERVICE_URL}`);

    const response = await axios.post(
      `${config.AI_SERVICE_URL}/clips`,
      {
        video_path: videoPath
      },
      { timeout: 600000 } // 10 minutes timeout for AI processing (Whisper + Gemini + FFmpeg)
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