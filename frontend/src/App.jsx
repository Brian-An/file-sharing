import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UploadFile } from "./service/api";
import { FaCopy } from "react-icons/fa";

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleCopyLink = () => {
    if (downloadUrl) {
      navigator.clipboard
        .writeText(downloadUrl)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
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
          <div className="link-container">
            <button
              className="copy-button"
              onClick={handleCopyLink}
              title="Copy to clipboard"
            >
              <FaCopy /> {copySuccess ? "Copied!" : "Copy"}
            </button>
            <p className="download-url">
              <a href={downloadUrl}>{downloadUrl}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
