import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
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
  const navigate = useNavigate();
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
     const response = await axios.post("http://localhost:8000/api/v1/user/register", data);
      console.log("Register successfully");
      if(response.data.success){
        alert(response.data.message);
      }
      navigate("/login")
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
      setGender("");
      setDob("");
      setBio("");
    } catch (error) {
      console.log("Error", error);
  if (error.response) {
    alert(error.response.data.message);
  } else {
    alert("Something went wrong");
}
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      style={{ width: "100%", maxWidth: "480px" }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "24px",
          background: "white",
          boxShadow: "0 30px 70px rgba(0,0,0,0.25)",
        }}
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -40 },
            visible: { opacity: 1, y: 0 },
          }}
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#c62828",
            fontWeight: "bold",
          }}
        >
          Join LifeConnect ❤️
        </motion.h2>

        <form onSubmit={submit} autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* LEFT */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                label="Username"
                fullWidth
                size="small"
                onChange={userName}
                value={username}
              />
            </motion.div>

            {/* RIGHT */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                label="Full Name"
                fullWidth
                size="small"
                onChange={fullName}
                value={fullname}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                label="Email"
                fullWidth
                size="small"
                value={email}
                onChange={EMail}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
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
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                select
                label="Select Gender"
                fullWidth
                size="small"
                value={gender}
                onChange={GEnder}
              >
                {genders.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                value={dob}
                onChange={Dob}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <TextField
                label="Bio"
                multiline
                rows={3}
                fullWidth
                size="small"
                value={bio}
                onChange={Bio}
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: "30px",
                  paddingY: 1.2,
                  fontWeight: "bold",
                  background:
                    "linear-gradient(90deg,#c62828,#ff5252)",
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Register
              </Button>
            </motion.div>
          </Box>
        </form>
      </Paper>
    </motion.div>
  </Box>
);
}

export default Register;
