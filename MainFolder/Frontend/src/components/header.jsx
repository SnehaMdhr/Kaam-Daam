import React from "react";
import logo from "../assets/image/logo.png";
import "./header.css"; // Assuming you have a CSS file for styling
const Header = () => (
  <nav className="navbar">
    <div className="container nav-content">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h3>Kaam Daam</h3>
      </div>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="/dashboardWithout">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/service">Service</a></li>
          <li><a href="/help">Help</a></li>
          <li><a href="/contract">Contact</a></li>
        </ul>
        <a href="/login">
          <button className="login-btn">Login/Signup</button>
        </a>
      </div>
    </div>
  </nav>
);

export default Header;