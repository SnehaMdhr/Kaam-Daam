import React, { useState } from "react";
import "./Login.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";

const Login = () => {

  const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

  const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    });

    const  data = await response.json();
    console.log(data); 

    localStorage.setItem("token", data.token);
    if(data.token){
      console.log("Login Sucessful");
      window.location.href = "/dashboard";
    } else {
      console.error("Login Failed");
      alert("Login Failed: " + data.message);
    }

  }
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

        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <div className="forgot">
            <a href="/forget">Forget Password</a>
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
