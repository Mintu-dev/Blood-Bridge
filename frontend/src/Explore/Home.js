import React, { useState, useEffect } from "react";
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
import Loader from "../Loader.js";

export default function Home({ result }) {
  const [donars, setDonars] = useState([]);
  const [loading, setLoading] = useState(false);

  const handler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-donar"
      );
      setDonars(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // ✅ always stop loader
    }
  };

  useEffect(() => {
    handler();
  }, []);

  // ✅ FIXED LOGIC
  const isSearching = Array.isArray(result); 
  const dataToShow = isSearching ? result : donars;

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(180deg,#ffe6e6,#ff5252)",
      }}
    >
      {/* Post Button */}
      <div className="container d-flex justify-content-center mb-5">
        <div
          style={{
            padding: "3px",
            borderRadius: "50px",
            background:
              "linear-gradient(270deg,#ff0000,#ff7b7b,#ff0000)",
            backgroundSize: "400% 400%",
            animation: "borderMove 4s linear infinite",
          }}
        >
          <a
            href="donarregister"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              fontSize: "20px",
              fontWeight: "600",
              color: "white",
              textDecoration: "none",
              borderRadius: "50px",
              background: "#d32f2f",
            }}
          >
            ❤️ Post Donor
          </a>
        </div>
      </div>

      {/* ✅ NO RESULT MESSAGE */}
      {isSearching && dataToShow.length === 0 ? (
        <h3 style={{ textAlign: "center", color: "white" }}>
          No donor found 😢
        </h3>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {dataToShow.map((donar) => (
            <Card
              key={donar._id}
              sx={{
                width: 320,
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                position: "relative",
              }}
            >
              {/* Blood Group */}
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
                  zIndex: 5,
                }}
              >
                {donar.bloodGroup}
              </div>

              {/* Header */}
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>
                    {donar.fullName
                      ? donar.fullName[0].toUpperCase()
                      : "U"}
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={donar.fullName}
                subheader={
                  donar.createdAt
                    ? new Date(donar.createdAt).toDateString()
                    : ""
                }
              />

              {/* Image */}
              <CardMedia
                component="img"
                height="200"
                image="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="donor"
              />

              {/* Content */}
              <CardContent>
                <Typography variant="body2">
                  📍 {donar.address?.street || "N/A"},{" "}
                  {donar.address?.city || ""}
                </Typography>

                <Typography variant="body2">
                  📮 {donar.address?.pincode || "N/A"}
                </Typography>

                <Typography variant="body2">
                  👨 {donar.gender || "N/A"}
                </Typography>

                <Typography variant="body2">
                  📏 {donar.height || "N/A"} cm
                </Typography>

                <Typography variant="body2">
                  ⚖️ {donar.weight || "N/A"} kg
                </Typography>

                <Typography variant="body2">
                  🎂{" "}
                  {donar.dob
                    ? new Date(donar.dob).toLocaleDateString("en-GB")
                    : "N/A"}
                </Typography>

                <Typography variant="body2">
                  🩺{" "}
                  {donar.anyMedicalConditions?.length > 0
                    ? donar.anyMedicalConditions.join(", ")
                    : "None"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}