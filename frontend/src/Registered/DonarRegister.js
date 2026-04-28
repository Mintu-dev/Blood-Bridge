import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSuccess, handleError } from "../utils/Error&SuccessHandler.js";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";
const BASE_URL = process.env.REACT_APP_BACKEND;

function BloodDonorRegister() {

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [weight, setWeight] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");

  const genders = ["Male", "Female", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName ||
      !email ||
      !phone ||
      !gender ||
      !dob ||
      !bloodGroup ||
      !weight ||
      !height
    ) {
      handleError("Please fill all required fields");
      return;
    }

    const donorData = {
      fullName,
      email,
      phoneNumber: phone,
      gender,
      dob,
      bloodGroup,
      address: {
        street,
        city,
        state,
        pincode
      },
      weight: Number(weight),
      height: Number(height),
      lastDonationDate: lastDonationDate || null,
      anyMedicalConditions: medicalConditions ? [medicalConditions] : []
    };

    try {

      const response = await axios.post(
        `${BASE_URL}/api/user/register-Donar`,
        donorData
      );

      console.log(response);
      console.log(response.data);

      if (response.data.success) {
        handleSuccess(response.data.message || "Success");
        navigate("/explore");
      }

    } catch (error) {

      console.log("Error:", error);

      if (error.response) {
        handleError(error.response.data.message || "Something went wrong");
      } else {
        handleError("Server error occurred");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #8e0000, #c62828, #ff5252)",
        px: 2,
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "24px",
            background: "white",
            boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#b71c1c",
              fontWeight: "bold",
            }}
          >
            Join LifeConnect as Donor 🩸
          </h2>

          {/*  IMPORTANT */}
          <form onSubmit={handleSubmit} autoComplete="off" noValidate>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

              <TextField label="Full Name"  fullWidth size="small"
                value={fullName} onChange={(e) => setFullName(e.target.value)} />

              <TextField label="Email"  fullWidth size="small"
                value={email} onChange={(e) => setEmail(e.target.value)} />

              <TextField label="Phone Number"  fullWidth size="small"
                value={phone} onChange={(e) => setPhone(e.target.value)} />

              <TextField select label="Gender"  fullWidth size="small"
                value={gender} onChange={(e) => setGender(e.target.value)}>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </TextField>

              <TextField label="Date of Birth" type="date" 
                InputLabelProps={{ shrink: true }} fullWidth size="small"
                value={dob} onChange={(e) => setDob(e.target.value)} />

              <TextField select label="Blood Group"  fullWidth size="small"
                value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                {bloodGroups.map((bg) => (
                  <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                ))}
              </TextField>

              <TextField label="Weight (kg)" type="number"  fullWidth size="small"
                value={weight} onChange={(e) => setWeight(e.target.value)} />

              <TextField label="Height (cm)" type="number"  fullWidth size="small"
                value={height} onChange={(e) => setHeight(e.target.value)} />

              <TextField label="Street" fullWidth size="small"
                value={street} onChange={(e) => setStreet(e.target.value)} />

              <TextField label="City" fullWidth size="small"
                value={city} onChange={(e) => setCity(e.target.value)} />

              <TextField label="State" fullWidth size="small"
                value={state} onChange={(e) => setState(e.target.value)} />

              <TextField label="Pincode" fullWidth size="small"
                value={pincode} onChange={(e) => setPincode(e.target.value)} />

              <TextField label="Last Donation Date" type="date"
                InputLabelProps={{ shrink: true }} fullWidth size="small"
                value={lastDonationDate} onChange={(e) => setLastDonationDate(e.target.value)} />

              <TextField label="Medical Conditions" multiline rows={3}
                fullWidth size="small"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)} />

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: "30px",
                  paddingY: 1.2,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg,#b71c1c,#ff5252)",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Register as Donor
              </Button>

            </Box>

          </form>

        </Paper>
      </motion.div>
    </Box>
  );
}

export default BloodDonorRegister;