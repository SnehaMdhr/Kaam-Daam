import React from 'react'
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentsetting.css"

const studentsetting = () => {
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
              <input type="text" name="username"id="applicant-name" placeholder="Applicant Name" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Applicant Email</label>
              <input type="email" name="email" placeholder="Applicant Email" />
            </div>
            <div className="form-group">
              <label htmlFor="contact-person">Contact Details</label>
              <input type="text" id="contact-person" placeholder="Contact Details" />
            </div>
            <div className="button-wrapper">
    <button >Update Account</button>
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