import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-5 mb-5">
        <div className="col mt-3 mb-5">
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
          <div className="col mt-5"></div>

          <a
            href=""
            className="text-white p-3 mt-5  mb-5 fs-4 becomeDonar"
            style={{
              textDecoration: "none",
              backgroundColor: "#F63049",
              borderRadius: "40px",
            }}
          >
            <i class="fa-regular fa-heart"></i>&nbsp; Become a Donar
          </a>
          <br></br>
          <br></br>
          <br></br>
          <a
            href=""
            className="p-3 mt-5 fs-4 findDonar"
            style={{
              textDecoration: "none",
              borderRadius: "40px",
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
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

        <div className="col mt-5" style={{ marginLeft: "5%" }}>
          <div className="outer d-flex justify-content-center align-items-center mt-5">
            <div className="inner">
              <img
                src="https://cdn-icons-png.flaticon.com/512/12223/12223322.png"
                alt="https://cdn2.iconfinder.com/data/icons/business-460/85/company-512.png"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
