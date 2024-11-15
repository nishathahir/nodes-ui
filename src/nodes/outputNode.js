import { BaseNode } from "./baseNode";
import OutputIcon from "@mui/icons-material/Output";
import { Position } from "reactflow";
import styles from "../styles/node.module.css";
import { useState } from "react";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const inputs = [{ id: "value", position: Position.Left }];

  return (
    <BaseNode id={id} title="Output" inputs={inputs} icon={OutputIcon}>
      <div className="mt-2 ml-3">
        <div className="row">
          <label>Name</label>
        </div>
        <div className="row mt-0 pt-0 mb-2">
          <input type="text" value={currName} onChange={handleNameChange} />
        </div>
        <div className="row">
          <label>Type</label>
        </div>
        <div className="row">
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
