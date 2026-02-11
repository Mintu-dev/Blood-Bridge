import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-5">
        <div className="col mt-3">
          <div className="saving-badge d-inline-flex align-items-center gap-2 mb-4">
            <span className="live-dot"></span>
            Saving Lives Together
          </div>
            <div className="box">
                <h1 className="connect">𝐂𝐨𝐧𝐧𝐞𝐜𝐭 𝐃𝐨𝐧𝐨𝐫𝐬 & 𝐑𝐞𝐜𝐢𝐩𝐢𝐞𝐧𝐭𝐬,</h1>
          <h1 className="save">𝐒𝐚𝐯𝐞 𝐋𝐢𝐯𝐞𝐬</h1>
            </div>
          
            <div className="col-10 mt-3">
                     <p className="text-muted fs-6 mt-4 para">
            A seamless platform connecting blood donors with those in need.
            Share your availability, find matching donors nearby, and make a
            life-saving difference in your community.
          </p>
            </div>
                <div className="col" ></div>
        </div>

        <div className="col mt-5" style={{marginLeft:"5%"}}>
            <div className="outer d-flex justify-content-center align-items-center mt-5">
                <div className="inner">
                    <img src="https://cdn-icons-png.flaticon.com/512/12223/12223322.png" alt="https://cdn2.iconfinder.com/data/icons/business-460/85/company-512.png"></img>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
