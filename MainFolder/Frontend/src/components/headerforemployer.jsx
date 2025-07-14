import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import "./headerforemployer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderForEmployer = () => {
  const navigate = useNavigate();
  const [hasUnseen, setHasUnseen] = useState(false);
  const employerId = localStorage.getItem("userId");

  const goToProfile = () => {
    navigate("/employerviewprofile");
  };

  // 🔁 Check if employer has unseen notifications
  useEffect(() => {
    if (employerId) {
      axios
        .get(`http://localhost:5000/api/notifications/${employerId}`)
        .then((res) => {
          const unseen = res.data.some((n) => !n.is_read);
          setHasUnseen(unseen);
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
          <span className="org-name">Softwarica</span>

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