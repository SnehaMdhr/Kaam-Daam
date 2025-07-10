import React from "react";
import "./forget.css";
import forget from "../assets/image/forget.png"; // Adjusted image import

const ResetPassword = () => {
  return (
    <div className="forget-container">
      <div className="forget-left">
        <img src={forget} alt="Looking for a Job" />
      </div>

      <div className="forget-right">
        <h2>Forgot Your Password?</h2>
        <p className="forget-subtitle">
          Reset your password and start again!
        </p>

        <form className="forget-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="E-mail@example.com" required />

          <label htmlFor="phoneno">Phone Number</label>
          <input type="text" id="phoneno" placeholder="Phone Number" required />

          <button type="submit" className="forget-btn">Reset Password</button>
        </form>

        <div className="forget-links">
          <p className="login-text">
            Go Back To <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
