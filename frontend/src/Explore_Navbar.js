import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";
import socket from "./socket";
const BASE_URL = process.env.REACT_APP_BACKEND;

function Explore_Navbar({ setResult }) {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  //  NOTIFICATION - Check localStorage every 1 second
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

  //  LOGIN + SOCKET REGISTER
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/user/profile`,
          { withCredentials: true }
        );

        if (res?.data?.user) {
          setIsLoggedIn(true);
          socket.emit("addUser", res.data.user._id);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("unreadCounts");
      setIsLoggedIn(false);
      setUnread(0);
      navigate("/login");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);
    if (value.trim() === "") {
      setResult(undefined);
      return;
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/search?type=${encodeURIComponent(value)}`
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-2 py-lg-3 sticky-top shadow-sm">
      <div className="container">

        {/*  BRAND - Responsive */}
        <HashLink smooth to="/#hero" onClick={closeNavbar}
          className="navbar-brand fw-bold lifeconnect d-flex align-items-center gap-2">
          <i className="bi bi-droplet-fill blood-icon"></i>
          <span className="life-text">𝓛𝓲𝓯𝓮</span>
          <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
        </HashLink>

        {/* SEARCH BAR - Hide on mobile, show in menu */}
        <form className="d-none d-md-flex ms-3 flex-grow-1 mx-lg-4" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              className="form-control border-start-0 ps-0"
              placeholder="Search blood group..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderRadius: "0 25px 25px 0" }}
            />
          </div>
        </form>

        {/*  Mobile Right Icons */}
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

        {/*  Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-1 gap-lg-3 align-items-lg-center py-2 py-lg-0">

            {/*  Mobile Search Bar */}
            <div className="d-md-none px-3 pb-2">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control border-start-0"
                  placeholder="Search blood group..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="border-top d-lg-none my-2"></div>

            {!isLoggedIn ? (
              /*  LOGGED OUT */
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 px-3 px-lg-0">
                <Link to="/login" className="nav-link signin text-center" onClick={closeNavbar}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-danger register text-center" onClick={closeNavbar}>
                  Register
                </Link>
              </div>
            ) : (
              /*  LOGGED IN */
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-lg-center px-3 px-lg-0">
                
                {/*  Desktop: Bell icon with badge */}
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

                {/* Mobile: Messages link */}
                <Link to="/allchat" className="nav-link d-lg-none px-3 py-2" onClick={closeNavbar}>
                  💬 Messages {unread > 0 && <span className="ms-1">({unread})</span>}
                </Link>

                {/*  Desktop: Profile icon */}
                <Link to="/profile" className="nav-link d-none d-lg-inline-block" onClick={closeNavbar}>
                  <i className="fa-solid fa-circle-user fs-3"></i>
                </Link>

                {/*  Mobile: Profile link */}
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

export default Explore_Navbar;