import React from "react";
import "./dashboardWithoutLogin.css"; 
import logo from "../assets/image/logo.png";
import khalti from "../assets/image/khalti.png";
import softwarica from "../assets/image/softwarica.png";        
import esewa from "../assets/image/esewa.png";
import kantipur from "../assets/image/kantipur.png";    
import uk from "../assets/image/uk.png";
import browse from "../assets/image/browse.png";        
import apply from "../assets/image/apply.png";
import getpaid from "../assets/image/getpaid.png";
import tech from "../assets/image/tech.png";
import design from "../assets/image/design.png";    
import writing from "../assets/image/writing.png";
import marketing from "../assets/image/marketing.png";
import video from "../assets/image/video.png";
import education from "../assets/image/education.png";
import sales from "../assets/image/sales.png";
import customer from "../assets/image/customer.png";
import skills from "../assets/image/skills.png";
import event from "../assets/image/event.png";
import sneha from "../assets/image/sneha.png";
import anjali from "../assets/image/anjali.png";
import apala from "../assets/image/apala.png";
import kimti from "../assets/image/kimti.png";   
import pic from "../assets/image/1.png";   

const KaamDaamHomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h3>Kaam Daam</h3>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Help</li>
              <li>Contact</li>
            </ul>
            <button className="login-btn">Login/Signup</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay" style={{ backgroundImage: `url(${pic})` }}>
          <div className="hero-content">
            <h1>Your Career Deserves a Kick-start</h1>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button className="search-btn">Find Your First Job Now</button>
            </div>
            <div className="cta-buttons">
              <button className="student-btn">For Students</button>
              <button className="company-btn">For Companies</button>
            </div>
            </div>
          </div>
      </header>

      {/* Hiring Companies */}
      <section className="companies container">
        <h3>Our Top Hiring Companies</h3>
        <div className="company-grid">
          <div className="company-card">
            <img src={khalti} alt="khalti" />
            <p>Khalti</p>
          </div>
          <div className="company-card">
            <img src={softwarica} alt="softwarica" />
            <p>Softwarica College</p>
          </div>
          <div className="company-card">
            <img src={esewa} alt="esewa" />
            <p>Esewa</p>
          </div>
          <div className="company-card">
            <img src={kantipur} alt="kantipur" />
            <p>Kantipur TV</p>
          </div>
          <div className="company-card">
            <img src={uk} alt="uk" />
            <p>UK Colleges</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h3>How Kaam Daam Helps You Find Jobs In Nepal</h3>
        <div className="cards">
          <div className="card">
            <img src={browse} alt="browse" />
            <h3>Browse Jobs</h3>
            <p>Explore a wide range of beginner-friendly IT projects.</p>
          </div>
          <div className="card">
            <img src={apply} alt="apply" />
            <h3>Apply & Work</h3>
            <p>Submit proposals, collaborate with clients, and complete projects.</p>
          </div>
          <div className="card">
            <img src={getpaid} alt="getpaid" />
            <h3>Get Paid</h3>
            <p>Receive secure and timely payments for your work.</p>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="jobs container">
        <h3>Explore Job Categories</h3>
        <div className="job-list">
  <div className="job-card">
    <img src={tech} alt="tech" />
    <p>Technology & IT</p>
  </div>
  <div className="job-card">
    <img src={design} alt="design" />
    <p>Design & Creativity</p>
  </div>
  <div className="job-card">
    <img src={writing} alt="writing" />
    <p>Writing & Content Creation</p>
  </div>
  <div className="job-card">
    <img src={marketing} alt="marketing" />
    <p>Digital Marketing</p>
  </div>
  <div className="job-card">
    <img src={video} alt="video" />
    <p>Video & Photography</p>
  </div>
  <div className="job-card">
    <img src={education} alt="education" />
    <p>Education & Tutoring</p>
  </div>
  <div className="job-card">
    <img src={sales} alt="sales" />
    <p>Sales & Marketing</p>
  </div>
  <div className="job-card">
    <img src={customer} alt="customer" />
    <p>Customer Support</p>
  </div>
  <div className="job-card">
    <img src={skills} alt="skills" />
    <p>Skills Showcase</p>
  </div>
  <div className="job-card">
    <img src={event} alt="event" />
    <p>Lifestyle & Event</p>
  </div>
</div>

      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h3>Student Success Stories</h3>
        <div className="story-cards">
  <div className="story-card">
    <img src={sneha} alt="sneha" />
    <h3>Sneha’s Journey</h3>
    <p>
      Sarah, a computer science student, landed her first web development project through KaamDaam. She gained valuable experience and built a strong portfolio.
    </p>
  </div>
  <div className="story-card">
    <img src={anjali} alt="anjali" />
    <h3>Anjali’s Breakthrough</h3>
    <p>
      Sarah, a computer science student, landed her first web development project through KaamDaam. She gained valuable experience and built a strong portfolio.
    </p>
  </div>
  <div className="story-card">
    <img src={apala} alt="apala" />
    <h3>Apala’s Triumph</h3>
    <p>
      Sarah, a computer science student, landed her first web development project through KaamDaam. She gained valuable experience and built a strong portfolio.
    </p>
  </div>
  <div className="story-card">
    <img src={kimti} alt="kimti" />
    <h3>Kimti’s Journey</h3>
    <p>
      Sarah, a computer science student, landed her first web development project through KaamDaam. She gained valuable experience and built a strong portfolio.
    </p>
  </div>
</div>

      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Launch Your Freelancing Career?</h2>
        <p>Join KaamDaam today and start your journey as a freelance professional.</p>
        <a href="#" className="cta-button">Get Started</a>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <p className="copyright">
          ©2024 KaamDaam. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default KaamDaamHomePage;
