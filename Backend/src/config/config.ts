import dotenv from "dotenv"
dotenv.config()


type Config = {
    DATABSE_URI: string | undefined,

}







const config: Config ={
    DATABSE_URI: process.env.DATABASE_URI

}

export default config
