import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './employercompanyprofile.css';

const EmployerCompanyProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    profile_picture_url: '',
    comp_description: '',
    industry: '',
    website: '',
    linkedin: '',
    facebook: '',
  });

  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const userId = localStorage.getItem('userId'); // Must be saved during login

  // Fetch user data on page load
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/employers/${userId}`)
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
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent form refresh

    // Manual phone length validation
    if (user.phone.length !== 10) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('comp_description', user.comp_description);
    formData.append('industry', user.industry);
    formData.append('website', user.website);
    formData.append('linkedin', user.linkedin);
    formData.append('facebook', user.facebook);
    if (profilePictureFile) {
      formData.append('profile_picture', profilePictureFile);
    }

    try {
      // Update profile in the backend
      await axios.put(`http://localhost:5000/api/employers/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated!');
      
      // Fetch the updated user data
      const updatedUser = await axios.get(`http://localhost:5000/api/employers/${userId}`);
      setUser(updatedUser.data);
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <HeaderForEmployer />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-main">
          <h1>Company Profile</h1>

          <section className="profile-section">
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Upload Photo</label>
                <input
                  type="file"
                  name="profile_picture"
                  onChange={(e) => setProfilePictureFile(e.target.files[0])}
                />

                {/* Show preview if profile picture exists */}
                {user.profile_picture_url && (
                  <img
                    src={`http://localhost:5000/uploads/${user.profile_picture_url}`}
                    alt="Profile"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      marginTop: '10px',
                      borderRadius: '50%',
                    }}
                  />
                )}
              </div>

              {/* Company Info */}
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </div>

              <div className="form-group">
                <label>Company Description</label>
                <textarea
                  name="comp_description"
                  value={user.comp_description}
                  onChange={handleChange}
                  placeholder="Enter company description"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Industry</label>
                <input
                  name="industry"
                  value={user.industry}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter industry"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                  placeholder="Enter website URL"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <h3>Social Media Links</h3>

              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  name="linkedin"
                  value={user.linkedin}
                  onChange={handleChange}
                  type="url"
                  placeholder="Enter LinkedIn profile URL"
                />
              </div>

              <div className="form-group">
                <label>Facebook</label>
                <input
                  name="facebook"
                  value={user.facebook}
                  onChange={handleChange}
                  type="url"
                  placeholder="Enter Facebook page URL"
                />
              </div>

              <div className="button-wrapper">
                <button type="submit">Update Profile</button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmployerCompanyProfile;
