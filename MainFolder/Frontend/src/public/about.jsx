import React from "react";
import "./about.css";
import Header from "../components/Header";
import Footer from "../components/footer";

// Import images from assets folder
import groupImage from "../assets/image/Group 30.png";
import colabImage from "../assets/image/colab 1.png";
import apalaImg from "../assets/image/apala.png";
import anjaliImg from "../assets/image/anjali.png";
import snehaImg from "../assets/image/sneha.png";
import kimtiImg from "../assets/image/kimti.png";

const About = () => {
  return (
    <>
      <Header />
      <div className="hero">
        <section className="about-section">
          {/* Hero Title */}
          <div className="intro">
            <div className="text-block">
              <p className="tag">About Us</p>
              <h1>
                STARTED IN 2025
                <br />
                <span className="highlight">KAAM DAAM</span>
              </h1>
              <h3>Our Story</h3>
              <p className="desc">
                KaamDaam was born from a simple yet powerful idea: to provide IT
                students with hands-on experience and connect them with companies
                seeking digital solutions. We understand the challenge of breaking
                into the industry without experience, so we created a bridge.
                Today, KaamDaam continues to empower students with opportunities,
                guidance, and confidence.
              </p>
            </div>
            <div className="image-block">
              <img src={groupImage} alt="students working" />
            </div>
          </div>

          {/* Our Values */}
          <div className="section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card light">
                <h4>Community</h4>
                <p>We believe in building strong, supportive student communities.</p>
              </div>
              <div className="value-card light">
                <h4>Continuous Growth</h4>
                <p>Always learning. Always improving. Always evolving.</p>
              </div>
              <div className="value-image">
                <img src={colabImage} alt="hands together" />
              </div>
              <div className="value-card white">
                <h4>Integrity</h4>
                <p>We operate with full transparency and ethical practices.</p>
              </div>
              <div className="value-card white">
                <h4>Collaboration</h4>
                <p>
                  Success comes from working together—students, mentors, companies.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="section benefits">
            <div className="benefit-box students">
              <h3>Benefits for Students</h3>
              <ul>
                <li>
                  <strong>Real-World Experience</strong>
                  <br />
                  Work with actual companies on real projects.
                </li>
                <li>
                  <strong>Portfolio Building</strong>
                  <br />
                  Showcase your work to stand out in the job market.
                </li>
                <li>
                  <strong>Career Advancement</strong>
                  <br />
                  Gain skills and confidence to grow in your career.
                </li>
              </ul>
            </div>
            <div className="benefit-box companies">
              <h3>Benefits for Companies</h3>
              <ul>
                <li>
                  <strong>Access to Talent</strong>
                  <br />
                  Engage with the next generation of tech professionals.
                </li>
                <li>
                  <strong>Innovative Solutions</strong>
                  <br />
                  Receive fresh, innovative perspectives and work.
                </li>
                <li>
                  <strong>Cost Effective</strong>
                  <br />
                  Get affordable solutions while providing learning opportunities.
                </li>
              </ul>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="section">
            <h2>Meet the Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <img src={apalaImg} alt="Apsa Lama" />
                <p>
                  <strong>Apsa Lama</strong>
                  <br />
                  Frontend Developer
                </p>
              </div>
              <div className="team-member">
                <img src={anjaliImg} alt="Kiran Ghimire" />
                <p>
                  <strong>Kiran Ghimire</strong>
                  <br />
                  UI/UX Designer
                </p>
              </div>
              <div className="team-member">
                <img src={snehaImg} alt="Esmita Maharjan" />
                <p>
                  <strong>Esmita Maharjan</strong>
                  <br />
                  Project Manager
                </p>
              </div>
              <div className="team-member">
                <img src={kimtiImg} alt="Saraswati" />
                <p>
                  <strong>Saraswati</strong>
                  <br />
                  Backend Developer
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
