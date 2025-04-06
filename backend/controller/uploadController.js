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

    // Use a simple string for the URL to avoid path-to-regexp issues
    const fileId = file._id.toString();

    return res.status(200).json({
      path: `/api/files/${fileId}`,
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

    // Set appropriate headers for file download
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.setHeader("Content-Type", "application/octet-stream");

    // Send the file
    res.sendFile(file.path, { root: "." });
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ message: error.message });
  }
};
