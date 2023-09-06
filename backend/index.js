import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./Routes/Routes.js"
dotenv.config()

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use("/api",router)

mongoose.connect(DB_URL)
.then(app.listen(PORT,() => console.log(`Server is running on PORT: ${PORT}`)))
.then(() => console.log("DB connected"))
.catch((error) => console.log("Error occured",error))