import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import "./headerforstudent.css";
import { useNavigate } from "react-router-dom";

const HeaderForStudent = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/studentviewprofile/:id"); // Replace ':id' with actual user ID if needed
  };

  return (
    <nav className="topbar">
      <div className="container nav-content">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h3>Kaam Daam</h3>
        </div>
        <div className="topbar-right">
          <FaBell className="icon bell-icon" />
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

export default HeaderForStudent;
