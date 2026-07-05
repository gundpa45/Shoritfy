

async function registerController(req,res){

    res.status(200).json({message:"user register path is ready to test "})

}



async function loginController(req,res){
    res.status(200).json({
        mesaage:"login path is also redy to test "
    })
}


export default {
    registerController,
    loginController
}