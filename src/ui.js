// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import "reactflow/dist/style.css";

import { ChartNode, NotesNode } from "./nodes/notesNode";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import { useCallback, useMemo, useRef, useState } from "react";

import { ButtonEdge } from "./ButtonEdge";
import { DateNode } from "./nodes/dateNode";
import { DecisionNode } from "./nodes/decisionNode";
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { ToggleNode } from "./nodes/toggleNode";
import { UploadFileNode } from "./nodes/uploadFile";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const nodeTypes = useMemo(
    () => ({
      customInput: InputNode,
      llm: LLMNode,
      customOutput: OutputNode,
      text: TextNode,
      toggleNode: ToggleNode,
      dateNode: DateNode,
      uploadFile: UploadFileNode,
      notesNode: NotesNode,
      decisionNode: DecisionNode,
    }),
    []
  );

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect: storeOnConnect, // Renamed to avoid conflict
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };
  const onConnect = useCallback(
    (params) => {
      storeOnConnect({
        ...params,
      });
    },
    [storeOnConnect] // Make sure the storeOnConnect function is up-to-date
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const connectionLineStyle = {
    stroke: "#7272f3",
    strokeWidth: 1,
    strokeDasharray: "3,3",
  };

  const edgeStyles = (edge) => {
    return {
      arrowHeadType: "none", // Add this line
      ...edge,
      style: {
        ...edge.style,
        markerEnd: "url(#marker-pink)", // Add this line
        stroke: "#d0d0fb",
        strokeWidth: 1.5,
        strokeDasharray: "3, 3",
        transition: "all 0.3s ease",
      },
    };
  };

  return (
    <>
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} style={{ width: "100wv", height: "70vh" }}>
          <svg style={{ position: "absolute", top: 0, left: 0 }}>
            <defs>
              <marker
                className="react-flow__arrowhead"
                id="marker-pink"
                markerWidth="0" // Adjust the size as needed
                markerHeight="0"
              >
                <polyline
                  style={{
                    stroke: "hotpink",
                    fill: "hotpink",
                    strokeWidth: 1,
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="-5,-4 0,0 -5,4 -5,-4"
                />
              </marker>
            </defs>
          </svg>

          <ReactFlow
            nodes={nodes}
            edges={edges.map(edgeStyles)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            snapGrid={[gridSize, gridSize]}
            connectionLineType="smoothstep"
            connectionLineStyle={connectionLineStyle}
          >
            <Background color="#aaa" gap={gridSize} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};
