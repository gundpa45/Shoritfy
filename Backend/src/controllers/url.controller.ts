
import type { Request, Response } from "express";
import youtubePipeline from "../pipeline/youtube.pipeline.js";




async function urlHandler(req: Request, res: Response) {
    const { url } = req.body;

    try {

        const result= await youtubePipeline(url)
        console.log("result")
        return res.status(200).json(result);



    } catch (error: any) {
        console.log("The url creation has an error try real", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export default {
    urlHandler,

};
