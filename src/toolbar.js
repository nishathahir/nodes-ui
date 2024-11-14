// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="toggleNode" label="Toggle" />
        <DraggableNode type="dateNode" label="Date" />
        <DraggableNode type="uploadFile" label="Upload File" />
        <DraggableNode type="notesNode" label="Notes" />
        <DraggableNode type="decisionNode" label="Decision Node" />
      </div>
    </div>
  );
};
