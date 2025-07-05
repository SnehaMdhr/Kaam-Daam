import React, { useState } from "react";
import "./Register.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [role, setRole] = useState('');
  const [password, setPassword] = useState(''); 

  const handleSubmit = async(e) => {
    e.preventDefault();

  const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, email, phone, role, password})
    })
    const data = await response.json();
    console.log(data);

    if (response.ok){
      console.log("Registration Sucessful");
      alert("Registration Sucessful! Redirecting to login page...");
      window.location.href = "/login";
    } else {
      console.error("Registration Failed");
      alert(data.message || "Registration failed. Please try again.");
    }

  }

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

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="phone">Phone no:</label>
          <input id="phone" type="text" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

           <div className="radio-group">
            <label>Role:</label>
            <div className="radio-options">
              <label>
                <input type="radio" name="role" value="job_seeker" checked = {role === "job_seeker"} onChange={(e) => setRole(e.target.value)} required />
                Job Seeker
              </label>
              <label>
                <input type="radio" name="role" value="recruiter" checked = {role === "recruiter"} onChange={(e) => setRole(e.target.value)} />
                Recruiter
              </label>
            </div>
          </div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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
