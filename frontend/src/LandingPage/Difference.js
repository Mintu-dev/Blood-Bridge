import React from "react";

function Difference() {
  return (
    <div
      className="hero-section mt-5 mb-5"
      style={{
        background:
          "linear-gradient(135deg, #fef2f2 0%, #fff1f2 50%, #fce7f3 100%)",
        color: "#FF5656",
      }}
    >
      <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="container mt-5">
        <div className="row mt-5">
          <div className="col mt-5 d-flex justify-content-center align-items-center mb-5">
            <div
              className="text-center p-5"
              style={{ backgroundColor: "#F63049", borderRadius: "25px" }}
            >
              <h1 className="text-white fs-1">
                𝑹𝒆𝒂𝒅𝒚 𝒕𝒐 𝑴𝒂𝒌𝒆 𝒂 𝑫𝒊𝒇𝒇𝒆𝒓𝒆𝒏𝒄𝒆?
              </h1>

              <p className="text-white fs-5 mb-5">
                Join thousands of donors and recipients on LifeConnect. Your
                donation could save up to 3 lives.
              </p>

              {/* Responsive Buttons */}
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
                
                <a
                  href="/donarregister"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "white",
                    color: "red",
                    borderRadius: "30px",
                  }}
                  className="p-3 fw-bold fs-4 text-center"
                >
                  Register as Donar
                </a>

                <a
                  href="/"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "#C3110C",
                    color: "#fff",
                    borderRadius: "30px",
                  }}
                  className="p-3 fw-bold fs-4 text-center"
                >
                  Request Blood
                </a>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Difference;
