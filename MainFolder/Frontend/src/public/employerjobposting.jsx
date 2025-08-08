import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./employerjobposting.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderForEmployer from '../components/headerforemployer';
import Sidebar from '../components/sidebar';
import { FaSearch } from 'react-icons/fa';

const EmployerJobPosting = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await fetch("http://localhost:5000/api/jobs/my-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setJobs(data);
          setFilteredJobs(data);
          if (data.length === 0) {
            toast.info("You have not posted any jobs yet.");
          }
        } else {
          toast.error(data.message || "Failed to fetch job postings");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching jobs. Please try again later.");
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

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const results = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(results);
      setCurrentPage(1);
    }
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return (
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="dots">...</span>
          ) : (
            <button
              key={page}
              className={currentPage === page ? "active-page" : ""}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    );
  };

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
            onKeyDown={handleSearchKeyDown}
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
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
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
                  <td>{job.applications || 0}</td>
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

        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
};

export default EmployerJobPosting;
