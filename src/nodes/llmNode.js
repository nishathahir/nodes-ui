import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import PsychologyIcon from "@mui/icons-material/Psychology";
import styles from "../styles/node.module.css";

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: "system", position: Position.Left, style: { top: `${100 / 3}%` } },
    { id: "prompt", position: Position.Left, style: { top: `${200 / 3}%` } },
  ];
  const outputs = [{ id: "response", position: Position.Right }];

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
      icon={PsychologyIcon}
    >
      <div className="mt-2 ml-3">
        <div className="row">
          <span className={styles["node-desc"]}>This is a LLM.</span>
        </div>
      </div>
    </BaseNode>
  );
};
