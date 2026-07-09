import type { Request,Response } from "express"

async function registerController(req: Request,res:Response){



    const {name }

    res.status(200).json({message:"user register path is ready to test "})

}



async function loginController(req: Request,res:Response){
    res.status(200).json({
        mesaage:"login path is also redy to test "
    })
}


export default {
    registerController,
    loginController
}