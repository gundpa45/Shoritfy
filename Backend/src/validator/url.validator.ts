import type { NextFunction } from "express";
import {body,validationResult} from "express-validator";
import { url } from "node:inspector";



function validateUrl(req:Request,res:Response,next:NextFunction){
        const error =validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()})
        }
        next();
}



export const urlValidator=[
   body(url).isURL().withMessage("please enter the valid ur")
    
]
