import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { useState } from "react";

export const UploadFileNode = ({ id, data }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const outputs = [{ id: "fileOutput", position: Position.Right }];

  return (
    <BaseNode id={id} title="Upload File" outputs={outputs}>
      <div>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*, .pdf, .docx, .txt, .csv"
        />
        {file && (
          <div>
            <p>
              <strong>File Selected:</strong>
            </p>
            <p>Name: {file.name}</p>
            <p>Type: {file.type}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>
    </BaseNode>
  );
};
