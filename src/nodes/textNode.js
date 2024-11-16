import { useEffect, useRef, useState } from "react";

import { BaseNode } from "./baseNode";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { Position } from "reactflow";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { Tooltip } from "@mui/material";
import styles from "../styles/node.module.css";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const [isCodeActive, setIsCodeActive] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [isValidVariable, setIsValidVariable] = useState(true);

  const textareaRef = useRef(null);

  const isValidVariableName = (name) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(name);
  };

  const handleTextChange = (e) => {
    let text = e.target.value;
    let valid = true;

    // First check for nested variables
    const nestedCheck = /{{[^}]*{{/;
    if (nestedCheck.test(text)) {
      valid = false;
    }

    // Then process valid variables
    const regex = /{{([^}]+)}}/g;
    const existingVariables = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      let variableName = match[1].trim();
      existingVariables.push(variableName);

      if (!isValidVariableName(variableName)) {
        valid = false;
      }
    }

    const newInputs = existingVariables
      .map((variableName, index) => {
        if (!isValidVariableName(variableName)) {
          return null;
        }

        // Calculate uniform spacing
        const totalInputs = existingVariables.length;
        const spacing = 100 / (totalInputs + 1); // Equal divisions of space
        const topPosition = spacing * (index + 1); // Linear progression

        return {
          id: variableName,
          position: Position.Left,
          style: {
            top: `${topPosition}%`,
          },
        };
      })
      .filter(Boolean);

    setCurrText(text);
    setInputs(newInputs);
    setIsValidVariable(valid);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleIconClick = () => {
    setIsCodeActive((prevState) => !prevState);
  };

  const insertVariable = () => {
    const cursorPos = textareaRef.current.selectionStart;
    const defaultVarName = "variable";
    const newText =
      currText.slice(0, cursorPos) +
      `{{${defaultVarName}}}` +
      currText.slice(cursorPos);

    setCurrText(newText);

    // Update inputs with the newly added variable
    const newInput = {
      id: defaultVarName, // The variable name is the ID
      position: Position.Left,
      style: { top: `${(inputs.length * 100) / (inputs.length + 1)}%` },
    };

    setInputs((prevInputs) => [...prevInputs, newInput]);

    // Use setTimeout to adjust the cursor position after state update
    setTimeout(() => {
      // Move the cursor after the inserted variable
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
        cursorPos + `{{${defaultVarName}}}`.length;
    }, 0);
  };

  const outputs = [{ id: "output", position: Position.Right }];

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputs}
      outputs={outputs}
      icon={TextSnippetOutlinedIcon}
    >
      <div className="mt-2 ml-3">
        <div
          className="row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="col-8">
            <label>Text</label>
          </div>
          <div className="col-4">
            {isCodeActive ? (
              <CodeOffIcon
                className={styles["code-icon"]}
                onClick={handleIconClick}
              />
            ) : (
              <DataObjectIcon
                className={styles["code-icon"]}
                onClick={() => {
                  insertVariable();
                  handleIconClick();
                }}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Tooltip
              title="Invalid syntax: Variable names must only include numbers, letters, and underscores and cannot start with numbers."
              open={!isValidVariable}
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: "#000000c",
                    color: "#fa8072",
                    width: "150px",
                    padding: "6px",
                  },
                },
              }}
            />

            <textarea
              className={styles["text"]}
              ref={textareaRef}
              value={currText}
              onChange={handleTextChange}
              style={{
                width: "90%",
                minHeight: "40px",
                resize: "none",
                borderColor: isValidVariable ? "" : "red",
              }}
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
