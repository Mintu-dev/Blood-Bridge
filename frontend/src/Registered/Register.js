import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Rather not to disclose", label: "Rather not to disclose" },
  ];

  const submit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      fullname,
      email,
      password,
      gender,
      dob,
      bio,
    };
    try {
      await axios.post("http://localhost:8000/api/v1/user/register", data);
      console.log("Register successfully");
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setGender("");
      setDob("");
      setBio("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const userName = (e) => {
    setUsername(e.target.value);
  };
  const fullName = (e) => {
    setFullname(e.target.value);
  };
  const EMail = (e) => {
    setEmail(e.target.value);
  };
  const Password = (e) => {
    setPassword(e.target.value);
  };
  const GEnder = (e) => {
    setGender(e.target.value);
  };
  const Dob = (e) => {
    setDob(e.target.value);
  };
  const Bio = (e) => {
    setBio(e.target.value);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: "20px",
          }}
        >
          <h2 className="text-center mb-4">Registration Form</h2>
          <form onSubmit={submit} autoComplete="off">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
              autoComplete="off"
            >
              <TextField
                label="Username"
                fullWidth
                size="small"
                onChange={userName}
                value={username}
              />

              <TextField
                label="Full Name"
                fullWidth
                size="small"
                onChange={fullName}
                value={fullname}
              />

              <TextField
                label="Email"
                fullWidth
                size="small"
                value={email}
                onChange={EMail}
              />

              {/* Password */}
              <FormControl variant="outlined" fullWidth size="small">
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password}
                  onChange={Password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {/* Gender */}
              <TextField
                select
                label="Select Gender"
                fullWidth
                size="small"
                value={gender}
                onChange={GEnder}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {/* DOB */}
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                value={dob}
                onChange={Dob}
              />

              {/* Bio */}
              <TextField
                label="Bio"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={bio}
                onChange={Bio}
              />

              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{
                  mt: 2,
                  borderRadius: "30px",
                  paddingY: 1,
                  fontWeight: "bold",
                }}
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </div>
  );
}

export default Register;
