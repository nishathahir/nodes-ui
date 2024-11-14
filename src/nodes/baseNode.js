import { Handle, Position } from "reactflow";

import PropTypes from "prop-types";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
  customStyles = {},
}) => {
  return (
    <div
      style={{
        width: 200,
        height: 80,
        border: "1px solid black",
        padding: "5px",
        ...customStyles,
      }}
    >
      <div>
        <span>{title}</span>
      </div>
      <div>{children}</div>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.id}`}
          style={input.style || {}}
        />
      ))}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-${output.id}`}
          style={output.style || {}}
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
