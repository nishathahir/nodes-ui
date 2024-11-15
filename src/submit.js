// submit.js

export const SubmitButton = () => {
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
        style={{
          background: "#6366f1",
          border: 0,
          height: "28px",
          borderRadius: "6px",
          color: "white",
          fontSize: "12px",
          width: "100px",
          fontWeight: "550",
        }}
      >
        Submit
      </button>
    </div>
  );
};
