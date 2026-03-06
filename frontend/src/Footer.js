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
              <a href="/explore" className="footer-link">Find Donors</a>
              <a href="/donarregister" className="footer-link">Become a Donor</a>
              <a href="/" className="footer-link">Emergency</a>
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
            
          </div>
        </div>

        {/* Bottom Line */}
        <hr className="border-secondary" />

        <div className="text-center small">
          © {new Date().getFullYear()} LifeConnect. All rights reserved.
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
