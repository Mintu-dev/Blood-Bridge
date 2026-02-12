import React from "react";
import "./Features.css";

function Features() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center mt-5">
        <div className="col-auto mt-5 text-center">
          <span
            className="text-center fw-bold fs-5 rounded-pill px-4 py-2"
            style={{
              background:
                "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
              color: "#FF5656",
            }}
          >
            Features
          </span>
          <h1 className="mt-4 fw-bold">Why Choose LifeConnect?</h1>
          <p className="mt-3">
            Powerful features designed to make blood donation simple,
            accessible, and impactful.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="row mt-5 g-4 align-items-stretch">

        {/* Card 1 */}
        <div className="col-md-6 col-12">
          <div
            className="card h-100"
            style={{
              width: "100%",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
            }}
          >
            <div className="card-body">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "red",
                  width: "60px",
                  height: "60px",
                  borderRadius: "15px",
                }}
              >
                <h5 className="mt-2" style={{ color: "white" }}>
                  <i className="fa-solid fa-location-dot fs-3"></i>
                </h5>
              </div>

              <h6 className="mb-3 fw-bold fs-4 mt-3">
                Location-Based Search
              </h6>
              <p>
                Find donors or recipients in your area instantly with our smart
                geolocation system.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6 col-12">
          <div
            className="card h-100"
            style={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "#fffae6",
            }}
          >
            <div className="card-body">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#ffb84d",
                  width: "60px",
                  height: "60px",
                  borderRadius: "15px",
                }}
              >
                <h5 className="mt-2" style={{ color: "white" }}>
                  <i className="fa-regular fa-clock fs-3"></i>
                </h5>
              </div>

              <h6 className="mb-3 fw-bold fs-4 mt-3">
                Location-Based Search
              </h6>
              <p>
                Find donors or recipients in your area instantly with our smart
                geolocation system.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-6 col-12">
          <div
            className="card h-100"
            style={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "#e6ffee",
            }}
          >
            <div className="card-body">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#47d147",
                  width: "60px",
                  height: "60px",
                  borderRadius: "15px",
                }}
              >
                <h5 className="mt-2" style={{ color: "white" }}>
                  <i className="fa-solid fa-shield-halved fs-3"></i>
                </h5>
              </div>

              <h6 className="mb-3 fw-bold fs-4 mt-3">
                Location-Based Search
              </h6>
              <p>
                Find donors or recipients in your area instantly with our smart
                geolocation system.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-6 col-12">
          <div
            className="card h-100"
            style={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "#f2e6ff",
            }}
          >
            <div className="card-body">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "#a64dff",
                  width: "60px",
                  height: "60px",
                  borderRadius: "15px",
                }}
              >
                <h5 className="mt-2" style={{ color: "white" }}>
                  <i className="fa-regular fa-bell fs-3"></i>
                </h5>
              </div>

              <h6 className="mb-3 fw-bold fs-4 mt-3">
                Location-Based Search
              </h6>
              <p>
                Find donors or recipients in your area instantly with our smart
                geolocation system.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;
