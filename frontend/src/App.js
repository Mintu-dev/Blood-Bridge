import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Explore_Navbar from "./Explore_Navbar";
import Footer from "./Footer";
import Explore from "./Explore/Explore";
import {Outlet} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const [result, setResult] = useState(undefined);

  const isExplore = location.pathname === "/explore";

  return (
    <>
      {isExplore
        ? <Explore_Navbar setResult={setResult} />
        : <Navbar />
      }

      {/*  DIRECT PASS */}
      {isExplore
        ? <Explore result={result} />
        : <Outlet />
      }

      <Footer />

        <ToastContainer />
    </>
  );
}

export default App;