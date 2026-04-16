import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";

function Explore_Navbar({ setResult }) {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true },
      );

      // clear storage
      localStorage.removeItem("token");

      // update UI instantly
      setIsLoggedIn(false);

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
        `http://localhost:8000/api/v1/user/search?type=${encodeURIComponent(value)}`, //yehe pe encodedURIComponent dalne pe + wala value le raha hai
      );
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg  bg-white py-3 sticky-top">
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

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form
          className="d-flex ms-5 flex-grow-1"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search your type"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 align-items-lg-center">
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

export default Explore_Navbar;
