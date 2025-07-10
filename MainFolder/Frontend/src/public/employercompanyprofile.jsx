import React from 'react'
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import './employercompanyprofile.css'; // Assuming you have a CSS file for styling

const employercompanyprofile = () => {
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
                <input type="text" placeholder="Enter company name" />
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
                <input type="email" placeholder="Enter email" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" />
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
                <button type="submit">Update Profile</button>
              </div>
          </section>

        </div>
      </div>
      </div>
  
  )
}

export default employercompanyprofile
