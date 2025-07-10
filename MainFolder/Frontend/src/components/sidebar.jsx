import React from 'react'
import { FaHome, FaSuitcase, FaUsers, FaEnvelope, FaBuilding, FaChartBar, FaCog } from 'react-icons/fa';

const sidebar = () => {
  return (
    <div>
      <div className="sidebar">
          <ul>
            <li><a href="#"><FaHome className="icon" /> Dashboard</a></li>
            <li><a href="#"><FaSuitcase className="icon" /> Job Postings</a></li>
            <li><a href="#"><FaUsers className="icon" /> Applicant Management</a></li>
            <li><a href="#"><FaEnvelope className="icon" /> Messaging</a></li>
            <li><a href="#"><FaBuilding className="icon" /> Company Profile</a></li>
            <li><a href="#"><FaChartBar className="icon" /> Analytics</a></li>
          </ul>
          <div className="sidebar-footer">
            <a href="#"><FaCog className="icon" /> Settings</a>
          </div>
        </div>
    </div>
  )
}

export default sidebar
