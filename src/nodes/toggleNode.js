import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
import { Position } from "reactflow";
import { useState } from "react";

export const ToggleNode = ({ id, data }) => {
  const [isToggled, setIsToggled] = useState(data?.isToggled || false);

  const handleToggle = () => setIsToggled(!isToggled);

  const outputs = [{ id: "toggleState", position: Position.Right }];

  return (
    <BaseNode id={id} title="Toggle" outputs={outputs}>
      <div>
        <label>
          <input type="checkbox" checked={isToggled} onChange={handleToggle} />
          Toggle State
        </label>
        <p>{isToggled ? "On" : "Off"}</p>
      </div>
    </BaseNode>
  );
};
