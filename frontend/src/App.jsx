import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadRef = useRef();

  const handleUpload = () => {
    uploadRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      if (file) {
        try {
          setIsUploading(true);
          setError(null);

          // call the api to upload
          const fileData = new FormData();
          fileData.append("file", file);

          // call the function from api.js with fileData
          const response = await UploadFile(fileData);
          console.log("response from api", response);

          if (response && response.path) {
            setDownloadUrl(response.path);
          } else {
            setError("Failed to get download URL");
          }
        } catch (err) {
          console.error("Upload error:", err);
          setError(err.message || "Failed to upload file");
        } finally {
          setIsUploading(false);
        }
      }
    };

    uploadFile();
  }, [file]);

  return (
    <div className="container">
      <h1>File Sharing App</h1>

      <div className="upload-section">
        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Select File"}
        </button>

        <input
          type="file"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {fileName && !isUploading && (
          <div className="file-info">
            <p>
              Selected file: <strong>{fileName}</strong>
            </p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>

      {downloadUrl && (
        <div className="download-section">
          <h3>Your file is ready!</h3>
          <button className="download-button" onClick={handleDownload}>
            Download File
          </button>
          <p className="download-url">
            Or copy this link: <a href={downloadUrl}>{downloadUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
