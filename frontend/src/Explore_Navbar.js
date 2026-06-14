import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // NAVBAR REF
  const navbarRef = useRef(null);

  //  CLOSE NAVBAR ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbarNav");

      // Only mobile
      if (window.innerWidth >= 992) return;

      // Navbar open?
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

  // AUTO-OPEN NAVBAR IF REDIRECTED WITH openMenu STATE
  useEffect(() => {
    if (location.state?.openMenu) {
      const navbar = document.getElementById("navbarNav");
      if (navbar) {
        const bsCollapse = new Collapse(navbar, { toggle: false });
        bsCollapse.show();
      }
    }
  }, [location.state]);

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");

    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new Collapse(navbar, {
        toggle: false,
      });

      bsCollapse.hide();
    }
  };

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

  // LOGIN + SOCKET
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          withCredentials: true,
        });

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
        { withCredentials: true },
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
        `${BASE_URL}/api/user/search?location=${encodeURIComponent(value)}`,
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
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
          className="navbar-brand fw-bold BloodBridge d-flex align-items-center gap-2"
        >
          <i className="bi bi-droplet-fill blood-icon"></i>

          <span className="life-text">Blood</span>

          <span className="connect-text">Bridge</span>
        </HashLink>

        {/* DESKTOP SEARCH */}
        <form
          className="d-none d-md-flex ms-3 flex-grow-1 mx-lg-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>

            <input
              className="form-control border-start-0 ps-0"
              placeholder="Search by city, state, pincode..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ borderRadius: "0 25px 25px 0" }}
            />
          </div>
        </form>

        {/* MOBILE RIGHT ICONS */}
        <div className="d-flex align-items-center gap-2 d-lg-none ms-auto">
          {isLoggedIn && (
            <>
              <Link
                to="/allchat"
                className="position-relative me-1"
                onClick={closeNavbar}
                style={{
                  fontSize: "19px",
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
                  fontSize: "21px",
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
            style={{
              boxShadow: "none",
              padding: "2px 6px",
              fontSize: "0.9rem",
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <HashLink
          to="/#blood-types"
          className="nav-link px-3 py-2 py-lg-0"
          onClick={closeNavbar}
        ></HashLink>

        <HashLink
          to="/#difference"
          className="nav-link px-3 py-2 py-lg-0"
          onClick={closeNavbar}
        ></HashLink>

        {/* COLLAPSIBLE MENU */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ position: "relative" }}
        >
          <button
            onClick={closeNavbar}
            style={{
              position: "absolute",
              top: "-1px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: "#d32f2f",
              fontSize: "22px",
              cursor: "pointer",
              zIndex: 10,
            }}
          >
            ✕
          </button>

          <div className="navbar-nav ms-auto gap-1 gap-lg-3 align-items-lg-center py-2 py-lg-0">
            {/* MOBILE SEARCH */}
            <div className="d-md-none px-3 pb-2">
              <div
                className="input-group "
                style={{ maxWidth: "300px", margin: "0 auto" }}
              >
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  className="form-control border-start-0"
                  placeholder="Search donors by city, state.."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    borderColor: "#ddd",
                  }}
                />
              </div>
            </div>

            <div className="border-top d-lg-none my-2"></div>

            {!isLoggedIn ? (
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 px-3 px-lg-0">
                <Link
                  to="/login"
                  className="nav-link signin text-center"
                  onClick={closeNavbar}
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
              <div className="d-flex flex-column flex-lg-row gap-2 gap-lg-3 align-items-lg-center px-3 px-lg-0">
                {/* DESKTOP NOTIFICATION */}
                <Link
                  to="/allchat"
                  className="nav-link position-relative d-none d-lg-inline-block"
                  onClick={closeNavbar}
                  style={{ fontSize: "22px" }}
                >
                  🔔
                  {unread > 0 && (
                    <span className="desktop-badge">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </Link>

                {/* MOBILE MESSAGES */}
                <Link
                  to="/allchat"
                  className="nav-link d-lg-none px-3 py-2"
                  onClick={closeNavbar}
                >
                  💬 Messages{" "}
                  {unread > 0 && <span className="ms-1">({unread})</span>}
                </Link>

                {/* DESKTOP PROFILE */}
                <Link
                  to="/profile"
                  className="nav-link d-none d-lg-inline-block"
                  onClick={closeNavbar}
                >
                  <i className="fa-solid fa-circle-user fs-3"></i>
                </Link>

                {/* MOBILE PROFILE */}
                <Link
                  to="/profile"
                  className="nav-link d-lg-none px-3 py-2"
                  onClick={closeNavbar}
                >
                  👤 Profile
                </Link>

                {/* LOGOUT */}
                <button
                  className="btn btn-danger  w-lg-auto "
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
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

export default Explore_Navbar;
