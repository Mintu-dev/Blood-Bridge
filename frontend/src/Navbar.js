import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";
import {handleSuccess , handleError} from "./utils/Error&SuccessHandler.js";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  //  Check login on load
  React.useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
          { withCredentials: true },
        );

        if (res?.data?.user) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  //  Logout Function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true },
      );
      handleSuccess("Logout Successfully");

      // clear storage
      localStorage.removeItem("token");

      // update UI instantly
      setIsLoggedIn(false);
       
      navigate("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top">
      <div className="container">
        {/* Logo */}
        <HashLink
          smooth
          to="/#hero"
          onClick={closeNavbar}
          className="navbar-brand fw-bold fs-2 lifeconnect d-flex align-items-center gap-2"
        >
          <i className="bi bi-droplet-fill blood-icon"></i>
          <span className="life-text">𝓛𝓲𝓯𝓮</span>
          <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
        </HashLink>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 align-items-lg-center">
            <HashLink
              to="/#features"
              className="nav-link"
              onClick={closeNavbar}
            >
              Features
            </HashLink>

            <HashLink to="/#work" className="nav-link" onClick={closeNavbar}>
              How It Works
            </HashLink>

            <HashLink to="/explore" className="nav-link" onClick={closeNavbar}>
              Explore
            </HashLink>

            {/* CONDITIONAL UI */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link" onClick={closeNavbar}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-danger"
                  onClick={closeNavbar}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="nav-link fs-2"
                  onClick={closeNavbar}
                >
                  <i className="fa-solid fa-circle-user"></i>
                </Link>

                {/* Logout */} 
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
