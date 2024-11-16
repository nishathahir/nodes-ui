import { Handle, Position } from "reactflow";

import PropTypes from "prop-types";
import { cn } from "../utils";
import styles from "../styles/baseNode.module.css";
import { useState } from "react";

function getFlexDirection(position) {
  const flexDirection =
    position === "top" || position === "bottom" ? "flex-col" : "flex-row";
  switch (position) {
    case "bottom":
    case "right":
      return flexDirection + "-reverse justify-end";
    default:
      return flexDirection;
  }
}

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  customStyles,
  icon: Icon,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedNodeId, setClickedNodeId] = useState("");

  const handleOnClick = () => {
    setClickedNodeId(id);
    setIsClicked((prevState) => !prevState);
  };

  // Calculate node dimensions and spacing
  const nodeMinHeight = 100;
  const inputPadding = 20;
  const calculateNodeHeight = () => {
    const totalInputs = inputs.length;
    const minSpacingBetweenInputs = 40;
    const requiredHeight =
      (totalInputs - 1) * minSpacingBetweenInputs + inputPadding * 2;
    return Math.max(nodeMinHeight, requiredHeight);
  };

  const nodeHeight = calculateNodeHeight();
  const combinedStyles = {
    ...customStyles,
    height: `${nodeHeight}px`,
    position: "relative",
  };

  // Calculate input position with proper spacing
  const getInputPosition = (index) => {
    const totalInputs = inputs.length;
    if (totalInputs === 1) return 50;
    const availableHeight = nodeHeight - inputPadding * 2;
    const spacing = availableHeight / (totalInputs - 1);
    return (index * spacing + inputPadding) * (100 / nodeHeight);
  };

  return (
    <div
      className={`${styles.nodeBox} ${
        clickedNodeId === id ? styles["nodeBox-clicked"] : ""
      }`}
      style={combinedStyles}
      onClick={handleOnClick}
    >
      <div className={styles.titleContainer}>
        {Icon && <Icon className={styles.icon} />}
        <span className={styles.title}>{title}</span>
      </div>
      <div>{children}</div>

      {/* Inputs with labels beside handles */}
      {inputs.map((input, index) => (
        <div
          key={`input-${index}`}
          className={cn(
            "relative flex items-center",
            getFlexDirection(Position.Left)
          )}
          style={{
            position: "absolute",
            left: 0,
            top: `${getInputPosition(index)}%`,
            transform: "translateY(-50%)",
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            onConnect={(event) => {
              console.log(`onConnect triggered for ${id}-${input.id}`);
              console.log(event);
            }}
            className={styles["handle-input"]}
          />
          <label className="px-3 text-foreground">
            {id}-{input.id}
          </label>
        </div>
      ))}

      {/* Outputs with labels beside handles */}
      {outputs.map((output, index) => (
        <div
          key={`output-${index}`}
          className={cn(
            "relative flex items-center",
            getFlexDirection(output.position || Position.Right)
          )}
          style={{
            position: "absolute",
            right: output.position === Position.Right ? 0 : "auto",
            left: output.position === Position.Left ? 0 : "auto",
            top: `${(index + 1) * (100 / (outputs.length + 1))}%`,
            transform: "translateY(-50%)",
          }}
        >
          <Handle
            type="source"
            position={output.position || Position.Right}
            id={`${id}-${output.id}`}
            style={output.style || {}}
            className={styles["handle-output"]}
          />
          <label className="px-3 text-foreground">
            {id}-{output.id}
          </label>
        </div>
      ))}
    </div>
  );
};

BaseNode.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  outputs: PropTypes.array,
  children: PropTypes.node,
  customStyles: PropTypes.object,
};
