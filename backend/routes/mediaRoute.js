import express from "express";
import { uploadMedia } from "../controllers/mediaController.js";
import { upload } from "../utilities/cloudnary-utilities.js";

const mediaRouter = express.Router();
mediaRouter.post("/upload", upload.single("myfile"), uploadMedia);
export default mediaRouter;
