import React, { useState } from "react";
import "./Register.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import registered from "../assets/image/register.png";
import logo from "../assets/image/logo.png";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, phone, role, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert("Registration Successful! Redirecting to login page...");
      window.location.href = "/login";
    } else {
      alert(data.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="logo">
          <img src={logo} alt="Kaam Daam Logo" />
          <h3>Kaam Daam</h3>
        </div>

        <h2>Register to Kaam Daam</h2>
        <p className="subtitle">
          Start your first career job now.
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPhone(value);
            }}
            required
          />

          <div className="radio-group">
            <label>Role:</label>
            <div className="radio-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={role === "job_seeker"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                Job Seeker
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === "recruiter"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Recruiter
              </label>
            </div>
          </div>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Log In Now</a>
        </p>

        <div className="social-auth">
          <a href="http://localhost:5000/auth/google"><FaGoogle /></a>
          <a href="#"><FaFacebook /></a>
        </div>
      </div>

      <div className="register-right">
        <img src={registered} alt="Registration Illustration" />
      </div>
    </div>
  );
};

export default Register;
