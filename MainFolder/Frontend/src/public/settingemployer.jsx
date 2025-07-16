import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './settingemployer.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingEmployer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error('Failed to load settings', err);
          toast.error('Failed to load user settings');
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('phone', user.phone);

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Settings updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      toast.error('Failed to update settings');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <HeaderForEmployer />
      <div className="settings-container">
        <Sidebar />
        <div className="settings-main">
          <h1>Settings</h1>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>

        {/* Account Info */}
        <div className="settings-section">
          <h3>Account Information</h3>
          <div className="form-group">
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              id="company-name"
              placeholder="Company Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Contact Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              id="contact-email"
              placeholder="Contact Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              id="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="button-wrapper">
            <button onClick={handleUpdate}>Update Account</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="form-group">
            <label>
              <input type="checkbox" />
              Job Alerts: Get notified when new job opportunities matching your interests are posted.
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" />
              Message Notifications: Receive alerts when employers respond to your applications or messages.
            </label>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" />
              Stay informed about new features, tips, and announcements from Kaam Daam to enhance your job search experience.
            </label>
          </div>
          <div className="button-wrapper">
            <button>Update Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingEmployer;
