


import type { Request, Response } from "express";
import urlService from "../services/url.service.js";



async function urlHandler(req: Request, res: Response) {
    const { url } = req.body;

    try {

        const result= await urlService(url)
       
        return res.status(200).json(result);



    } catch (error: any) {
        console.log("The url creation has an error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export default {
    urlHandler,

};
