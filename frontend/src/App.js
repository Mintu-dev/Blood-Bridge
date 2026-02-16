import Navbar from "./Navbar.js"
import LandingPage from "./LandingPage/LandingPage.js"
import Footer from "./Footer.js"
import {Outlet} from "react-router-dom";

function App() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;
