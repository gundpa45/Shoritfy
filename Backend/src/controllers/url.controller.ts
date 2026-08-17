
import type { Request, Response } from "express";
import youtubePipeline from "../pipeline/youtube.pipeline.js";


async function urlHandler(req: Request, res: Response) {
    const { url } = req.body;

    try {
        const result = await youtubePipeline(url);
        return res.status(200).json(result);

    } catch (error: any) {
        console.error("❌ Pipeline error:", error.message || error);

        // Determine the right status code and message
        const message = error.message || "Internal Server Error";
        const isClientError =
            message.includes("Invalid URL") ||
            message.includes("Not a YouTube URL") ||
            message.includes("Could not extract") ||
            message.includes("not a valid 11-character");

        return res.status(isClientError ? 400 : 500).json({
            success: false,
            error: message,
        });
    }
}


export default {
    urlHandler,
};
