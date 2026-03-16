import React from "react";
import "./Hero.css";
import { motion } from "framer-motion";


function Hero() {
  return (
    <div className="Hero-section mb-5">
      <div className="container mb-5">
        <div className="row mb-5">

          <div className="col-lg-6 col-12 mt-5 mb-5">
            <div className="saving-badge d-inline-flex align-items-center gap-2 mb-4">
              <span className="live-dot"></span>
              Saving Lives Together
            </div>

            <div className="box">
              <h1 className="connect">𝐂𝐨𝐧𝐧𝐞𝐜𝐭 𝐃𝐨𝐧𝐨𝐫𝐬 & 𝐑𝐞𝐜𝐢𝐩𝐢𝐞𝐧𝐭𝐬,</h1>
              <h1 className="save">𝐒𝐚𝐯𝐞 𝐋𝐢𝐯𝐞𝐬</h1>
            </div>

            <div className="col-10 mt-3 mb-5">
              <p className="text-muted fs-6 mt-4 mb-5 para">
                A seamless platform connecting blood donors with those in need.
                Share your availability, find matching donors nearby, and make a
                life-saving difference in your community.
              </p>
            </div>

            <a
              href="/donarregister"
              className="text-white p-3 mt-5 mb-5 fs-4 becomeDonar"
              style={{
                textDecoration: "none",
                backgroundColor: "#F63049",
                borderRadius: "40px",
              }}
            >
              <i className="fa-regular fa-heart"></i>&nbsp; Become a Donar
            </a>

            <br /><br /><br />

            <a
              href="/explore"
              className="p-3 mt-5 fs-4 findDonar"
              style={{
                textDecoration: "none",
                borderRadius: "40px",
              }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              Find Donar
            </a>

            <div className="row mt-5">
              <div className="col-md-4 col-12 mt-2">
                <div className="stat-box text-center p-3">
                  <h2>15K+</h2>
                  <p>Active Donors</p>
                </div>
              </div>

              <div className="col-md-4 col-12 mt-2">
                <div className="stat-box text-center p-3">
                  <h2>2K+</h2>
                  <p>Successful Donations</p>
                </div>
              </div>

              <div className="col-md-4 col-12 mt-2">
                <div className="stat-box text-center p-3">
                  <h2>500+</h2>
                  <p>Lives Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Circle Section */}
          <div className="col-lg-6 col-12 mt-5 circle-col">
            <div className="outer d-flex justify-content-center align-items-center mt-5">
              <div className="inner">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/12223/12223322.png"
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
