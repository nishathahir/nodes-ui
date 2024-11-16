import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import React from "react";
import { ReactFlowProvider } from "reactflow";
import { SubmitButton } from "./submit";

// Import ReactFlowProvider

function App() {
  return (
    <ReactFlowProvider>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </ReactFlowProvider>
  );
}

export default App;
