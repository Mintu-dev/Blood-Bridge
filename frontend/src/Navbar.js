import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top">
      <div className="container">

        {/* Logo */}
        <HashLink
          smooth
          to="/#hero"
          className="navbar-brand fw-bold fs-2 lifeconnect d-flex align-items-center gap-2"
        >
          <i className="bi bi-droplet-fill blood-icon"></i>
          <span className="life-text">𝓛𝓲𝓯𝓮</span>
          <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
        </HashLink>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 align-items-lg-center">

            <HashLink smooth to="/#features" className="nav-link nav-hover">
              Features
            </HashLink>

            <HashLink smooth to="/#work" className="nav-link nav-hover">
              How It Works
            </HashLink>

            <HashLink smooth to="/explore" className="nav-link nav-hover">
              Explore
            </HashLink>

            <Link to="/signin" className="nav-link signin px-2">
              Login
            </Link>

            <Link to="/register" className="btn btn-danger register">
              Register
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
