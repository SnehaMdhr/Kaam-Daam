import React from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import img from "../assets/image/jobs.png";
import "./studentjobs.css";
const jobs = () => {
  return (
    <div>
      <Header />
      <div className="job-listings">
        <Sidebar />
        <h2>Job Listings</h2>
        <p>Explore opportunities tailored for beginner IT students.</p>

        <div className="filters">
          <button>Category</button>
          <button>Skill Level</button>
          <button>Duration</button>
          <button>Sort By</button>
        </div>

        <div className="job-cards">
          {/* Job 1 */}
          <div className="job-card">
            <div className="job-content">
              <h3>Develop a Simple Portfolio Website</h3>
              <p>
                Create a basic portfolio website to showcase your projects and
                skills. This project is ideal for beginners looking to gain
                experience with HTML, CSS, and JavaScript.
              </p>
              <a href="/studentviewjob">
                <button className="view-job-btn">View Job</button>
              </a>
            </div>
            <img src={img} alt="Portfolio Website" />
          </div>

          {/* Job 2 */}
          <div className="job-card">
            <div className="job-content">
              <h3>Design a Landing Page for a Startup</h3>
              <p>
                Design a visually appealing landing page for a new startup. This
                project requires basic knowledge of UI/UX design principles and
                tools like Figma or Adobe XD.
              </p>
              <a href="/studentviewjob">
                <button className="view-job-btn">View Job</button>
              </a>
            </div>
            <img src={img} alt="Landing Page" />
          </div>

          {/* Job 3 */}
          <div className="job-card">
            <div className="job-content">
              <h3>Build a Responsive Blog Template</h3>
              <p>
                Develop a responsive blog template that can be easily
                customized. This project is suitable for students familiar with
                front-end development and responsive design techniques.
              </p>
              <a href="/studentviewjob">
                <button className="view-job-btn">View Job</button>
              </a>
            </div>
            <img src={img} alt="Blog Template" />
          </div>

          {/* Job 4 */}
          <div className="job-card">
            <div className="job-content">
              <h3>Create a Mobile App Prototype</h3>
              <p>
                Design a prototype for a mobile application with basic
                functionality. This project is perfect for beginners interested
                in mobile app development and UI/UX design.
              </p>
              <a href="/studentviewjob">
                <button className="view-job-btn">View Job</button>
              </a>
            </div>
            <img src={img} alt="Mobile App Prototype" />
          </div>

          {/* Job 5 */}
          <div className="job-card">
            <div className="job-content">
              <h3>Set Up a Basic E-commerce Store</h3>
              <p>
                Configure a simple e-commerce store using platforms like Shopify
                or WooCommerce. This project is ideal for students learning
                about e-commerce and online retail.
              </p>
              <a href="/studentviewjob">
                <button className="view-job-btn">View Job</button>
              </a>
            </div>
            <img src={img} alt="E-commerce Store" />
          </div>
        </div>

        <div className="pagination">
          <span className="page">&lt;</span>
          <span className="page active">1</span>
          <span className="page">2</span>
          <span className="page">3</span>
          <span className="page">4</span>
          <span className="page">5</span>
          <span className="page">&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default jobs;
