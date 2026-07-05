import express from "express"


const app =express();


app.get("/",(req,res)=>{
    // console.log("Hello, World!")
    res.status(200).json({
        msg:"hello world this is the start of the project"
    })
})

export default app