import { Handle, Position } from "reactflow";

import { BaseNode } from "./baseNode";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import styles from "../styles/node.module.css";
import { useState } from "react";

export const DecisionNode = ({ id, data }) => {
  const [decision, setDecision] = useState(data?.decision || "Yes");

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
  };

  const outputs = [
    { id: "yesOutput", position: Position.Right, label: "Yes" },
    { id: "noOutput", position: Position.Right, label: "No" },
  ];

  return (
    <BaseNode
      id={id}
      title="Decision Node"
      outputs={outputs}
      icon={QuestionMarkOutlinedIcon}
    >
      <div className="mt-2 ml-2">
        <label>
          Decision:
          <select value={decision} onChange={handleDecisionChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <label>Current decision</label>
        <div>
          <p className={styles["node-desc"]} style={{ marginLeft: "5px" }}>
            {decision}
          </p>
        </div>
      </div>
    </BaseNode>
  );
};
