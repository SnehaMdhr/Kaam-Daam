import React, { useEffect, useState } from "react";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import img from "../assets/image/jobs.png"; // You can use this as fallback or default image
import "./studentjobs.css";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs/all")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch jobs", err));
  }, []);

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
            {jobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              jobs.map((job) => (
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
            <span className="page">&lt;</span>
            <span className="page active">1</span>
            <span className="page">2</span>
            <span className="page">3</span>
            <span className="page">4</span>
            <span className="page">5</span>
            <span className="page">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
