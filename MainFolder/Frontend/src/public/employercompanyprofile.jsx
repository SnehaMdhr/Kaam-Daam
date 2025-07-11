import React, {useEffect, useState} from 'react';
import axios from 'axios';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './employercompanyprofile.css'; // Assuming you have a CSS file for styling

const employercompanyprofile = () => {
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
        .catch((err) => console.error('Failed to load profile', err));
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
      .then(() => alert('Profile updated!'))
      .catch((err) => console.error('Update failed', err));
  };
  return (
    <div>
    <HeaderForEmployer />   
    <div className="profile-container">
        
        <Sidebar/>
        <div className="profile-main">
          <h1>Company Profile</h1>

          <section className="profile-section">
            <div className="form-group">
                <label>Company Logo</label>
                <input type="file" className="upload-input" />
              </div>

              {/* Company Info */}
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Enter company name" />
              </div>

              <div className="form-group">
                <label>Company Description</label>
                <textarea placeholder="Enter company description"></textarea>
              </div>

              <div className="form-group">
                <label>Industry</label>
                <input type="text" placeholder="Enter industry" />
              </div>

              <div className="form-group">
                <label>Company Size</label>
                <input type="text" placeholder="Enter company size" />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input type="text" placeholder="Enter website URL" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter email" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Enter phone number" />
              </div>

              <h3>Social Media Links</h3>

              <div className="form-group">
                <label>LinkedIn</label>
                <input type="text" placeholder="Enter LinkedIn profile URL" />
              </div>

              <div className="form-group">
                <label>Facebook</label>
                <input type="text" placeholder="Enter Facebook page URL" />
              </div>

              <div className="button-wrapper">
                <button onClick={handleUpdate} type="submit">Update Profile</button>
              </div>
          </section>

        </div>
      </div>
      </div>
  
  )
}

export default employercompanyprofile
