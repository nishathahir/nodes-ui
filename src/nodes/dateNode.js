import { BaseNode } from "./baseNode"; // Assuming BaseNode is in the same directory
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Position } from "reactflow";
import { useState } from "react";
export const DateNode = ({ id, data }) => {
  const [selectedDate, setSelectedDate] = useState(data?.date || "");

  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const outputs = [{ id: "date", position: Position.Right }];

  return (
    <BaseNode id={id} title="Date" outputs={outputs} icon={CalendarMonthIcon}>
      <div className="mt-2 ml-3">
        <div className="row">
          <label>Select Date:</label>
        </div>
        <div className="row">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
      </div>
    </BaseNode>
  );
};
