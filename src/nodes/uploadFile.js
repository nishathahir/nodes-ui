import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import styles from "../styles/node.module.css";
import { useState } from "react";

export const UploadFileNode = ({ id, data }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Trigger file input dialog programmatically when the button is clicked
  const handleButtonClick = () => {
    document.getElementById(`upload-file-${id}`).click();
  };

  const outputs = [{ id: "fileOutput", position: Position.Right }];

  return (
    <BaseNode
      id={id}
      title="Upload File"
      outputs={outputs}
      icon={UploadFileIcon}
    >
      <div className="mt-2 ml-3">
        <div className="row">
          {/* Custom Button */}
          <button
            type="button"
            onClick={handleButtonClick}
            className={styles["upload-file-btn"]}
          >
            Upload File
          </button>

          {/* Hidden file input */}
          <input
            id={`upload-file-${id}`}
            type="file"
            onChange={handleFileChange}
            accept="image/*, .pdf, .docx, .txt, .csv"
            style={{ display: "none" }} // Hide the input element
          />
        </div>
        <div className="row mt-2">
          {file && (
            <div>
              <p className={styles["node-desc"]}>File Selected</p>
              <label>Name</label>
              <p className={styles["file-info"]}>{file.name}</p>
              <label>Type</label>
              <p className={styles["file-info"]}> {file.type}</p>
              <label>File Size</label>
              <p className={styles["file-info"]}>
                Size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>
      </div>
    </BaseNode>
  );
};
