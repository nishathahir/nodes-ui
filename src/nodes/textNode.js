import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { useState } from "react";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => setCurrText(e.target.value);

  const outputs = [{ id: "output", position: Position.Right }];

  return (
    <BaseNode id={id} title="Text" outputs={outputs}>
      <div>
        <label>
          Text:
          <input type="text" value={currText} onChange={handleTextChange} />
        </label>
      </div>
    </BaseNode>
  );
};
