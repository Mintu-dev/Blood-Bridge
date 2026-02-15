import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white py-3">
        <div className="container">

          {/* Logo */}
          <a
            className="navbar-brand fw-bold fs-2 lifeconnect d-flex align-items-center gap-2"
            href="#"
          >
           <i className="bi bi-droplet-fill blood-icon"></i>
            <span className="life-text">𝓛𝓲𝓯𝓮</span>
            <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
          </a>

          {/* Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav gap-3 align-items-center">

              <a className="nav-link nav-hover" href="#">Features</a>
              <a className="nav-link nav-hover" href="#">How It Works</a>
              <a className="nav-link nav-hover" href="#">Explore</a>

              <a
                className="nav-link signin px-2"
                href="#"
              >
                Sign In
              </a>

              <a
                className="btn btn-danger register"
                href="#"
              >
                Register
              </a>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
