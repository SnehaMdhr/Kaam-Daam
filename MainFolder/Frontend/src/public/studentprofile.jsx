import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentprofile.css"

const studentprofile = () => {
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
        <Header/>
        <div className="student-profile-container">
          <Sidebar/>
      <h2>Student Profile</h2>

      <form className="student-profile-form">
        <label>Upload Photo</label>
        <input type="file" />

        <label>Full Name</label>
        <input type="text" name='username' value={user.username} onChange={handleChange} placeholder="Enter full name" />

        <label>Student ID</label>
        <input type="text" placeholder="Enter student ID" />

        <label>Course / Program</label>
        <input type="text" placeholder="e.g. BSc Computer Science" />

        <label>Institution / University</label>
        <input type="text" placeholder="e.g. Tribhuvan University" />

        <label>Email</label>
        <input type="email" name='email' value={user.email} onChange={handleChange} placeholder="example@email.com" />

        <label>Phone Number</label>
        <input type="text" name='phone' value={user.phone} onChange={handleChange} placeholder="Enter phone number" />

        <label>LinkedIn Profile</label>
        <input type="url" placeholder="Paste your LinkedIn link" />

        <label>Portfolio / Personal Website</label>
        <input type="url" placeholder="Optional" />

        <label>Short Bio</label>
        <textarea placeholder="Write a short bio about yourself..."></textarea>

        <button type="submit" onClick={handleUpdate}>Update Profile</button>
      </form>
    </div>
    </div>
  )
}

export default studentprofile