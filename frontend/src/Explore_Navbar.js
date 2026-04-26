import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";
import socket from "./socket";

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

  // ✅ LOGIN + SOCKET REGISTER
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
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
        "http://localhost:8000/api/v1/user/logout",
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
        `http://localhost:8000/api/v1/user/search?type=${encodeURIComponent(value)}`
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 sticky-top">
      <div className="container">

        <HashLink smooth to="/#hero" onClick={closeNavbar}
          className="navbar-brand fw-bold fs-2 lifeconnect d-flex align-items-center gap-2">
          <i className="bi bi-droplet-fill blood-icon"></i>
          <span className="life-text">𝓛𝓲𝓯𝓮</span>
          <span className="connect-text">𝙲𝚘𝚗𝚗𝚎𝚌𝚝</span>
        </HashLink>

        <form className="d-flex ms-5 flex-grow-1" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            placeholder="Search your type"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>

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

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-danger">Register</Link>
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

                <Link to="/profile" className="nav-link fs-2">
                  <i className="fa-solid fa-circle-user"></i>
                </Link>

                <button className="btn btn-danger" onClick={() => {
                  handleLogout();
                  closeNavbar();
                }}>
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

export default Explore_Navbar;