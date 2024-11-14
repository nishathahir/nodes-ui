import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
import { Position } from "reactflow";
import { useState } from "react";

export const DateNode = ({ id, data }) => {
  const [selectedDate, setSelectedDate] = useState(data?.date || "");

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const outputs = [{ id: "date", position: Position.Right }];

  return (
    <BaseNode id={id} title="Date" outputs={outputs}>
      <div>
        <label>
          Select Date:
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </label>
      </div>
    </BaseNode>
  );
};
