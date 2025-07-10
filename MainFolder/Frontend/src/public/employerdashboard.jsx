import React from 'react';
import './employerdashboard.css';
import { FaSearch, FaStar, FaRegClock, FaRegFileAlt } from 'react-icons/fa';
import girl from '../assets/image/employerdashboard.png';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';

const Employerdashboard = () => {
  return (
    <div>
      <HeaderForEmployer />

      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard-content">
          {/* Top Search Bar */}
          <div className="dashboard-header">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="find-btn">Find Employee</button>
          </div>

          <div className="dashboard-body">
            {/* Left Side */}
            <div className="dashboard-main">
              {/* Profile Card */}
              <div className="profile-card">
                <div className="profile-info">
                  <h2>Softwarica College</h2>
                  <p>IT & E-Commerce</p>
                  <strong>Are you looking for employees?</strong>
                </div>
                <img src={girl} alt="student" className="profile-img" />
              </div>

              {/* Category Cards */}
              <div className="category-boxes">
                <div className="category-card">Video & Photography</div>
                <div className="category-card">Video & Photography</div>
                <div className="category-card">Video & Photography</div>
                <div className="category-card">Video & Photography</div>
                <div className="category-card">Video & Photography</div>
              </div>

              {/* Ratings & Reminders Side-by-side */}
              <div className="cards-row">
                {/* Ratings Card */}
                <div className="ratings-card">
                  <h4>Ratings & Reviews</h4>
                  <p className="rating"><FaStar color="#FFD700" /> 4.7 – 125 reviews</p>
                  <ul className="stars-breakdown">
                    <li>5 ★ <div className="bar" style={{ width: '50%' }}></div></li>
                    <li>4 ★ <div className="bar" style={{ width: '30%' }}></div></li>
                    <li>3 ★ <div className="bar" style={{ width: '10%' }}></div></li>
                    <li>2 ★ <div className="bar" style={{ width: '5%' }}></div></li>
                    <li>1 ★ <div className="bar" style={{ width: '5%' }}></div></li>
                  </ul>
                </div>

                {/* Reminders Card */}
                <div className="reminders-card">
                  <h4>Reminders</h4>
                  <ul>
                    <li><FaRegClock /> Interview with Ethan Harper</li>
                    <li><FaRegClock /> Review 5 new applications</li>
                    <li><FaRegFileAlt /> Job Posting: Junior Developer</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="dashboard-sidebar">
              <h3>Notifications</h3>
              <p><strong>New Application:</strong> Owen Bennett</p>
              <p><strong>Status Update:</strong> Chloe Harris</p>
              <p><strong>New Message:</strong> Liam Carter</p>

              <h3>New Applicants</h3>
              <div className="applicant-card">
                <strong>Liam Harper</strong>
                <p>Junior Web Developer</p>
              </div>
              <div className="applicant-card">
                <strong>Olivia Bennett</strong>
                <p>Entry-Level Data Analyst</p>
              </div>
              <div className="applicant-card">
                <strong>Noah Foster</strong>
                <p>IT Support Specialist</p>
              </div>
              <div className="applicant-card">
                <strong>Olivia Bennett</strong>
                <p>Entry-Level Data Analyst</p>
              </div>
              <div className="applicant-card">
                <strong>Noah Foster</strong>
                <p>IT Support Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employerdashboard;
