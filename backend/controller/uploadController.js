import fileModel from "../model/fileModel.js";
import dotenv from "dotenv";

dotenv.config();

export const UploadController = async (req, res) => {
  try {
    const fileObject = {
      path: req.file.path,
      name: req.file.originalname,
    };
    const file = await fileModel.create(fileObject);
    console.log(file);

    // Ensure BACKEND_URL is properly formatted
    const backendUrl = process.env.BACKEND_URL || "";
    // Remove trailing slash if present to avoid double slashes
    const cleanBackendUrl = backendUrl.endsWith("/")
      ? backendUrl.slice(0, -1)
      : backendUrl;

    return res.status(200).json({
      path: `${cleanBackendUrl}/files/${file._id}`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DownloadController = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.fileId);

    if (!file) {
      return res.status(404).json({ message: "file not found" });
    }

    res.download(file.path, file.name);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
