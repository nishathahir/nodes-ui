import { Handle, Position } from "reactflow";

import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
import { useState } from "react";

export const NotesNode = ({ id, data }) => {
  const [noteText, setNoteText] = useState(data?.noteText);

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Notes"
      inputs={[]}
      outputs={[{ id: "output", position: Position.Right }]}
    >
      <div
        style={{
          padding: "5px",
          height: "calc(100% - 30px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <textarea
          style={{
            width: "100%",
            height: "100%",
            padding: "5px",
            boxSizing: "border-box", // Prevents the textarea from overflowing
            resize: "none", // Disables resizing of the textarea
            border: "none",
            borderRadius: "4px",
          }}
          value={noteText}
          onChange={handleNoteChange}
          placeholder="Type your note here..."
        />
      </div>
      {/* Optional Handle for output if you want to connect it to other nodes */}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </BaseNode>
  );
};
