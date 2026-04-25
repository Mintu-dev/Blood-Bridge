import React, { useEffect, useState } from "react";
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
  const [myId, setMyId] = useState(""); //  IMPORTANT
  const location = useLocation();

  useEffect(() => {
  if (location.pathname.includes("/chat")) {
    setUnread(0);
  }
}, [location]);

  //  SOCKET NOTIFICATION (FIXED WITH FILTER)
  useEffect(() => {
    const handler = (msg) => {
      // 🔥 ONLY if message is for ME
      if (String(msg.receiver) === String(myId)) {
        console.log("🔔 New message:", msg);
        setUnread((prev) => prev + 1);
      }
    };

    socket.on("receiveMessage", handler);

    return () => socket.off("receiveMessage", handler);
  }, [myId]);

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

          setMyId(res.data.user._id); // 🔥 SAVE MY ID
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
      setIsLoggedIn(false);
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
                {/* 🔔 NOTIFICATION */}
                <Link 
                  to="/allchat" 
                  className="nav-link position-relative"
                  onClick={() => setUnread(0)} //  reset when opened
                >
                  🔔
                  {unread > 0 && (
                    <span style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-10px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px"
                    }}>
                      {unread}
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