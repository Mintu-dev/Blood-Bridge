import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

export default function Home() {

  const [donars, setDonars] = useState([]);

  const handler = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-donar"
      );

      setDonars(res.data.data || []);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(180deg,#ffe6e6,#ff5252)",
      }}
    >

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px"
        }}
      >

        {donars.map((donar) => (

          <Card
            key={donar._id}
            sx={{
              width: 320,
              borderRadius: "16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              position: "relative"
            }}
          >

            {/* Blood Group Circle */}
            <div
              style={{
                position: "absolute",
                top: 120,
                right: 15,
                background: "#d32f2f",
                color: "white",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "15px",
                zIndex: 5
              }}
            >
              {donar.bloodGroup}
            </div>

            {/* Name + Date */}
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }}>
                  {donar.fullName ? donar.fullName[0].toUpperCase() : "U"}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={donar.fullName}
              subheader={new Date(donar.createdAt).toDateString()}
            />

            {/* Image */}
            <CardMedia
              component="img"
              height="200"
              image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="donor"
              sx={{ objectFit: "cover" }}
            />

            {/* Details */}
            <CardContent>

              <Typography variant="body2">
                📍 Address: {donar.address?.street}, {donar.address?.city}
              </Typography>

              <Typography variant="body2">
                📮 Pincode: {donar.address?.pincode}
              </Typography>

              <Typography variant="body2">
                👨 Gender: {donar.gender}
              </Typography>

               
              <Typography variant="body2">
                📏 Height: {donar.height} cm
              </Typography>

              <Typography variant="body2">
                ⚖️ Weight: {donar.weight} kg
              </Typography>

              <Typography variant="body2">
                🎂 DOB: {new Date(donar.dob).toLocaleDateString("en-GB")}
              </Typography>

              <Typography variant="body2">
                🩺 Medical: {donar.anyMedicalConditions?.join(", ") || "None"}
              </Typography>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>
  );
}