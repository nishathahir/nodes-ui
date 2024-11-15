import React from "react";

export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "50px",
        height: "55px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "white",
        border: "1px solid #cccccc",
        justifyContent: "center",
        flexDirection: "column",
        padding: "5px",
      }}
      draggable
    >
      {Icon && (
        <div style={{ marginBottom: "5px" }}>
          <Icon style={{ fontSize: "24px", color: "#747b8b" }} />{" "}
          {/* Render the passed icon */}
        </div>
      )}
      <span
        style={{
          color: "#818796",
          fontSize: "10px",
          fontWeight: "600",
        }}
      >
        {label}
      </span>
    </div>
  );
};
