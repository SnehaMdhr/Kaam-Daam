import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import "./headerforemployer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderForEmployer = () => {
  const navigate = useNavigate();
  const [hasUnseen, setHasUnseen] = useState(false);
  const [orgName, setOrgName] = useState("");

  const employerId = localStorage.getItem("userId");

  const goToProfile = () => {
    navigate("/employerviewprofile");
  };

  useEffect(() => {
    if (employerId) {
      // Get unread notifications
      axios
        .get(`http://localhost:5000/api/notifications/${employerId}`)
        .then((res) => {
          const unseen = res.data.some((n) => !n.is_read);
          setHasUnseen(unseen);
        });

      // Get employer's organization name
      axios
        .get(`http://localhost:5000/api/users/${employerId}`)
        .then((res) => {
          if (res.data && res.data.username) {
            setOrgName(res.data.username || "Your Org");
          }
        })
        .catch((err) => {
          console.error("Failed to load employer info", err);
        });
    }
  }, [employerId]);

  return (
    <nav className="topbar">
      <div className="container nav-content">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>Kaam Daam</h3>
        </div>
        <div className="topbar-right">
          <span className="org-name">{orgName || "Your Org"}</span>
          <div
            className="notification-wrapper"
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/employer/notifications")}
          >
            <FaBell className="icon bell-icon" />
            {hasUnseen && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                }}
              ></span>
            )}
          </div>

          <FaUserCircle
            className="icon profile-icon"
            onClick={goToProfile}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default HeaderForEmployer;