import { BaseNode } from "./baseNode";
import InputIcon from "@mui/icons-material/Input";
import { Position } from "reactflow";
import Select from "react-select"; // Import react-select
import styles from "../styles/node.module.css";
import { useState } from "react";

export const InputNode = ({ id, data }) => {
  const options = [
    { value: "Text", label: "Text" },
    { value: "File", label: "File" },
  ];
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const outputs = [{ id: "output", position: Position.Right }];

  return (
    <BaseNode id={id} title="Input" outputs={outputs} icon={InputIcon}>
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
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
