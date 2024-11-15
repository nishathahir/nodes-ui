import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
import { Switch } from "@mui/material"; // Importing the Switch component
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined"; // Assuming you're using this icon
import styles from "../styles/node.module.css";
import { useState } from "react";

export const ToggleNode = ({ id, outputs }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (event) => {
    setIsToggled(event.target.checked);
  };

  return (
    <BaseNode
      id={id}
      title="Toggle"
      outputs={outputs}
      icon={ToggleOffOutlinedIcon}
    >
      <div className="mt-2 ml-2">
        <div className="row">
          <div
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label>
              State:{" "}
              <span style={{ color: "#5d7f9e", fontSize: "12px" }}>
                {isToggled ? "On" : "Off"}
              </span>
            </label>
            <Switch
              checked={isToggled}
              onChange={handleToggle}
              color="default"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#cecffc" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#cecffc",
                },
                "& .MuiSwitch-thumb": {
                  backgroundColor: isToggled ? "#b9b9f9" : "#e7e7fd",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: isToggled ? "#cecffc" : "#b3b3b3",
                },
              }}
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
};
