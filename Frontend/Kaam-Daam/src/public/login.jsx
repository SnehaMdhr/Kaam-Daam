import React from "react";
import "./Login.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";

const Login = () => {
  return (
    <div className="container">
      <div className="left">
        <img src={bannerImage} alt="Job Illustration" />
      </div>
      <div className="right">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h3>Kaam Daam</h3>
        </div>
        <h2>Welcome Back!</h2>
        <p className="subtitle">Please enter your detail</p>

        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          <div className="forgot">
            <a href="#">Forget Password</a>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="signup">
          Do not have account? <a href="/register">Sign Up</a>
        </p>

        <div className="divider"><span>OR</span></div>

        <div className="social-icons">
          <a href="#"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
