import React from "react";

function Footer() {
  return (
    <div
      className="Her0"
      style={{ backgroundColor: "#334155", color: "white" ,marginTop:"0px"}}
    >
      <div className="container py-5">
        <div className="row text-center text-md-start">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 col-12 mb-4">
            <h4 className="fw-bold">
              <i className="bi bi-droplet-fill blood-icon me-2"></i>
              BloodBridge
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

          <div className="col-lg-4 col-md-6 col-12 mb-4 text-center">
            <h5 className="fw-bold mb-4">Contact</h5>

            <p className="mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="mailto:mintu192267@gmail.com" className="footer-link">
                mintu192267@gmail.com
              </a>
            </p>

            <div className="d-flex justify-content-center align-items-center gap-3 mt-3 w-100">
              <a
                href="https://github.com/Mintu-dev"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mintukumar1"
                target="_blank"
                rel="noreferrer"
                className="social-icon"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:mintu192267@gmail.com" className="social-icon">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <div className="text-center small">
          © {new Date().getFullYear()} BloodBridge. All rights reserved.
          <br />
          <span style={{ color: "yellow" }}>
             Developed by Mintu Kumar
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
