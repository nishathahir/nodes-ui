import { Alert, CircularProgress, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CheckCircleOutline } from "@mui/icons-material";
import { useStore } from "./store";

export const SubmitButton = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [submitted, setSubmitted] = useState(false); // Track submission success
  const [submissionDetails, setSubmissionDetails] = useState(null); // Store result details
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  useEffect(() => {
    setSubmitted(false);
    setOpenSnackbar(false);
    setSubmissionDetails(null);
  }, [nodes, edges]);

  const handleSubmit = async () => {
    // Set loading state to true and reset submitted state
    setLoading(true);
    setSubmitted(false);
    setSubmissionDetails(null); // Reset the details state

    // Prepare the data to send to the backend
    const flowData = { nodes, edges };

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flowData),
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error("Failed to submit pipeline data");
      }

      const result = await response.json();
      const { num_nodes, num_edges, is_dag } = result;

      // Construct the message in a user-friendly format
      setAlertMessage(`Pipeline Submission Successful!`);
      setSubmissionDetails({ num_nodes, num_edges, is_dag }); // Save result details
      setSubmitted(true); // Mark as submitted
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setAlertMessage("Error: There was an issue submitting the pipeline.");
    } finally {
      setLoading(false); // Set loading to false after submission attempt
      setOpenSnackbar(true); // Open the snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close snackbar when user dismisses it
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          background: submitted ? "#10b981" : "#6366f1",
          border: 0,
          height: "28px",
          borderRadius: "6px",
          color: "white",
          fontSize: "12px",
          width: "100px",
          fontWeight: "550",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : submitted ? (
          <>
            <CheckCircleOutline style={{ color: "white", fontSize: 20 }} />
            <span style={{ marginLeft: "8px", color: "white" }}>Success</span>
          </>
        ) : (
          "Submit"
        )}
      </button>

      {/* Snackbar for alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Auto-hide after 6 seconds
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertMessage.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMessage.includes("Error")
            ? "Oops! Something went wrong while submitting the pipeline. Please try again."
            : "Great! Your pipeline has been successfully submitted. Here's a summary:"}

          {submissionDetails && !alertMessage.includes("Error") && (
            <div style={{ marginTop: "8px" }}>
              <strong>Details:</strong>
              <ul>
                <li>Nodes: {submissionDetails.num_nodes}</li>
                <li>Edges: {submissionDetails.num_edges}</li>
                <li>Is DAG: {submissionDetails.is_dag ? "Yes" : "No"}</li>
              </ul>
            </div>
          )}
        </Alert>
      </Snackbar>
    </div>
  );
};
