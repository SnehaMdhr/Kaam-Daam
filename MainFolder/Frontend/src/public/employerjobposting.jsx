import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';
import './employerjobposting.css'; // Assuming you have a CSS file for styling
const employerjobposting = () => {
  const navigate = useNavigate();
  return (
    <div>
        <HeaderForEmployer />
        
      <div className="job-postings-container">
        <Sidebar />
      <div className="job-postings-header">
        <h1>Job Postings</h1>
        <button className="new-job-btn" onClick={() => navigate('/createjob')}>Create New Job</button>
      </div>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search  job postings" />
      </div>

      <table className="job-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Status</th>
            <th>Applicants</th>
            <th>Posted Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Software Engineer Intern</td>
            <td><span className="status active">Active</span></td>
            <td>25</td>
            <td>2023-08-15</td>
            <td><a href="#">View Details</a></td>
          </tr>
          <tr>
            <td>Frontend Developer</td>
            <td><span className="status filled">Filled</span></td>
            <td>150</td>
            <td>2023-07-20</td>
            <td><a href="#">View Details</a></td>
          </tr>
          <tr>
            <td>Data Analyst</td>
            <td><span className="status inactive">Inactive</span></td>
            <td>50</td>
            <td>2023-06-10</td>
            <td><a href="#">View Details</a></td>
          </tr>
          <tr>
            <td>UX/UI Designer</td>
            <td><span className="status active">Active</span></td>
            <td>80</td>
            <td>2023-05-05</td>
            <td><a href="#">View Details</a></td>
          </tr>
          <tr>
            <td>Project Manager</td>
            <td><span className="status active">Active</span></td>
            <td>120</td>
            <td>2023-04-01</td>
            <td><a href="#">View Details</a></td>
          </tr>
          <tr>
            <td>Frontend Developer</td>
            <td><span className="status filled">Filled</span></td>
            <td>150</td>
            <td>2023-07-20</td>
            <td><a href="#">View Details</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default employerjobposting
