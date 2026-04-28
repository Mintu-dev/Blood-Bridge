import React, { useState, useEffect } from "react";
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
  const [myId, setMyId] = useState("");
  const location = useLocation();

  // ✅ NOTIFICATION
  useEffect(() => {
    const updateUnread = () => {
      try {
        const data = localStorage.getItem('unreadCounts');
        if (data) {
          const unreadCounts = JSON.parse(data);
          const total = Object.values(unreadCounts).reduce((sum, val) => sum + (val || 0), 0);
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

  // ✅ LOGIN CHECK + SOCKET
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/user/profile`,
          { withCredentials: true }
        );

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
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/user/logout`,
        {},
        { withCredentials: true }
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
    <nav className="navbar navbar-expand-lg bg-white py-2 py-lg-3 sticky-top shadow-sm">
      <div className="container">

        {/* ✅ BRAND - Responsive font */}
        <HashLink
          smooth
          to="/#hero"
          onClick={closeNavbar}
          className="navbar-brand fw-bold lifeconnect d-flex align-items-center gap-2"
        >
          <i className="bi bi-droplet-fill blood-icon"></i>
          <span className="life-text">𝓛𝓲𝓯𝓮</span>
          <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
        </HashLink>

        {/* ✅ Mobile Right Icons (Hide on Desktop) */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          {isLoggedIn && (
            <>
              <Link 
                to="/allchat" 
                className="position-relative me-1"
                onClick={closeNavbar}
                style={{ fontSize: "18px", color: "#333", textDecoration: "none" }}
              >
                🔔
                {unread > 0 && (
                  <span className="mobile-badge">
                    {unread > 99 ? '99+' : unread}
                  </span>
                )}
              </Link>
              
              <Link to="/profile" onClick={closeNavbar} 
                style={{ fontSize: "20px", color: "#333", textDecoration: "none" }}>
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

        {/* ✅ Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-1 gap-lg-3 align-items-lg-center py-2 py-lg-0">

            {/* Navigation Links */}
            <HashLink to="/#features" className="nav-link px-3 py-2 py-lg-0" onClick={closeNavbar}>
              Features
            </HashLink>

            <HashLink to="/#work" className="nav-link px-3 py-2 py-lg-0" onClick={closeNavbar}>
              How It Works
            </HashLink>

            <HashLink to="/explore" className="nav-link px-3 py-2 py-lg-0" onClick={closeNavbar}>
              Explore
            </HashLink>

            {/* Divider for Mobile */}
            <div className="border-top d-lg-none my-2"></div>

            {!isLoggedIn ? (
              /* ✅ LOGGED OUT */
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 px-3 px-lg-0">
                <Link to="/login" className="nav-link signin text-center" onClick={closeNavbar}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-danger register text-center" onClick={closeNavbar}>
                  Register
                </Link>
              </div>
            ) : (
              /* ✅ LOGGED IN */
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-lg-center px-3 px-lg-0">
                
                {/* ✅ Desktop: Bell icon with badge */}
                <Link 
                  to="/allchat" 
                  className="nav-link position-relative d-none d-lg-inline-block"
                  onClick={closeNavbar}
                  style={{ fontSize: "22px" }}
                >
                  🔔
                  {unread > 0 && (
                    <span className="desktop-badge">
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </Link>

                {/* ✅ Mobile: Messages link */}
                <Link to="/allchat" className="nav-link d-lg-none px-3 py-2" onClick={closeNavbar}>
                  💬 Messages {unread > 0 && <span className="ms-1">({unread})</span>}
                </Link>

                {/* ✅ Desktop: Profile icon */}
                <Link to="/profile" className="nav-link d-none d-lg-inline-block" onClick={closeNavbar}>
                  <i className="fa-solid fa-circle-user fs-3"></i>
                </Link>

                {/* ✅ Mobile: Profile link */}
                <Link to="/profile" className="nav-link d-lg-none px-3 py-2" onClick={closeNavbar}>
                  👤 Profile
                </Link>

                {/* Logout Button */}
                <button className="btn btn-danger w-100 w-lg-auto" onClick={() => { handleLogout(); closeNavbar(); }}>
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