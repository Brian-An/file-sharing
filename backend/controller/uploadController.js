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
    return res.status(200).json({
      path: `${process.env.BACKEND_URL}/files/${file._id}`,
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
