import { BaseNode } from "./baseNode";
import { Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: "system", position: Position.Left, style: { top: `${100 / 3}%` } },
    { id: "prompt", position: Position.Left, style: { top: `${200 / 3}%` } },
  ];
  const outputs = [{ id: "response", position: Position.Right }];

  return (
    <BaseNode id={id} title="LLM" inputs={inputs} outputs={outputs}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
