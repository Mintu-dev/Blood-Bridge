import React from "react";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #fff5f5, #ffe0e0)"
      }}
    >
      <div className="text-center">
        {/* Simple CSS Loader */}
        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#d32f2f",
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(45deg)",
            margin: "0 auto",
            animation: "pulse 1.5s ease-in-out infinite",
            boxShadow: "0 0 20px rgba(211, 47, 47, 0.5)"
          }}
        ></div>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { transform: rotate(45deg) scale(1); opacity: 1; }
              50% { transform: rotate(45deg) scale(1.1); opacity: 0.8; }
            }
          `}
        </style>
        <p className="mt-4 text-danger fw-bold fs-5">Loading Blood Bridge...</p>
      </div>
    </div>
  );
}

export default Loader;