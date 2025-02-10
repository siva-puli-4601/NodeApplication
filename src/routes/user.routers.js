import { Router } from "express";
import { register,getPDF,dataStream } from "../controllers/user.controllers.js";
import { upload } from "../../middleware/multer.middlewares.js";
// import {upload} from "../utils/cloudinary.js"
const router = Router();

router.route("/register").post(upload.single("file"), (req, res, next) => {
    console.log("📢 Request received for /register");
    next()
},register)
router.route('/getpdf').get(getPDF)
router.route('/getStreamData').get(dataStream)

export {router as userRouter}