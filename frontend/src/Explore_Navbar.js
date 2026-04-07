import React , {useState} from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "bootstrap";
import axios from "axios";

function Explore_Navbar({setResult}) {

  const [search , setSearch] = useState("");
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

    const handleSearch = async(value)=>{
      setSearch(value);
      if(value.trim()===""){
        setResult(undefined);
        return;
      }
        try{
          const res = await axios.get(`http://localhost:8000/api/v1/user/search?type=${value}`);
          setResult(res.data);

        }catch(err){
          console.log(err);
        }
    }

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
          <div className="ms-5 flex-grow-1">
         <form className="d-flex ms-5 flex-grow-1" role="search" onSubmit={(e)=>e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search your type"
                value={search}
                onChange={((e)=> handleSearch(e.target.value))}
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            </div>
        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-3 align-items-lg-center">

            <Link
              to="/login"
              className="nav-link signin px-2"
              onClick={closeNavbar}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-danger register"
              onClick={closeNavbar}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Explore_Navbar;
