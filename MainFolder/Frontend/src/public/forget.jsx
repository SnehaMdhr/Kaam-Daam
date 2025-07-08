import React from "react";
import "./forget.css";
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";

const ResetPassword = () => {
  return (
    <div className="container">
      <div className="img">
       <img src={bannerImage} alt="Job Illustration" />
        <div className="form-box">
          <div className="logo">
           <img src={logo} alt="Kaam Daam Logo" />
            <h3>Kaam Daam</h3>
          </div>
          <h2>Reset Password</h2>
          <form>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
//  woowww