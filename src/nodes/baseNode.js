import { Handle, Position } from "reactflow";

import PropTypes from "prop-types";
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
  const handleOnClick = () => {
    setClickedNodeId(id);
    setIsClicked((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.nodeBox} ${
        clickedNodeId == id ? styles["nodeBox-clicked"] : ""
      }`}
      style={customStyles}
      onClick={handleOnClick}
    >
      <div className={styles.titleContainer}>
        {Icon && <Icon className={styles.icon} />}{" "}
        <span className={styles.title}>{title}</span>
      </div>
      <div>{children}</div>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.id}`}
          style={input.style || {}}
          className={styles["handle-input"]}
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-${output.id}`}
          style={output.style || {}}
          className={styles["handle-output"]}
        />
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
