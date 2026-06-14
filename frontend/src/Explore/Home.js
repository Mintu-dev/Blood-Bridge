import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader.js";
const BASE_URL = process.env.REACT_APP_BACKEND;

export default function Home({ result }) {
  const [donars, setDonars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedBlood, setSelectedBlood] = useState("All");

  const [locationSearch] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          withCredentials: true,
        });
        if (res.data) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const navigate = useNavigate();

  const handlePostDonor = () => {
    if (isLoggedIn) {
      navigate("/donarregister");
    } else {
      navigate("/login");
    }
  };

  const handler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/user/all-donar`, {
        withCredentials: true,
      });
      setDonars(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  const isSearching = Array.isArray(result);
  const dataToShow = isSearching ? result : donars;

  const filteredByBlood = (
    selectedBlood === "All"
      ? dataToShow
      : dataToShow.filter((d) => d.bloodGroup === selectedBlood)
  ).filter(
    (d) =>
      locationSearch === "" ||
      d.address?.toLowerCase().includes(locationSearch.toLowerCase()) ||
      d.city?.toLowerCase().includes(locationSearch.toLowerCase()) ||
      d.pincode?.toString().includes(locationSearch),
  );

  if (loading) {
    return <Loader />;
  }
  const colors = [
    "linear-gradient(135deg, #BBDEFB, #90CAF9)",
    "linear-gradient(135deg, #C8E6C9, #A5D6A7)",
    "linear-gradient(135deg, #E1BEE7, #CE93D8)",
    "linear-gradient(135deg, #FFE0B2, #FFCC80)",
    "linear-gradient(135deg, #B2DFDB, #80CBC4)",
    "linear-gradient(135deg, #F8BBD9, #F48FB1)",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "10px 20px",
        background: "linear-gradient(180deg,#ffe6e6,#ff5252)",
      }}
    >
      {/* Header Section */}
      <div className="container mb-4"></div>
      <div className="d-flex justify-content-center">
        <div
          onClick={handlePostDonor}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 28px",
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "white",
            borderRadius: "30px",
            background: "#d32f2f",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(211,47,47,0.3)",
          }}
        >
          🩸 Become a Donor
        </div>
      </div>
      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "10px auto",
          maxWidth: "500px",
          gap: "10px",
        }}
      >
        <hr style={{ flex: 1, borderColor: "#c62828", opacity: 0.4 }} />
        <span
          style={{ color: "purple", fontWeight: "600", fontSize: "1.3rem" }}
        >
          Or, If you need blood, then
        </span>
        <hr style={{ flex: 1, borderColor: "#c62828", opacity: 0.4 }} />
      </div>

      <div className="text-center mb-3">
        <h2 style={{ fontWeight: "800", fontSize: "1.6rem", color: "#c62828" }}>
          Search Blood Donors
        </h2>
        <p style={{ color: "light black", fontSize: "0.95rem" }}>
          Connect with verified donors in your area instantly
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
          <button
            key={bg}
            onClick={() => setSelectedBlood(bg)}
            style={{
              padding: "5px 12px",
              marginBottom: "30px",
              borderRadius: "20px",
              border: "2px solid #c62828",
              background: selectedBlood === bg ? "#c62828" : "white",
              color: selectedBlood === bg ? "white" : "#c62828",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            {bg}
          </button>
        ))}
      </div>

      {/* NO RESULT */}
      {isSearching && dataToShow.length === 0 ? (
        <h3 style={{ textAlign: "center", color: "white" }}>No donor found</h3>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {filteredByBlood.map((donar) => (
            <Card
              key={donar._id}
              sx={{
                width: 280,
                height: 300,
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                position: "relative",
              }}
            >
              {/* Blood Group */}
              <div
                style={{
                  position: "absolute",
                  top: 75,
                  right: 20,
                  background: "#d32f2f",
                  color: "white",
                  width: "30px",
                  height: "30px",
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
                sx={{ padding: "6px 10px" }}
                titleTypographyProps={{ fontSize: "1rem", fontWeight: "600" }}
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: red[400],
                      width: 30,
                      height: 30,
                      fontSize: "0.9rem",
                    }}
                  >
                    {donar.fullName ? donar.fullName[0].toUpperCase() : "U"}
                  </Avatar>
                }
                // UPDATED ACTION
                action={
                  <>
                    <IconButton
                      onClick={async () => {
                        if (!isLoggedIn) {
                          navigate("/login");
                        } else {
                          try {
                            const res = await axios.get(
                              `${BASE_URL}/api/user/user-by-email/${donar.email}`,
                            );
                            console.log("Full API Response:", res.data);
                            console.log("Donor email:", donar.email);
                            const userId = res.data.user._id;
                            console.log(" Actual User ID:", userId);
                            navigate(`/chat/${userId}`);
                          } catch (err) {
                            console.log("❌ User not found for this donor");
                          }
                        }
                      }}
                    >
                      💬
                    </IconButton>

                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </>
                }
                title={donar.fullName}
              />

              <div
                style={{
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background:
                      colors[dataToShow.indexOf(donar) % colors.length],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "80px",
                    fontWeight: "800",
                    color: "white",
                  }}
                >
                  {donar.fullName ? donar.fullName[0].toUpperCase() : "D"}
                </div>
              </div>

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
                  🎂{" "}
                  {donar.dob
                    ? `${Math.floor((new Date() - new Date(donar.dob)) / (365.25 * 24 * 60 * 60 * 1000))} years`
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
