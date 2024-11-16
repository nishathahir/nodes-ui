import { Handle, Position } from "reactflow";
import { useEffect, useRef, useState } from "react";

import { BaseNode } from "./baseNode";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import styles from "../styles/node.module.css";

export const NotesNode = ({ id, data }) => {
  const [noteText, setNoteText] = useState(data?.noteText || "");
  const textareaRef = useRef(null); // Create a ref to the textarea

  // Update the note text
  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  // Function to adjust the height of the textarea dynamically
  useEffect(() => {
    if (textareaRef.current) {
      // Reset the height to 'auto' so it can resize properly
      textareaRef.current.style.height = "auto";
      // Set the height to scrollHeight (height of the content)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [noteText]); // This will trigger on every change of noteText

  // Custom styles for the node
  const customStyles = {
    backgroundColor: "#f0f0ff", // You can change the background color here
    padding: "5px",
    borderRadius: "4px",
    fontSize: "14px",
  };

  return (
    <BaseNode
      id={id}
      title="Notes"
      inputs={[]}
      outputs={[{ id: "output", position: Position.Right }]}
      icon={InsertCommentOutlinedIcon}
      customStyles={customStyles}
    >
      <div
        style={{
          padding: "5px",
          height: "calc(100% - 30px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <textarea
          ref={textareaRef} // Assign the ref to the textarea
          className={styles["notes"]}
          value={noteText}
          onChange={handleNoteChange}
          style={{
            ...customStyles,
          }}
        />
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </BaseNode>
  );
};
