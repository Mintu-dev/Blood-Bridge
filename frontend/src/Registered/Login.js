import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

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
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = { username, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login-user",
        data
      );

      if (response.data.success) {
        setIsError(false);
        setMessage(response.data.message);
      }
      navigate("/explore")

      setUsername("");
      setPassword("");

    } catch (error) {
      console.log("Error", error);

      setIsError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
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
            data-aos="fade-down"
            data-aos-delay="200"
            sx={{
              fontWeight: "bold",
              color: "#d32f2f",
              mb: 1,
            }}
          >
            LifeConnect
          </Typography>

          <Typography
            align="center"
            data-aos="fade-down"
            data-aos-delay="400"
            sx={{ color: "gray", mb: 4 }}
          >
            Donate Blood. Save Lives.
          </Typography>

          <Box data-aos="fade-right" data-aos-delay="600">
            <TextField
              label="Username"
              fullWidth
              sx={{ mb: 3 }}
              value={username}
              onChange={usernameHandler}
            />
          </Box>

          <Box data-aos="fade-left" data-aos-delay="800">
            <TextField
              label="Password"
              type="password"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={passwordHandler}
            />
          </Box>

          {/* MESSAGE SHOW YAHAN HOGA */}
          {message && (
            <Typography
              align="center"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: isError ? "red" : "green",
              }}
            >
              {message}
            </Typography>
          )}

          <Box data-aos="zoom-in-up" data-aos-delay="1000">
            <Button
              fullWidth
              sx={{
                py: 1.4,
                borderRadius: "50px",
                background:
                  "linear-gradient(90deg,#c62828,#ff5252)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  background:
                    "linear-gradient(90deg,#b71c1c,#ff1744)",
                },
              }}
              type="submit"
            >
              Login
            </Button>
          </Box>

          <Typography
            align="center"
            data-aos="fade-up"
            data-aos-delay="1200"
            sx={{ mt: 3, fontSize: "0.9rem" }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "#d32f2f", fontWeight: 600 }}>
             <Link to="/register"> Register</Link>
            </span>
          </Typography>
        </Box>
      </Box>
    </form>
  );
}

export default Login;