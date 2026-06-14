import React from "react";

function Difference() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #FEE2E2 0%, #ff5252 100%)",
        padding: "60px 20px",
        
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8 text-center">
            <span
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "white",
                padding: "6px 20px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Take Action
            </span>

            <h1
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: "2.8rem",
                margin: "20px 0 16px",
                lineHeight: "1.2",
              }}
            >
              Ready to Save a Life?
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.1rem",
                maxWidth: "500px",
                margin: "0 auto 40px",
              }}
            >
              Join our growing community of donors and recipients. Your donation
              can save up to <strong style={{ color: "white" }}>3 lives</strong>
              .
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="/donarregister"
                style={{
                  background: "white",
                  color: "#c62828",
                  padding: "14px 36px",
                  borderRadius: "30px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                🩸 Register as Donor
              </a>

              <a
                href="/explore"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "14px 36px",
                  borderRadius: "30px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "1rem",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                🔍 Find Donors
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Difference;
