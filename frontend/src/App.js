import Navbar from "./Navbar.js"
import react , {useState} from "react";
import Footer from "./Footer.js"
import {useLocation} from "react-router-dom";
import {Outlet} from "react-router-dom";
import Explore_Navbar from "./Explore_Navbar.js"

function App() {
  const location = useLocation();
  const [result , setResult] =  ([]);

  return (
    <>
      {location.pathname === "/explore" ? <Explore_Navbar setResult={setResult}/> : <Navbar />}
      <Outlet context={result}/>
      <Footer/>
    </>
  );
}

export default App;
