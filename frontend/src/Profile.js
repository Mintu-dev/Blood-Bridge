import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Profile() {

   React.useEffect(() => {
        AOS.init({
          duration: 700,  
          once: false        
        });
    
        AOS.refresh();
        
      }, []);

  const [fullname, setFullname] = React.useState("");
  const [myId , setMyId] = React.useState("");
  const [created, setCreated] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [gender, setGender] = React.useState("");

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/profile",
          {
            withCredentials: true,
          }
        );

        setUsername(res.data.user.username);
        setFullname(res.data.user.fullname);

        const createdDate = new Date(res.data.user.createdAt);
        setCreated(createdDate);

        const dobDate = new Date(res.data.user.dob);
        setDob(dobDate);

        setBio(res.data.user.bio);
        setGender(res.data.user.gender);
      } catch (err) {
        console.log("Error", err);
      }
    };
    fetchProfile();
  }, []);

  React.useEffect(() => {
  const getUser = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/v1/user/profile",
      { withCredentials: true }
    );
    setMyId(res.data.user._id);
  };
  getUser();
}, []);

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#ffe6e6,#ff5252)",
        minHeight: "100vh",
      }}
    >
      <div className="container d-flex align-items-center justify-content-center">

        {/* CARD */}
        <div
          className="row mt-5 mb-5"
          data-aos="flip-up"
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "20px",
            backgroundColor: "#D62828",
            boxShadow: "10px 10px 20px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
        >

          {/* HEADER */}
          <div className="col-12 d-flex align-items-center p-4 flex-wrap">

            {/* ICON */}
            <div
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "50%",
                backgroundColor: "#FF8383",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) rotate(10deg)";
                e.currentTarget.style.backgroundColor = "#ff4d4d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                e.currentTarget.style.backgroundColor = "#FF8383";
              }}
            >
              <i className="fa-solid fa-user fs-1"></i>
            </div>

            {/* USER INFO */}
            <div className="ms-3 mt-3 mt-md-0" >
              <h2 style={{ color: "white" }}>{username}</h2>
              <p style={{ color: "#ffe6e6", margin: 0 }}>
                Bio: {bio}
              </p>
            </div>

          </div>

          {/* DETAILS */}
          <div className="row px-3 px-md-4 pb-4">

            {/* LEFT SIDE */}
            <div className="col-md-6" data-aos="fade-right">

              {[
                { label: "Full Name", value: fullname },
                { label: "Username", value: username },
                {
                  label: "Member Since",
                  value: created
                    ? created.toLocaleDateString("en-CA")
                    : "Loading...",
                },
                {
                  label: "Date of Birth",
                  value: dob
                    ? dob.toLocaleDateString("en-CA")
                    : "Loading...",
                },
                { label: "Gender", value: gender },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "10px 15px",
                    marginBottom: "12px",
                    borderRadius: "10px",
                    color: "white",
                    transition: "0.3s",
                    backdropFilter: "blur(5px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(5px)";
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0px)";
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.1)";
                  }}
                >
                  <span style={{ fontSize: "12px", opacity: 0.8 }}>
                    {item.label}
                  </span>
                  <p style={{ margin: 0, fontWeight: "500" }}>
                    {item.value}
                  </p>
                </div>
              ))}

            </div>

            {/* RIGHT SIDE (BUTTONS) */}
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center gap-3 mt-4 mt-md-0" data-aos="fade-left">

              {[
                { text: "Change Password", path: "/changepassword" },
                { text: "Edit Full Name", path: "/editfullname" },
                { text: "Edit Bio", path: "/editbio" },
              ].map((btn, index) => (
                <Link
                  key={index}
                  to={btn.path}
                  style={{
                    textDecoration: "none",
                    padding: "12px 25px",
                    width: "200px",
                    textAlign: "center",
                    background: "white",
                    color: "#D62828",
                    borderRadius: "25px",
                    fontWeight: "600",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.background = "#ffe6e6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "white";
                  }}
                >
                  {btn.text}
                </Link>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}