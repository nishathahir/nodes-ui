import { Handle, Position } from "reactflow";

import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
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
    <BaseNode id={id} title="Decision Node" outputs={outputs}>
      <div>
        <label>
          Decision:
          <select value={decision} onChange={handleDecisionChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>
      <div>
        <p>Current decision: {decision}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-yes`}
        style={{ display: decision === "Yes" ? "block" : "none" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-no`}
        style={{ display: decision === "No" ? "block" : "none" }}
      />
    </BaseNode>
  );
};
