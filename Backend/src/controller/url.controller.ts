


import type { Request, Response } from "express";

    async function isUrl(url:string){

    }


async function urlHandler(req: Request, res: Response) {
    const { url } = req.body;

    try {

        // if(isUrl(url)){
        //     res.status(400).json({ error: "URL is invalid" });
        // }

       if(!url){
        res.status(400).json({ error: "URL is required" });
       }
       

       const isValidUrl=isUrl(url);

    } catch (error: any) {
        console.log("The url creation has an error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export default {
    urlHandler,

};
