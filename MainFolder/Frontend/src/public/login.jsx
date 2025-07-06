import React from "react";
import "./Login.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import jobImage from "../assets/image/job.png"; // Use the correct path to your image

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src={jobImage} alt="Looking for a Job" />
      </div>

      <div className="login-right">
        <h2>Welcome back to Kaam Daam</h2>
        <p className="login-subtitle">
          Login with your registered Email &amp; Password
        </p>

        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="E-mail@example.com" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" required />

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="login-links">
          <a href="/forget" className="forgot-link">Forgot password?</a>
          <p className="signup-text">
            Don’t have an account? <a href="/register">Register Now</a>
          </p>
        </div>

        <div className="login-divider"><span>OR</span></div>

        <div className="login-socials">
          <a href="#"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
        </div>
      </div>
    </div>
  );
};

export default Login;
