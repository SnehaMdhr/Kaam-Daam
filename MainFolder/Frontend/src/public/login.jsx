import React, { useState } from "react";
import "./Login.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import jobImage from "../assets/image/job.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);

        toast.success("Login Successful! Redirecting...");

        setTimeout(() => {
          if (!data.user.role) {
            window.location.href = "/role-selection";
          } else if (data.user.role === "job_seeker") {
            window.location.href = "/studentdashboard";
          } else if (data.user.role === "recruiter") {
            window.location.href = "/employerdashboard";
          }
        }, 2000);
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

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

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="login-links">
          <a href="/forget" className="forgot-link">Forgot password?</a>
          <p className="signup-text">
            Don’t have an account? <a href="/register">Register Now</a>
          </p>
        </div>

        <div className="login-divider"><span>OR</span></div>

        <div className="social-icons">
          <a href="http://localhost:5000/auth/google"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
        </div>
      </div>

      {/* ✅ Toast container for feedback messages */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
