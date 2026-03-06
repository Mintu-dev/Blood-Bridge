import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { motion } from "framer-motion";

function BloodDonorRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [weight, setWeight] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [isEligible, setIsEligible] = useState(true);

  const genders = ["Male", "Female", "Rather not to disclose"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const donorData = {
      fullName,
      email,
      phoneNumber: phone,
      gender,
      dob,
      bloodGroup,
      address: { street, city, state, pincode },
      weight,
      lastDonationDate,
      anyMedicalConditions: medicalConditions,
      isEligible,
    };
    console.log(donorData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #8e0000, #c62828, #ff5252)",
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
             marginTop:"30px",
              marginBottom:"30px",
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
              color: "#b71c1c",
              fontWeight: "bold",
            }}
          >
            Join LifeConnect as Donor 🩸
          </motion.h2>

          <form onSubmit={handleSubmit} autoComplete="off">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

              {/* Full Name */}
              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Full Name"
                  fullWidth
                  size="small"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Email"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  size="small"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </motion.div>

              {/* Gender */}
              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  select
                  label="Gender"
                  fullWidth
                  size="small"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                  ))}
                </TextField>
              </motion.div>

              {/* DOB */}
              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </motion.div>

              {/* Blood Group */}
              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  select
                  label="Blood Group"
                  fullWidth
                  size="small"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  {bloodGroups.map((bg) => (
                    <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                  ))}
                </TextField>
              </motion.div>

              {/* Weight */}
              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Weight (kg)"
                  type="number"
                  fullWidth
                  size="small"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </motion.div>

              {/* Address */}
              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Street"
                  fullWidth
                  size="small"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </motion.div>

              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="City"
                  fullWidth
                  size="small"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </motion.div>

              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="State"
                  fullWidth
                  size="small"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </motion.div>

              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Pincode"
                  fullWidth
                  size="small"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </motion.div>

              {/* Last Donation Date */}
              <motion.div variants={{ hidden:{opacity:0,x:50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Last Donation Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  value={lastDonationDate}
                  onChange={(e) => setLastDonationDate(e.target.value)}
                />
              </motion.div>

              {/* Medical Conditions */}
              <motion.div variants={{ hidden:{opacity:0,x:-50}, visible:{opacity:1,x:0} }}>
                <TextField
                  label="Medical Conditions"
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                />
              </motion.div>

              {/* Is Eligible */}
              <motion.div variants={{ hidden:{opacity:0,y:40}, visible:{opacity:1,y:0} }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isEligible}
                      onChange={(e) => setIsEligible(e.target.checked)}
                    />
                  }
                  label="Eligible for Donation"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={{ hidden:{opacity:0,y:40}, visible:{opacity:1,y:0} }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              </motion.div>

            </Box>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default BloodDonorRegister;