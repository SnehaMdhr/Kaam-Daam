import React from 'react'
import Header  from '../components/headerforemployer'
import Sidebar from '../components/sidebarstudent'
import "./studentprofile.css"

const studentprofile = () => {
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
        <input type="text" placeholder="Enter full name" />

        <label>Student ID</label>
        <input type="text" placeholder="Enter student ID" />

        <label>Course / Program</label>
        <input type="text" placeholder="e.g. BSc Computer Science" />

        <label>Institution / University</label>
        <input type="text" placeholder="e.g. Tribhuvan University" />

        <label>Email</label>
        <input type="email" placeholder="example@email.com" />

        <label>Phone Number</label>
        <input type="text" placeholder="Enter phone number" />

        <label>LinkedIn Profile</label>
        <input type="url" placeholder="Paste your LinkedIn link" />

        <label>Portfolio / Personal Website</label>
        <input type="url" placeholder="Optional" />

        <label>Short Bio</label>
        <textarea placeholder="Write a short bio about yourself..."></textarea>

        <button type="submit">Update Profile</button>
      </form>
    </div>
    </div>
  )
}

export default studentprofile