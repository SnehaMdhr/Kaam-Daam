import React from 'react';
import { FaTachometerAlt, FaSuitcase, FaUsers, FaEnvelope, FaBuilding, FaChartBar, FaCog } from 'react-icons/fa';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './settingemployer.css';
const SettingEmployer = () => {
  return (
    <div>
      <HeaderForEmployer />

      <div className="settings-container">
        
        <Sidebar/>
        <div className="settings-main">
          <h1>Settings</h1>

          {/* Account Information */}
          <section className="settings-section">
            <h3>Account Information</h3>
            <div className="form-group">
              <label htmlFor="company-name">Company Name</label>
              <input type="text" id="company-name" placeholder="Company Name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Contact Email</label>
              <input type="email" id="contact-email" placeholder="Contact Email" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-person">Primary Contact Person</label>
              <input type="text" id="contact-person" placeholder="Primary Contact Person" />
            </div>
            <div className="button-wrapper">
    <button>Update Account</button>
  </div>
          </section>

          {/* Security */}
          <section className="settings-section">
            <h3>Security</h3>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input type="password" id="current-password" placeholder="Current Password" />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input type="password" id="new-password" placeholder="New Password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm New Password" />
            </div>
            <p className="password-note">
              Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
            </p>
            <div className="button-wrapper">
    <button>Change Password</button>
  </div>
          </section>

          {/* Notifications */}
          <section className="settings-section">
            <h3>Notifications</h3>
            <div className="form-group">
              <label><input type="checkbox" /> New Applications: Receive email notifications when new applications are submitted for your job postings.</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" /> Messages: Get notified when you receive new messages from applicants or platform support.</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" /> Platform Updates: Stay informed about new features, updates, and important announcements from KaamDaam.</label>
            </div>
            <div className="button-wrapper">
    <button>Update Notification</button>
  </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingEmployer;
