import React from 'react'
import './login.css'; 
import logo from "../assets/image/logo.png";
import bannerImage from "../assets/image/bannerImage.png";


const login = () => {
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

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-icons">
          
          <a href="#"><i class="fa-brands fa-google"></i></a>
          <a href="#"><i class="fa-brands fa-facebook"></i></a>
          <a href="#"><i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </div>
  )
}

export default login
