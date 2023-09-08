import express from "express"
import {registerUser, loginUser, activateAccount, getShortUrl, getAllUrls, redirectShortUrl} from "../Controller/Controller.js"

const router = express.Router()
router.post("/registerUser",registerUser)
router.post("/loginUser",loginUser)
router.get("/activateAccount",activateAccount)
router.post("/shortUrl/:id",getShortUrl)
router.get("/getAllUrls/:id",getAllUrls)
router.get("/:id",redirectShortUrl)

export default router