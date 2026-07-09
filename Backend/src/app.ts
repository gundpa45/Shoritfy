import express from "express"
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.route.js";




const app =express();

app.use(express.json())


app.use("/api/v1", authRoutes)
app.use("/api/v1", urlRoutes)
app.get("/",(req,res)=>{
    // console.log("Hello, World!")
    res.status(200).json({
        msg:"hello world this is the start of the project"
    })
})

export default app