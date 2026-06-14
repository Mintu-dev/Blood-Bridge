import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";
import socket from "./socket.js";
import { useLocation } from "react-router-dom";
import { handleSuccess } from "./utils/Error&SuccessHandler.js";

const BASE_URL = process.env.REACT_APP_BACKEND;

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const [ setMyId] = useState("");


  //  NAVBAR REF
  const navbarRef = useRef(null);

  //  CLOSE NAVBAR ON OUTSIDE CLICK (MOBILE)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbarNav");

      // Only mobile
      if (window.innerWidth >= 992) return;

      // If navbar is open
      if (navbar && navbar.classList.contains("show")) {
        // Click outside navbar
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          const bsCollapse = new Collapse(navbar, {
            toggle: false,
          });

          bsCollapse.hide();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // NOTIFICATION
  useEffect(() => {
    const updateUnread = () => {
      try {
        const data = localStorage.getItem("unreadCounts");

        if (data) {
          const unreadCounts = JSON.parse(data);

          const total = Object.values(unreadCounts).reduce(
            (sum, val) => sum + (val || 0),
            0,
          );

          setUnread(total);
        } else {
          setUnread(0);
        }
      } catch (err) {
        console.log("❌ Error reading unread:", err);
      }
    };

    updateUnread();

    const interval = setInterval(updateUnread, 1000);

    return () => clearInterval(interval);
  }, []);

  // LOGIN CHECK + SOCKET
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          withCredentials: true,
        });

        if (res?.data?.user) {
          setIsLoggedIn(true);

          setMyId(res.data.user._id);

          socket.emit("addUser", res.data.user._id);
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
      const bsCollapse = new Collapse(navbar, {
        toggle: false,
      });

      bsCollapse.hide();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/user/logout`,
        {},
        { withCredentials: true },
      );

      handleSuccess("Logout Successfully");

      localStorage.removeItem("token");
      localStorage.removeItem("unreadCounts");

      setIsLoggedIn(false);
      setUnread(0);

      navigate("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-lg bg-white py-2 py-lg-3 sticky-top shadow-sm"
    >
      <div className="container">
        {/* BRAND */}
        <HashLink
          smooth
          to="/#hero"
          onClick={closeNavbar}
          className="navbar-brand fw-bold lifeconnect d-flex align-items-center gap-2"
        >
          <i className="bi bi-droplet-fill blood-icon"></i>

          <span className="life-text">Blood</span>

          <span className="connect-text">Bridge</span>
        </HashLink>

        {/* MOBILE RIGHT ICONS */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          {isLoggedIn && (
            <>
              <Link
                to="/allchat"
                className="position-relative me-1"
                onClick={closeNavbar}
                style={{
                  fontSize: "18px",
                  color: "#333",
                  textDecoration: "none",
                }}
              >
                🔔
                {unread > 0 && (
                  <span className="mobile-badge">
                    {unread > 99 ? "99+" : unread}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                onClick={closeNavbar}
                style={{
                  fontSize: "20px",
                  color: "#333",
                  textDecoration: "none",
                }}
              >
                <i className="fa-solid fa-circle-user"></i>
              </Link>
            </>
          )}

          <button
            className="navbar-toggler border-0 p-1 ms-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{ boxShadow: "none" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* COLLAPSIBLE MENU */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-1 gap-lg-3 align-items-lg-center py-2 py-lg-0">
            <HashLink
              to="/#features"
              className="nav-link px-3 py-2 py-lg-0"
              onClick={closeNavbar}
            >
              Features
            </HashLink>

            <HashLink
              to="/#work"
              className="nav-link px-3 py-2 py-lg-0"
              onClick={closeNavbar}
            >
              Get Started
            </HashLink>
            <HashLink
              to="/#blood-types"
              className="nav-link px-3 py-2 py-lg-0"
              onClick={closeNavbar}
            >
              Blood Types
            </HashLink>

            <Link
              to="/explore"
              className="nav-link px-3 py-2 py-lg-0"
              onClick={closeNavbar}
            >
              Explore
            </Link>

            <div className="border-top d-lg-none my-2"></div>

            {!isLoggedIn ? (
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 px-3 px-lg-0">
                
                <Link
                  to="/login"
                  className="nav-link signin text-center"
                  onClick={closeNavbar}
                  style={{
                    backgroundColor: "#fce4e4",
                    color: "#c62828",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "600",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-danger register text-center"
                  onClick={closeNavbar}
                >
                  Register
                </Link>
              </div>
            ) : (
              
              <div className="d-flex align-items-center gap-3 px-3 ms-auto">
                {/* Bell Notification */}
                <Link
                  to="/allchat"
                  className="position-relative"
                  onClick={closeNavbar}
                  style={{ color: "#c62828", fontSize: "20px" }}
                >
                  🔔
                  {unread > 0 && (
                    <span className="desktop-badge">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </Link>

                {/* Profile Icon */}
                <Link
                  to="/profile"
                  onClick={closeNavbar}
                  style={{ color: "#555", fontSize: "20px" }}
                >
                  <i className="fa-solid fa-circle-user"></i>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
                  }}
                  style={{
                    background: "linear-gradient(90deg, #c62828, #ff5252)",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 20px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
