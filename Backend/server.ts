import app from "./src/app.js"
import { connectDB } from "./src/config/db.js"

app.listen(3200, async () => {
    console.log("🚀 Server started at port no 3200")
    await connectDB()
})