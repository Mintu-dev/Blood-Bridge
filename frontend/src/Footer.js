import React from "react";

function Footer() {
  return (
    <div
      className="Her0"
      style={{ backgroundColor: "#15173D", color: "white" }}
    >
      <div className="container py-5">
        <div className="row text-center text-md-start">

          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 col-12 mb-4">
            <h4 className="fw-bold">
              <i className="bi bi-droplet-fill blood-icon me-2"></i>
              𝓛𝓲𝓯𝓮𝙲𝚘𝚗𝚗𝚎𝚌𝚝
            </h4>

            <p className="mt-4 text-light">
              Connecting blood donors with recipients to save lives across
              communities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 col-12 mb-4">
            <h5 className="fw-bold mb-4">Quick Links</h5>

            <div className="d-flex flex-column gap-2">
              <a href="/explore" className="footer-link">
                Find Donors
              </a>

              <a href="/donarregister" className="footer-link">
                Become a Donor
              </a>

              <a href="/" className="footer-link">
                Emergency
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4 col-md-12 col-12 mb-4">
            <h5 className="fw-bold mb-4">Contact</h5>

            <p className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i>

              <a
                href="mailto:lifeconnect817@gmail.com"
                className="footer-link"
              >
                lifeconnect817@gmail.com
              </a>
            </p>

            <p>📞 7766867474 , 7295057281</p>

            <p className="text-light small mt-3">
              We're here to help. Reach out anytime for support or
              collaboration.
            </p>

            {/* OWNER SECTION */}
            <div
              style={{
                marginTop: "25px",
                padding: "18px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
              }}
            >
              <p
                style={{
                  color: "#F63049",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                  fontSize: "14px",
                  textTransform: "uppercase"
                }}
              >
                Founder:
              </p>

              <h5
                style={{
                  margin: 0,
                  fontWeight: "700",
                  color: "#fff"
                }}
              >
                Shreyansh Shardul
              </h5>

              <p
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  color: "#d6d6d6",
                  lineHeight: "1.7"
                }}
              >
                Creator of LifeConnect — A modern blood donation platform
                designed to connect donors and recipients through real-time
                communication and smart technology.
              </p>

              {/* SOCIAL LINKS */}
              <div className="d-flex gap-3 mt-3">
                <a
                  href="https://github.com/shreyanshshardul"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <i className="bi bi-github"></i>
                </a>

                <a
                  href="https://www.linkedin.com/in/shreyansh-shardul-a591a7258/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <i className="bi bi-linkedin"></i>
                </a>

                <a
                  href="mailto:shreyanshshardul7@gmail.com"
                  className="social-icon"
                >
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <div className="text-center small">
          © {new Date().getFullYear()} LifeConnect. All rights reserved.
          <br />
          <span style={{ color: "#F63049" }}>
            Designed & Developed by Shreyansh Shardul
          </span>
        </div>
      </div>

      {/* Internal Style */}
      <style>
        {`
          .footer-link {
            text-decoration: none;
            color: #ffffff;
            transition: all 0.3s ease;
          }

          .footer-link:hover {
            color: #F63049;
            padding-left: 5px;
          }

          .blood-icon {
            color: red;
            font-size: 22px;
            animation: pulseBlood 1.5s infinite;
            text-shadow: 0 0 8px red;
          }

          .social-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            font-size: 18px;
            transition: all 0.3s ease;
          }

          .social-icon:hover {
            background: #F63049;
            transform: translateY(-3px);
            color: white;
          }

          @keyframes pulseBlood {
            0% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.3);
              opacity: 0.7;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Footer;