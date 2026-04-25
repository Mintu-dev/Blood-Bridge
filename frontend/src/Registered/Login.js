import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader.js";
import { handleSuccess, handleError } from "../utils/Error&SuccessHandler.js";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

//  ADD THIS IMPORT
import socket from "../socket";

function Login() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login-user",
        { username, password },
        {
          withCredentials: true,
        }
      );

      setLoader(false);

      if (response?.data) {
        
        handleSuccess(response.data.message);

        // 🔥 ADD THIS BLOCK (SOCKET REGISTER)
        if (response.data.user?._id) {
          socket.emit("addUser", response.data.user._id);
        }

        navigate("/explore");
      }
    } catch (error) {
      setLoader(false);
      console.log("Error:", error);
      const msg =
        error.response?.data?.message || "Something went wrong";

      handleError(msg);
    }
  };

  return (
    <>
      {loader && <Loader />}

      <form onSubmit={submitHandler}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(135deg, #b71c1c, #e53935, #ff6f61)",
            px: 2,
          }}
        >
          <Box
            data-aos="zoom-in"
            sx={{
              width: "100%",
              maxWidth: "420px",
              background: "white",
              borderRadius: "20px",
              padding: "50px 35px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: "bold", color: "#d32f2f", mb: 1 }}
            >
              LifeConnect
            </Typography>

            <Typography align="center" sx={{ color: "gray", mb: 4 }}>
              Donate Blood. Save Lives.
            </Typography>

            <TextField
              label="Username"
              fullWidth
              sx={{ mb: 3 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              sx={{
                py: 1.4,
                borderRadius: "50px",
                background:
                  "linear-gradient(90deg,#c62828,#ff5252)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>

            <Typography align="center" sx={{ mt: 3 }}>
              Don’t have an account?{" "}
              <Link to="/register">Register</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default Login;