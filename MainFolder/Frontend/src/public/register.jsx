import React from "react";
import "./Register.css";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import registered from "../assets/image/register.png"; // Replace with your actual image path

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-left">
        <h2>Register to Kaam Daam</h2>
        <p className="subtitle">Start your first career job now</p>

        <form className="register-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="E-mail@example.com"
            required
          />

          


          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter your phone number"
            required
          />
          <div className="radio-group">
            <label>Role:</label>
            <div className="radio-options">
              <label>
                <input type="radio" name="role" value="jobseeker" required />
                Job Seeker
              </label>
              <label>
                <input type="radio" name="role" value="recruiter" />
                Recruiter
              </label>
            </div>
          </div>
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Sign In Now</a>
        </p>

        <div className="social-auth">
          <a href="#"><FaGoogle /></a>
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
