// toolbar.js

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DraggableNode } from "./draggableNode";
import InputIcon from "@mui/icons-material/Input";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import OutputIcon from "@mui/icons-material/Output";
import PsychologyIcon from "@mui/icons-material/Psychology";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <DraggableNode type="customInput" label="Input" icon={InputIcon} />
        <DraggableNode type="llm" label="LLM" icon={PsychologyIcon} />
        <DraggableNode type="customOutput" label="Output" icon={OutputIcon} />
        <DraggableNode
          type="text"
          label="Text"
          icon={TextSnippetOutlinedIcon}
        />
        <DraggableNode
          type="toggleNode"
          label="Toggle"
          icon={ToggleOffOutlinedIcon}
        />
        <DraggableNode type="dateNode" label="Date" icon={CalendarMonthIcon} />
        <DraggableNode
          type="uploadFile"
          label="Upload File"
          icon={UploadFileIcon}
        />
        <DraggableNode
          type="notesNode"
          label="Notes"
          icon={InsertCommentOutlinedIcon}
        />
        <DraggableNode
          type="decisionNode"
          label="Decision"
          icon={QuestionMarkOutlinedIcon}
        />
      </div>
    </div>
  );
};
