import React from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import jobbanner from "../assets/image/jobs.png";
import "./studentviewjobs.css";
const studentviewjob = () => {
  return (
    <div>
      <Header />
      <div className="job-details-container">
        <Sidebar />
        <nav className="breadcrumb">Browse / Job Details</nav>

        <h1 className="job-title">Junior Web Developer</h1>
        <p className="posted-by">Posted 2 days ago by Tech Solutions Inc.</p>

        <img className="job-banner" src={jobbanner} alt="Job Banner" />

        <section className="job-section">
          <h2>Job Description</h2>
          <p>
            We are seeking a motivated Junior Web Developer to join our team.
            This role is ideal for a recent graduate or someone with 1–2 years
            of experience in web development. You will be working on a variety
            of projects, including website development, e-commerce platforms,
            and web applications.
          </p>
          <p>
            Your responsibilities will include writing clean, efficient, and
            well-documented code, collaborating with senior developers, and
            participating in code reviews.
          </p>
          <p>
            You should have a strong understanding of HTML, CSS, and JavaScript,
            as well as experience with modern web frameworks like React or
            Angular. Familiarity with Git and agile development is a plus.
          </p>
          <p>
            We offer a supportive and collaborative work environment with
            opportunities for professional growth and development.
          </p>
        </section>

        <section className="job-section">
          <h2>Skills Required</h2>
          <div className="skills-list">
            <span className="skill-tag">HTML</span>
            <span className="skill-tag">CSS</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Git</span>
          </div>
        </section>

        <section className="job-section">
          <h2>Payment</h2>
          <p>$20 – $25 per hour</p>
        </section>

        <section className="job-section">
          <h2>Project Duration</h2>
          <p>3 months (with potential for extension)</p>
        </section>

        <div className="apply-button-wrapper">
          <button className="apply-button">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default studentviewjob;
