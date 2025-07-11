import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';
import './employerjobposting.css';

const EmployerJobPosting = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/jobs/my-jobs', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fixed template literal
          },
        });

        const data = await response.json();
        if (response.ok) {
          setJobs(data);
        } else {
          alert('Failed to fetch job postings');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching jobs');
      }
    };

    fetchJobs();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];

  return (
    <div>
      <HeaderForEmployer />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="job-postings-container">
          <div className="job-postings-header">
            <h1>Job Postings</h1>
            <button className="new-job-btn" onClick={() => navigate('/createjob')}>
              Create New Job
            </button>
          </div>

          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search job postings" />
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
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>
                      <span className={`status ${job.status === 'open' ? 'active' : job.status === 'closed' ? 'inactive' : 'filled'}`}>
                        {job.status === 'open' ? 'Active' : job.status === 'closed' ? 'Inactive' : job.status}
                      </span>
                    </td>
                    <td>0</td>
                    <td>{formatDate(job.posted_date)}</td>
                    <td>
                      <a href={`/jobdetails/${job.id}`}>View Details</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No job postings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobPosting;
