import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import img from "../assets/image/jobs.png";
import "./studentjobs.css";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    skill_level: "",
    duration: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const fetchFilteredJobs = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`http://localhost:5000/api/jobs/filter?${query}`);
      setJobs(response.data);
    } catch (err) {
      console.error("Failed to filter jobs", err);
    }
  };

  useEffect(() => {
    fetchFilteredJobs(); // Load jobs on initial render
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    fetchFilteredJobs();
  };

  return (
    <div>
      <Header />
      <div className="job-listings">
        <Sidebar />
        <div className="job-listing-content">
          <h1>Job Listings</h1>
          <p>Explore opportunities tailored for beginner IT students.</p>
          </div>
          <div className="filters">
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>

            <select name="skill_level" value={filters.skill_level} onChange={handleFilterChange}>
              <option value="">All Skill Levels</option>
              <option value="No Experience">No Experience</option>
              <option value="Some Experience">Some Experience</option>
            </select>

            <select name="duration" value={filters.duration} onChange={handleFilterChange}>
              <option value="">All Durations</option>
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>

            <button onClick={handleApplyFilters}>Apply Filters</button>
          </div>

          <div className="job-cards">
            {currentJobs.length === 0 ? (
              <p>No jobs found.</p>
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
  );
};

export default Jobs;