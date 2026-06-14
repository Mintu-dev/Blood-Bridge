import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function BloodType() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: false,
    });
    AOS.refresh();
  }, []);

  const bloodTypes = [
    { type: "A+", color: "#D32F2F", donatesTo: "A+, AB+" },
    { type: "A-", color: "#D32F2F", donatesTo: "A+, A-, AB+, AB-" },
    { type: "B+", color: "#F63049", donatesTo: "B+, AB+" },
    { type: "B-", color: "#F63049", donatesTo: "B+, B-, AB+, AB-" },
    { type: "AB+", color: "#F63049", donatesTo: "AB+ only" },
    { type: "AB-", color: "#F63049", donatesTo: "AB+, AB-" },
    { type: "O+", color: "#C40C0C", donatesTo: "A+, B+, O+, AB+" },
    { type: "O-", color: "#C40C0C", donatesTo: "All Blood Types ❤️" },
  ];

  return (
    <div className="container py-5 " style={{ marginBottom:"10px"}}>
      <div className="row justify-content-center text-center">
        <div className="col-auto  text-center">
          <span
            className="fw-bold fs-5 rounded-pill px-4 py-2"
            style={{
              background:
                "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
              color: "#FF5656",
            }}
          >
            Blood Types
          </span>

          <h1 className="mt-4 fw-bold">𝑬𝒗𝒆𝒓𝒚 𝑫𝒓𝒐𝒑 𝑪𝒐𝒖𝒏𝒕𝒔</h1>

          <p className="mt-3 text-muted" style={{ fontSize: "1.1rem" }}>
            Every blood type is unique — and someone out there needs yours right
            now.
            <br />
            One donation can save up to <strong>3 lives</strong>.
          </p>
        </div>
      </div>

      <div className="row justify-content-center mt-4" style={{ gap: "16px" }}>
        {bloodTypes.map((blood, index) => (
          <div
            key={index}
            data-aos={index % 2 === 0 ? "flip-up" : "flip-down"}
            style={{ width: "130px", padding: "0" }}
          >
            <div
              style={{
                width: "130px",
                height: "160px",
                backgroundColor: blood.color,
                color: "#fff",
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "12px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h5
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  margin: "0 0 8px 0",
                }}
              >
                {blood.type}
              </h5>
              <p
                style={{
                  fontSize: "0.6rem",
                  margin: "0 0 4px 0",
                  opacity: 0.9,
                }}
              >
                Donates to:
              </p>
              <p style={{ fontSize: "0.6rem", margin: "0", opacity: 0.85 }}>
                {blood.donatesTo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default BloodType;
