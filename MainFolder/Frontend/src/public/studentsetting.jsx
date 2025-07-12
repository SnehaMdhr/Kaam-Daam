import React, { use } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentsetting.css"

const studentsetting = () => {
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
        .catch((err) => console.error('Failed to load settings', err));
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
        <Header />

      <div className="settings-container">
        
        <Sidebar/>
        <div className="settings-main">
          <h1>Settings</h1>
          
          {/* Account Information */}
          <section className="settings-section">
            <h3>Account Information</h3>
            <div className="form-group">
              <label htmlFor="company-name">Applicant's Name</label>
              <input type="text" name="username" value={user.username} onChange={handleChange} id="applicant-name" placeholder="Applicant Name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Applicant Email</label>
              <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Applicant Email" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-person">Contact Details</label>
              <input type="text" id="contact-person" name='phone' value={user.phone} onChange={handleChange} placeholder="Contact Details" />
            </div>
            <div className="button-wrapper">
    <button onClick={handleUpdate}>Update Account</button>
  </div>
          </section>
         {/* Notifications */}
          <section className="settings-section">
            <h3>Notifications</h3>
            <div className="form-group">
              <label><input type="checkbox" />Job Alerts: Get notified when new job opportunities matching your interests are posted.</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" /> Message Notifications: Receive alerts when employers respond to your applications or messages.</label>
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
  )
}

export default studentsetting