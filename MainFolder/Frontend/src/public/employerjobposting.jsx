import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import { FaSearch } from "react-icons/fa";
import "./employerjobposting.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';
import './employerjobposting.css';

const EmployerJobPosting = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token; // ✅ Updated
        const response = await fetch("http://localhost:5000/api/jobs/my-jobs", {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/jobs/my-jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setJobs(data);
          if (data.length === 0) {
            toast.info("You have not posted any jobs yet.");
          }
        } else {
          toast.error(data.message || "Failed to fetch job postings");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching jobs. Please try again later.");
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "Invalid date"
      : date.toISOString().split("T")[0];
  };

  const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <HeaderForEmployer />

      <div className="job-postings-container">
        <Sidebar />
        <div className="job-postings-header">
          <h1>Job Postings</h1>
          <button
            className="new-job-btn"
            onClick={() => navigate("/createjob")}
          >
            Create New Job
          </button>
        </div>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search job postings"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>
                    <span
                      className={`status ${
                        job.status === "open"
                          ? "active"
                          : job.status === "closed"
                          ? "inactive"
                          : "filled"
                      }`}
                    >
                      {job.status === "open"
                        ? "Active"
                        : job.status === "closed"
                        ? "Inactive"
                        : job.status}
                    </span>
                  </td>
                  <td>{job.applicants_count || 0}</td>
                  <td>{formatDate(job.created_at)}</td>
                  <td>
                    <a href={`/jobdetails/${job.id}`}>View Details</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No matching job postings.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
            <input
              type="text"
              placeholder="Search job postings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>
                      <span className={`status ${job.status === 'open' ? 'active' : job.status === 'closed' ? 'inactive' : 'filled'}`}>
                        {job.status === 'open' ? 'Active' : job.status === 'closed' ? 'Inactive' : job.status}
                      </span>
                    </td>
                    <td>{job.applicants_count || 0}</td>
                    <td>{formatDate(job.posted_date)}</td>
                    <td>
                      <a href={`/jobdetails/${job.id}`}>View Details</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No matching job postings.
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
export default EmployerJobPosting;
