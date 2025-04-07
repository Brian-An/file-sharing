import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UploadFile } from "./service/api";
import { FaCopy, FaCloudUploadAlt, FaFileUpload } from "react-icons/fa";

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const uploadRef = useRef();
  const dropZoneRef = useRef();

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError(null);
    }
  };

  useEffect(() => {
    const handleGlobalDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    document.addEventListener("dragover", handleGlobalDragOver);
    document.addEventListener("drop", handleGlobalDrop);

    return () => {
      document.removeEventListener("dragover", handleGlobalDragOver);
      document.removeEventListener("drop", handleGlobalDrop);
    };
  }, []);

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
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <FaCloudUploadAlt className="logo-icon" />
          <h1>DropLink</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <h2>Share files with ease</h2>
          <h3 className="sub-header">
            Transforming your files to shareable links
          </h3>

          <div className="upload-section">
            <div
              className={`drop-zone ${isDragging ? "dragging" : ""}`}
              ref={dropZoneRef}
              onClick={handleUpload}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="drop-zone-content">
                {isDragging ? (
                  <>
                    <FaFileUpload className="upload-icon" />
                    <p>Drop your file here</p>
                  </>
                ) : (
                  <>
                    <FaCloudUploadAlt className="upload-icon" />
                    <p>Drag & drop a file here or click to browse</p>
                  </>
                )}
              </div>
            </div>

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
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} DropLink. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="https://github.com/Brian-An/file-sharing">
              We're Open Source!
            </a>
            <a href="https://www.linkedin.com/in/brian-an06/">By @brianan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
