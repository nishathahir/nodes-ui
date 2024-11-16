import {
  MarkerType,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import { create } from "zustand";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // Initialize nodeIDs to prevent undefined errors

  // Function to generate a unique node ID based on the node type
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs }; // Make a copy of nodeIDs
    if (newIDs[type] === undefined) {
      newIDs[type] = 0; // Initialize count if it doesn't exist
    }
    newIDs[type] += 1; // Increment the ID for the given type
    set({ nodeIDs: newIDs }); // Update the store with the new nodeIDs
    return `${type}-${newIDs[type]}`; // Return the new unique ID
  },

  // Add new node to the state
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  // Handle node changes
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  // Handle edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  // Handle connection between nodes
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },

  // Update a specific field in the node data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));
