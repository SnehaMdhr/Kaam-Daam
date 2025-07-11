import React from 'react'
import {
  FaHome,
  FaSuitcase,
  FaUsers,
  FaEnvelope,
  FaBuilding,
  FaChartBar,
  FaCog
} from 'react-icons/fa';
import './sidebar.css';

const sidebarstudent = () => {
  return (
    <div className="sidebar">
          <ul>
            <li><a href="/studentdashboard"><FaHome className="icon" /> Dashboard</a></li>
            <li><a href="/studentjobs"><FaSuitcase className="icon" /> Jobs</a></li>
            <li><a href="/studentreview"><FaUsers className="icon" /> Review</a></li>
            <li><a href="/studentmessage"><FaEnvelope className="icon" /> Messaging</a></li>
            <li><a href="/studentprofile"><FaBuilding className="icon" />Profile</a></li>
            <li><a href="/studentmyapplication"><FaChartBar className="icon" /> My application</a></li>
          </ul>
          <div className="sidebar-footer">
            <a href="/studentsetting"><FaCog className="icon" /> Settings</a>
          </div>
        </div>
  )
}

export default sidebarstudent
