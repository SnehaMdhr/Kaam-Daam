import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import img from "../assets/image/jobs.png";
import "./studentjobs.css";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs/all")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Header />
      <div className="job-listings">
        <Sidebar />
        <div className="job-listing-content">
          <h2>Job Listings</h2>
          <p>Explore opportunities tailored for beginner IT students.</p>

          <div className="filters">
            <button>Category</button>
            <button>Skill Level</button>
            <button>Duration</button>
            <button>Sort By</button>
          </div>

          <div className="job-cards">
            {currentJobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              currentJobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-content">
                    <h3>{job.title}</h3>
                    <p>{job.description?.slice(0, 130)}...</p>
                    <a href={`/studentviewjob/${job.id}`}>
                      <button className="view-job-btn">View Job</button>
                    </a>
                  </div>
                  <img src={img} alt="Job" />
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            <span className="page" onClick={() => goToPage(currentPage - 1)}>&lt;</span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i + 1}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => goToPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span className="page" onClick={() => goToPage(currentPage + 1)}>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
