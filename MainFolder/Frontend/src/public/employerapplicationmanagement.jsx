import React, { useEffect, useState } from 'react';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './employerapplicationmanagement.css';

const EmployerApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/applications/employer', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error('Failed to load applications', err));
  }, []);

  const handleStatusChange = (applicationId, newStatus) => {
    const token = localStorage.getItem('token');
    axios
      .put(
        `http://localhost:5000/api/applications/status/${applicationId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      })
      .catch((err) => console.error('Error updating status', err));
  };

  const handleViewProfile = (userId) => {
    navigate(`/studentviewprofile/${userId}`);
  };

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

        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search applicants" />
        </div>

        <table className="job-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>Application Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.applicant_name}</td>
                <td>{app.email}</td>
                <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                <td>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app.id, e.target.value)
                    }
                  >
                    <option value="Applied">Applied</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Interview">Interview</option>
                    <option value="Hired">Hired</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleViewProfile(app.user_id)}>
                    View Profile
                  </button>{" "}
                  |{" "}
                  <button onClick={() => navigate('/messages')}>
                    Send Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
    </div>
  );
};

export default EmployerApplicationManagement;