import type { NextFunction, Request, Response } from "express";
import {body,validationResult} from "express-validator";




function validateUrl(req:Request,res:Response,next:NextFunction){
        const error =validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()})
        }
        next();
}



export const urlValidator=[
   body("url")
   .trim()
   .notEmpty().withMessage("URL is required")
   .isURL().withMessage("Please enter a valid URL."),
   validateUrl
    
]
