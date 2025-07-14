import React from "react";
import {
  FaHome,
  FaSuitcase,
  FaUsers,
  FaEnvelope,
  FaBuilding,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import "./sidebar.css"; // Assuming you have a CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="/employerdashboard">
            <FaHome className="icon" /> Dashboard
          </a>
        </li>
        <li>
          <a href="/employerjobposting">
            <FaSuitcase className="icon" /> Job Postings
          </a>
        </li>
        <li>
          <a href="/empoyerjobapplicationmanagement">
            <FaUsers className="icon" /> Applicant Management
          </a>
        </li>
        <li>
          <a href="/employer/messages">
            <FaEnvelope className="icon" /> Messaging
          </a>
        </li>

        <li>
          <a href="/employercompanyprofile">
            <FaBuilding className="icon" /> Company Profile
          </a>
        </li>
        <li>
          <a href="/employeranalytics">
            <FaChartBar className="icon" /> Analytics
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="/settingemployer">
          <FaCog className="icon" /> Settings
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
