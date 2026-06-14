import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="Hero-section mb-5">
      <div className="container mb-5">
        <div className="row mb-5 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-12 mt-5 mb-5">
            <div className="saving-badge d-inline-flex align-items-center gap-2 mb-4">
              <span className="live-dot"></span>
              Saving Lives Together
            </div>

            <div className="box">
              <h1 className="connect">Connect Donors & Recipients,</h1>
              <h1 className="save">Save Lives</h1>
            </div>

            <div className="col-10 mt-2 mb-1">
              <p className="text-muted fs-6 mt-2 mb-2 para">
                A seamless platform connecting blood donors with those in need.
                Share your availability, find matching donors nearby, and make a
                life-saving difference in your community.
              </p>
            </div>

            {/* Buttons side by side */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                  marginTop: "8px",
                }}
              >
                <a
                  href="/donarregister"
                  className="becomeDonar"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#F63049",
                    borderRadius: "30px",
                    color: "white",
                    padding: "15px 24px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                  }}
                >
                  <i className="fa-regular fa-heart"></i>&nbsp; Become a Donor
                </a>

                <a
                  href="/explore"
                  className="findDonar"
                  style={{
                    textDecoration: "none",
                    borderRadius: "30px",
                    padding: "15px 24px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass"></i> Find Donor
                </a>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <div
                  className="stat-box text-center p-3"
                  style={{
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h2>1K+</h2>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>
                    Active Donors
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="stat-box text-center p-3"
                  style={{
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h2>500+</h2>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>
                    Donations Done
                  </p>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="stat-box text-center p-3"
                  style={{
                    height: "100px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h2>100+</h2>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>Lives Saved</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12  circle-col d-flex align-items-center justify-content-center hero-img-wrapper">
            <div className="outer d-flex justify-content-center align-items-center ">
              <div className="inner">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4807/4807695.png"
                  alt="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
