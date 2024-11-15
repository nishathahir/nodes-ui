import { useEffect, useRef, useState } from "react";

import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import styles from "../styles/node.module.css";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  // Reference for the textarea
  const textareaRef = useRef(null);

  // Handle text change in the textarea
  const handleTextChange = (e) => setCurrText(e.target.value);

  // Adjust height dynamically to fit content
  useEffect(() => {
    if (textareaRef.current) {
      // Set textarea height to scrollHeight for dynamic resizing
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height based on content
    }
  }, [currText]);

  const outputs = [{ id: "output", position: Position.Right }];

  return (
    <BaseNode
      id={id}
      title="Text"
      outputs={outputs}
      icon={TextSnippetOutlinedIcon}
    >
      <div className="mt-2 ml-3">
        <div className="row">
          <label>Text:</label>
        </div>
        <div className="row">
          <textarea
            className={styles["notes"]}
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: "90%", // Take full width of the node
              minHeight: "40px", // Set a minimum height
              resize: "none", // Disable manual resizing (optional)
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
};
