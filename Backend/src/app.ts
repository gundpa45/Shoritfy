import express from "express"
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.route.js";




const app = express();

// CORS & JSON middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", urlRoutes);
app.get("/",(req,res)=>{
    // console.log("Hello, World!")
    res.status(200).json({
        msg:"hello world this is the start of the project"
    })
})

export default app