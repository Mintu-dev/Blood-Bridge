import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader.js";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
const BASE_URL = process.env.REACT_APP_BACKEND;

function EditBio() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const navigate = useNavigate();

  const [bio , setBio] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const response = await axios.post(
        `${BASE_URL}/api/user/editbio`,
        { bio },
        {
          withCredentials: true, 
        }
      );

      setLoader(false);

      if (response?.data) {
        setIsError(false);
        setMessage(response.data.message);
        alert(response.data.message);

        navigate("/profile");

        // optional
        window.location.reload();
      }
    } catch (error) {
      setLoader(false);
      console.log("Error:", error);

      setIsError(true);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (loader) return <Loader />;

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
            sx={{ fontWeight: "bold", color: "#d32f2f", mb: 1 }}
          >
            LifeConnect
          </Typography>

          <Typography align="center" sx={{ color: "gray", mb: 4 }}>
            Donate Blood. Save Lives.
          </Typography>

          <TextField
            label="New Bio"
            fullWidth
            sx={{ mb: 3 }}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          

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
            Commit Change
          </Button>
         
        </Box>
      </Box>
    </form>
  );
}

export default EditBio;