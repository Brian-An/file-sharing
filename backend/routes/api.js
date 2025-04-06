import express from "express";
import {
  DownloadController,
  UploadController,
} from "../controller/uploadController.js";
import storage from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", storage.single("file"), UploadController);

router.get("/files/:fileId", DownloadController);

export default router;
