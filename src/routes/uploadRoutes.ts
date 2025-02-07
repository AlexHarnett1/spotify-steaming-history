import express from "express";
import { uploadFolder, processUploadedFolder } from "../controllers/uploadController";

const router = express.Router();

router.post("/upload-folder", uploadFolder, processUploadedFolder);

export default router;