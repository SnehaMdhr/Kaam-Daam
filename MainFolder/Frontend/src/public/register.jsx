import React from "react";
import "./Register.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";

const Register = () => {
  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <img src={logo} alt="Kaam Daam Logo" />
          <h3>Kaam Daam</h3>
        </div>

        <h2>Welcome!</h2>
        <p className="subtitle">
          Do not have an account? Don’t worry it takes less than a minute to register
        </p>

        <form>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Enter your name" required />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" required />

          <label htmlFor="phone">Phone no:</label>
          <input id="phone" type="text" placeholder="Enter your phone number" required />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter your password" required />

          <button type="submit" className="login-btn">Sign Up</button>
        </form>

        <p className="signup">
          Have an account? <a href="/login">Log In</a>
        </p>

        <div className="divider"><span>OR</span></div>

        <div className="social-icons">
          <a href="#"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>

      <div className="right">
        <img src={bannerImage} alt="Job Illustration" />
      </div>
    </div>
  );
};

export default Register;
