import express from "express";
import Connection from "./database/db.js";
import {
  UploadController,
  DownloadController,
} from "./controller/uploadController.js";
import storage from "./middleware/upload.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

// Define API routes directly
app.post("/api/upload", storage.single("file"), UploadController);
app.get("/api/files/:fileId", DownloadController);

const __dirname = path.resolve();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
Connection();
