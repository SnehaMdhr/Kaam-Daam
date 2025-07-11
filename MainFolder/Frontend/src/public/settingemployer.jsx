import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { FaTachometerAlt, FaSuitcase, FaUsers, FaEnvelope, FaBuilding, FaChartBar, FaCog } from 'react-icons/fa';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './settingemployer.css';
const SettingEmployer = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const userId = localStorage.getItem('userId'); // must be saved during login

  // Fetch user data on page load
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error('Failed to load settlings', err));
    }
  }, [userId]);

  // Handle input changes
  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile update
  const handleUpdate = () => {
    axios.put(`http://localhost:5000/api/users/${userId}`, user)
      .then(() => alert('Settings updated!'))
      .catch((err) => console.error('Update failed', err));
  };
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
              <input type="text" name="username" value={user.username} onChange={handleChange} id="company-name" placeholder="Company Name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Contact Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} id="contact-email" placeholder="Contact Email" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-person">Primary Contact Person</label>
              <input type="text" id="contact-person" placeholder="Primary Contact Person" />
            </div>
            <div className="button-wrapper">
    <button onClick={handleUpdate}>Update Account</button>
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
