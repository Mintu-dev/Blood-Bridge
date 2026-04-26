import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";
import socket from "./socket.js";
import { useLocation } from "react-router-dom";
import { handleSuccess } from "./utils/Error&SuccessHandler.js";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const [myId, setMyId] = useState("");
  const location = useLocation();

  // ✅ SIMPLE NOTIFICATION - Check localStorage every 1 second
  useEffect(() => {
    const updateUnread = () => {
      try {
        const data = localStorage.getItem('unreadCounts');
        if (data) {
          const unreadCounts = JSON.parse(data);
          const total = Object.values(unreadCounts).reduce((sum, val) => sum + (val || 0), 0);
          setUnread(total);
        }
      } catch (err) {
        console.log("❌ Error reading unread:", err);
      }
    };

    // Initial load
    updateUnread();

    // Check every 1 second
    const interval = setInterval(updateUnread, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ LOGIN CHECK + SOCKET REGISTER
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
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
        "http://localhost:8000/api/v1/user/logout",
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
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top">
      <div className="container">

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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 align-items-lg-center">

            <HashLink to="/#features" className="nav-link" onClick={closeNavbar}>
              Features
            </HashLink>

            <HashLink to="/#work" className="nav-link" onClick={closeNavbar}>
              How It Works
            </HashLink>

            <HashLink to="/explore" className="nav-link" onClick={closeNavbar}>
              Explore
            </HashLink>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link" onClick={closeNavbar}>
                  Login
                </Link>

                <Link to="/register" className="btn btn-danger" onClick={closeNavbar}>
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* 🔔 NOTIFICATION BELL */}
                <Link 
                  to="/allchat" 
                  className="nav-link position-relative"
                  onClick={closeNavbar}
                  style={{ fontSize: "24px" }}
                >
                  🔔
                  {unread > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-12px",
                      background: "#d32f2f",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
                    }}>
                      {unread > 99 ? '99+' : unread}
                    </span>
                  )}
                </Link>

                <Link to="/profile" className="nav-link fs-2" onClick={closeNavbar}>
                  <i className="fa-solid fa-circle-user"></i>
                </Link>

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