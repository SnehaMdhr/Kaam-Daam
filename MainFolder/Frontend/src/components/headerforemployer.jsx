import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import "./headerforemployer.css";

const HeaderForEmployer = () => (
  <nav className="topbar">
    <div className="container nav-content">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>Kaam Daam</h3>
      </div>
      <div className="topbar-right">
        <span className="org-name">Softwarica</span>
        <FaBell className="icon bell-icon" />
        <FaUserCircle className="icon profile-icon" />
      </div>
    </div>
  </nav>
);

export default HeaderForEmployer;
