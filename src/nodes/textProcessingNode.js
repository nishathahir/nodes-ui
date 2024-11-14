import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { useState } from "react";

export const TextProcessingNode = ({ id, data }) => {
  const [inputText, setInputText] = useState(data?.inputText || "");
  const [processedText, setProcessedText] = useState("");

  const handleInputTextChange = (e) => setInputText(e.target.value);
  const handleProcessText = () => setProcessedText(inputText.toUpperCase());

  const outputs = [{ id: "processedText", position: Position.Right }];

  return (
    <BaseNode id={id} title="Text Processing" outputs={outputs}>
      <div>
        <label>
          Input Text:
          <input
            type="text"
            value={inputText}
            onChange={handleInputTextChange}
          />
        </label>
        <button onClick={handleProcessText}>Process Text</button>
        {processedText && <p>Processed Text: {processedText}</p>}
      </div>
    </BaseNode>
  );
};
