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

function App() {
  const location = useLocation();
  const [result, setResult] = useState(undefined);

  const isExplore = location.pathname === "/explore";

  // 🔥 REGISTER SOCKET ON APP LOAD
  useEffect(() => {
    const connectSocket = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
          { withCredentials: true }
        );

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
      {/* ✅ NotificationHandler ALWAYS mounted */}
      <NotificationHandler />
      
      {isExplore
        ? <Explore_Navbar setResult={setResult} />
        : <Navbar />
      }

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