import React from "react";
import "./searchjob.css";
import logo from "../assets/image/logo.png"; 
import jobsImage from "../assets/image/jobs.png"; // Assuming jobs.png is in the same directory

const JobSearch = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h3>Kaam Daam</h3>
          </div>
          <div className="nav-right">
           <ul className="nav-links">
              <li><a href="/dashboardWithout">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/service">Service</a></li>
              <li><a href="/help">Help</a></li>
              <li><a href="/contract">Contact</a></li>
            </ul>
            <button className="login-btn">Login/Signup</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn">Find Your First Job Now</button>
        </div>
      </header>

      {/* Job Section */}
      <div className="jobs">
        <h2>Popular Jobs For Marketing</h2>
      </div>

      <div className="jobcolor">
        <div className="job-list">
          <div className="job-list">
  <div className="job-card">
    <div className="job-info">
      <span className="job-type">Part-time</span>
      <h3>UI/UX designer needed for Learnmates</h3>
      <p>Develop and maintain web applications for a growing startup.</p>
      <a href="#" className="apply-btn">Apply Now</a>
    </div>
    <div className="job-image">
      <img src={jobsImage} alt="Job" />
    </div>
  </div>

  <div className="job-card">
    <div className="job-info">
      <span className="job-type">Part-time</span>
      <h3>UI/UX designer needed for Learnmates</h3>
      <p>Develop and maintain web applications for a growing startup.</p>
      <a href="#" className="apply-btn">Apply Now</a>
    </div>
    <div className="job-image">
      <img src={jobsImage} alt="Job" />
    </div>
  </div>

  <div className="job-card">
    <div className="job-info">
      <span className="job-type">Part-time</span>
      <h3>UI/UX designer needed for Learnmates</h3>
      <p>Develop and maintain web applications for a growing startup.</p>
      <a href="#" className="apply-btn">Apply Now</a>
    </div>
    <div className="job-image">
      <img src={jobsImage} alt="Job" />
    </div>
  </div>

  <div className="job-card">
    <div className="job-info">
      <span className="job-type">Part-time</span>
      <h3>UI/UX designer needed for Learnmates</h3>
      <p>Develop and maintain web applications for a growing startup.</p>
      <a href="#" className="apply-btn">Apply Now</a>
    </div>
    <div className="job-image">
      <img src={jobsImage} alt="Job" />
    </div>
  </div>
</div>

        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <details>
          <summary>How does the platform work?</summary>
          <p>Our platform connects freelancers with clients through curated job listings and project matching tools.</p>
        </details>
        <details>
          <summary>What types of jobs are available?</summary>
          <p>We offer freelance, part-time, and full-time roles across marketing, design, development, and more.</p>
        </details>
        <details>
          <summary>How do I get started?</summary>
          <p>Simply sign up, complete your profile, and start applying to available jobs that fit your skills.</p>
        </details>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section">
        <h3>Feedback</h3>
        <textarea placeholder="Write your feedback here..." />
        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>
      </section>

      {/* CTA Section */}
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
        <p className="copyright">©2024 KaamDaam. All rights reserved.</p>
      </footer>
    </>
  );
};

export default JobSearch;
