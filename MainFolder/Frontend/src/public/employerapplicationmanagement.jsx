import React, { useEffect, useState } from "react";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./employerapplicationmanagement.css";

const EmployerApplicationManagement = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/applications/employer", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Failed to load applications", err));
  }, []);

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
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="5">No applications yet.</td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.applicant_name}</td>
                  <td>{app.email}</td>
                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                  <td>
                    <span className="status">{app.status}</span>
                  </td>
                  <td>
                    <a href={`/studentprofile/${app.user_id}`}>View Profile</a> |{" "}
                    <button>Change Status</button> |{" "}
                    <button>Send Message</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerApplicationManagement;