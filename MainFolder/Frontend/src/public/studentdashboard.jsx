import React from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import { FaSearch, FaRegClock, FaRegFileAlt } from 'react-icons/fa';
import studentImg from '../assets/image/kimti.png'; 
import { Link } from 'react-router-dom';
import './studentdashboard.css'; // Assuming you have some styles for this component
const studentdashboard = () => {
  return (
    <div>
      <div>
      <Header />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          {/* Top Search Bar */}
          <div className="dashboard-header">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search jobs, companies..." />
            </div>
            <Link to="/studentjobs" className="button-link">Browse Jobs</Link>
          </div>

          <div className="dashboard-body">
            {/* Left Side */}
            <div className="dashboard-main">
              {/* Welcome Card */}
              <div className="profile-card">
                <div className="profile-info">
                  <h2>Welcome, Kimti 👋</h2>
                  <p>Your career journey starts here.</p>
                  <strong>Find jobs that match your skills!</strong>
                </div>
                <img src={studentImg} alt="student" className="profile-img" />
              </div>

              {/* Quick Access Cards */}
              <div className="category-boxes">
                <div className="job-card">
                  <FaRegFileAlt size={30} />
                  <p>Applied Jobs</p>
                </div>
                <div className="job-card">
                  <FaRegClock size={30} />
                  <p>Saved Jobs</p>
                </div>
                <div className="job-card">
                  <FaSearch size={30} />
                  <p>Job Recommendations</p>
                </div>
              </div>

              {/* Resume Stats or Skills */}
              <div className="cards-row">
                <div className="ratings-card">
                  <h4>Profile Strength</h4>
                  <p className="rating">85% Completed</p>
                  <ul className="stars-breakdown">
                    <li>Resume <div className="bar" style={{ width: '80%' }}></div></li>
                    <li>Skills <div className="bar" style={{ width: '90%' }}></div></li>
                    <li>Experience <div className="bar" style={{ width: '70%' }}></div></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-sidebar">
              <h3>Notifications</h3>
              <p><strong>New Job Match:</strong> Junior Developer at DHI</p>
              <p><strong>Interview Invite:</strong> Softwarica College</p>
              <p><strong>Message:</strong> HR from Codemate</p>

              <h3>Upcoming Deadlines</h3>
              <div className="applicant-card">
                <strong>Frontend Intern – Apply by Aug 20</strong>
                <p>Dursikshya Tech</p>
              </div>
              <div className="applicant-card">
                <strong>Marketing Trainee – Apply by Aug 18</strong>
                <p>Digital Gurkha</p>
              </div>
              <div className="applicant-card">
                <strong>IT Assistant – Apply by Aug 25</strong>
                <p>CodeLogic Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default studentdashboard;
