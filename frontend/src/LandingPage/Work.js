import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Work() {

   useEffect(() => {
      AOS.init({
        duration: 1000,  
        once: false        
      });
  
      AOS.refresh();
      
    }, []);


  return (
    <div
      className="work-section mt-5 mb-5"
      style={{
        background:
          "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
        width: "100%",
      }}
    >
      <div className="container py-5">
        
        {/* Heading Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <span
              className="fw-bold fs-5 rounded-pill px-4 py-2"
              style={{
                background:
                  "linear-gradient(135deg, #fde2e2 0%, #ffe4e9 50%, #f9d2e6 100%)",
                color: "#FF5656",
              }}
            >
              How It Works
            </span>

            <h1 className="mt-4 fw-bold">𝑺𝒊𝒎𝒑𝒍𝒆 𝑺𝒕𝒆𝒑𝒔 𝒕𝒐 𝑺𝒂𝒗𝒆 𝑳𝒊𝒗𝒆𝒔</h1>
            <p className="mt-3 text-muted">
              Getting started takes just minutes. Here's how you can make a
              difference.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div data-aos="flip-left" className="row justify-content-center">

          {/* Card 1 */}
          <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
            <div
              className="card mb-4 shadow-sm"
              style={{ width: "18rem", borderRadius: "20px", border: "none" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="p-3 d-inline-block mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #fde2e2 0%, #ffe4e9 50%, #f9d2e6 100%)",
                    borderRadius: "20px",
                  }}
                >
                  <i className="fa-regular fa-user" style={{ color: "red" }}></i>
                </div>

                <h5 className="fw-bold">Create Your Profile</h5>
                <p className="text-muted">
                  Sign up with your blood type, location, and contact details.
                  Verify your account to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
            <div
              className="card mb-4 shadow-sm"
              style={{ width: "18rem", borderRadius: "20px", border: "none" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="p-3 d-inline-block mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #fde2e2 0%, #ffe4e9 50%, #f9d2e6 100%)",
                    borderRadius: "20px",
                  }}
                >
                  <i className="fa-solid fa-magnifying-glass" style={{ color: "red" }}></i>
                </div>

                <h5 className="fw-bold">Find Donors</h5>
                <p className="text-muted">
                  Search nearby verified donors instantly and connect with them
                  in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
            <div
              className="card mb-4 shadow-sm"
              style={{ width: "18rem", borderRadius: "20px", border: "none" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="p-3 d-inline-block mb-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #fde2e2 0%, #ffe4e9 50%, #f9d2e6 100%)",
                    borderRadius: "20px",
                  }}
                >
                  <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                </div>

                <h5 className="fw-bold">Save Lives</h5>
                <p className="text-muted">
                  Make a real impact by helping someone in urgent need of blood.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Work;
