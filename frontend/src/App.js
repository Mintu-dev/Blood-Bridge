import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Explore_Navbar from "./Explore_Navbar";
import Footer from "./Footer";
import Explore from "./Explore/Explore";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import socket from "./socket";
import NotificationHandler from "./NotificationHandler";
import AOS from "aos";
import "aos/dist/aos.css";
axios.defaults.withCredentials = true;

const BASE_URL = process.env.REACT_APP_BACKEND;

function App() {
  const location = useLocation();
  const [result, setResult] = useState(undefined);

  const isExplore = location.pathname === "/explore";
  
  useEffect(() => {
    // Initialize AOS safely
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 100,
      });
    }

    // Cleanup function to prevent the error
    return () => {
      if (typeof window !== "undefined") {
        const aosElements = document.querySelectorAll("[data-aos]");
        aosElements.forEach((el) => {
          el.removeAttribute("data-aos");
        });
        // Destroy AOS if method exists (optional)
        if (AOS && typeof AOS.destroy === "function") {
          AOS.destroy();
        }
      }
    };
  }, []);

  //  REGISTER SOCKET ON APP LOAD
  useEffect(() => {
    const connectSocket = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          withCredentials: true,
        });

        const user = res.data.user;

        // REGISTER USER IN SOCKET
        socket.emit("addUser", user._id);
        console.log("🟢 APP - User registered in socket:", user._id);
      } catch (err) {
        console.log("User not logged in");
      }
    };

    connectSocket();
  }, []);

  return (
    <>
      {/* NotificationHandler ALWAYS mounted */}
      <NotificationHandler />

      {isExplore ? <Explore_Navbar setResult={setResult} /> : <Navbar />}

      {isExplore ? <Explore result={result} /> : <Outlet />}

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
