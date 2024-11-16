import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

import { Button } from "@mui/material";
import { MousePointerClick } from "lucide-react";
import { useEffect } from "react";

export function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  useEffect(() => {
    console.log("hello");
  });

  const onEdgeClick = () => {
    window.alert(`Edge with id: ${id} has been clicked!`);
  };

  return (
    <div>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <Button onClick={onEdgeClick} size="icon" variant="secondary">
            <MousePointerClick size={16} />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </div>
  );
}
