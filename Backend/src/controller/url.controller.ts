


import type { Request, Response } from "express";



async function urlHandler(req: Request, res: Response) {
    const { url } = req.body;

    try {

  
       

       

    } catch (error: any) {
        console.log("The url creation has an error", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



export default {
    urlHandler,

};
