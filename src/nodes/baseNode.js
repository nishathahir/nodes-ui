import { Handle, Position } from "reactflow";

import PropTypes from "prop-types";
import { cn } from "../utils";
import styles from "../styles/baseNode.module.css";
import { useState } from "react";

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

  const handleOnClick = (e) => {
    // Only handle clicks that originated from the node container itself
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(styles.titleContainer)
    ) {
      setClickedNodeId(id);
      setIsClicked((prevState) => !prevState);
    }
  };

  return (
    <div
      className={`${styles.nodeBox} ${
        clickedNodeId === id ? styles["nodeBox-clicked"] : ""
      }`}
      style={{ ...customStyles, position: "relative" }}
      onClick={handleOnClick}
    >
      <div className={styles.titleContainer}>
        {Icon && <Icon className={styles.icon} />}
        <span className={styles.title}>{title}</span>
      </div>

      {/* Main content area with higher z-index */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>

      {/* Inputs */}
      <div className="absolute left-0 top-0 h-full" style={{ zIndex: 1 }}>
        {inputs.map((input, index) => (
          <div
            key={`input-${index}`}
            className="relative flex items-center h-8"
            style={{
              position: "absolute",
              left: 0,
              top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
              transform: "translateY(-50%)",
            }}
          >
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={input.style || {}}
              onConnect={(event) => {
                console.log(`onConnect triggered for ${id}-${input.id}`);
                console.log(event);
              }}
              className={styles["handle-input"]}
            />
            <span
              className="ml-2 text-sm text-foreground"
              style={{
                position: "relative",
                right: "100%",
                marginRight: "10px",
                fontSize: "10px",
                top: "10px",
                color: "#5d7f9e",
              }}
            >
              {input.id}
            </span>
          </div>
        ))}
      </div>

      {/* Outputs */}
      <div className="absolute right-0 top-0 h-full" style={{ zIndex: 1 }}>
        {outputs.map((output, index) => (
          <div
            key={`output-${index}`}
            className="relative flex items-center h-8"
            style={{
              position: "absolute",
              right: 0,
              top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
              transform: "translateY(-50%)",
            }}
          >
            <span
              className="mr-2 text-sm text-foreground "
              style={{
                position: "relative",
                left: "100%",
                marginLeft: "10px",
                fontSize: "10px",
                color: "#5d7f9e",
                top: "10px",
              }}
            >
              {output.id}
            </span>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={output.style || {}}
              className={styles["handle-output"]}
            />
          </div>
        ))}
      </div>
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
  icon: PropTypes.elementType,
};

export default BaseNode;
