import express from "express"
import {registerUser, loginUser, activateAccount, getShortUrl} from "../Controller/Controller.js"

const router = express.Router()
router.post("/registerUser",registerUser)
router.post("/loginUser",loginUser)
router.get("/activateAccount",activateAccount)
router.post("/shortUrl",getShortUrl)

export default router