import multer from "multer";
const upload = multer({ dest: "public/" });
import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authentication.js";
import { UploadResource } from "../controllers/enhancedRecipesController.js";

router.post('/', authenticate, upload.single("image"), UploadResource)


export default router;