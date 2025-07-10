import React from 'react'
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';
import './employerapplicationmanagement.css'; // Assuming you have a CSS file for styling

const employerapplicationmanagement = () => {
  return (
    <div>
        <HeaderForEmployer />
        <div className="job-postings-container">
        <Sidebar />
      <div className="job-postings-header">
        <h1>Applicant Management</h1>
        
      </div>
      <div className="job-postings-header1">
        <h3>Manage applications for your job postings</h3>
        
        
      </div>
      <div className="job-postings-header2">
        <h2>Job Posting: Software Engineer Intern</h2>
        
      </div>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search  applicants" />
      </div>

      <table className="job-table">
        <thead>
          <tr>
            <th>Application</th>
            <th>Skills</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ethan Carter</td>
            <td>Python, Java</td>
            <td>2024-07-26</td>
            <td><span className="status">Applied</span></td>
            <td><a href="#">View Profile  Change Status  Send Message</a></td>
          </tr>
          <tr>
            <td>Olivia Bennett</td>
            <td>JavaScript, React</td>
            <td>2024-07-25</td>
            <td><span className="status">Shortlisted</span></td>
            <td><a href="#">View Profile  Change Status  Send Message</a></td>
          </tr>
          <tr>
            <td>Noah Thompson</td>
            <td>C++, Algorithms</td>
            <td>2024-07-24</td>
            <td><span className="status">Interviewed</span></td>
            <td><a href="#">View Profile  Change Status  Send Message</a></td>
          </tr>
          <tr>
            <td>Ava Rodriguez</td>
            <td>SQL, Data Analysis</td>
            <td>2024-07-23</td>
            <td><span className="status">Hired</span></td>
            <td><a href="#">View Profile  Change Status  Send Message</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default employerapplicationmanagement
