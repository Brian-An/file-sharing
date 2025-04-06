import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UploadFile } from "./service/api";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);

  const uploadRef = useRef();
  const handleUpload = () => {
    uploadRef.current.click();
  };

  useEffect(() => {
    const apiCall = () => {
      if (file) {
        // call the api to upload
        const fileData = new FormData();
        fileData.append("name", file.name);
        fileData.append("file", file);

        // call the function form api.js with fileData
        const response = UploadFile(fileData);
        console.log("response from api", response);
        setRes(response.path);
      }
    };
    apiCall();
  }, [file]);

  return (
    <div className="container">
      <h1>File Sharing App</h1>
      <div>
        <button
          onClick={() => {
            handleUpload();
          }}
        >
          Upload
        </button>
        <input
          type="file"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={(event) => setFile(event.target.files[0])}
        />
        <div>
          <a href={res}>{res}</a>
        </div>
      </div>
    </div>
  );
}

export default App;
