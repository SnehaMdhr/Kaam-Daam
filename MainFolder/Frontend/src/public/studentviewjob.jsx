import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import jobbanner from "../assets/image/jobs.png";
import "./studentviewjobs.css";

const StudentViewJob = () => {
  const { id } = useParams(); // job ID from route
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  // ✅ Fetch job details & check if already applied
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Get job details
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Failed to fetch job details", err));

    // Check if user already applied
    axios
      .get(`http://localhost:5000/api/applications/check/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAlreadyApplied(res.data.applied))
      .catch((err) => console.error("Failed to check application status", err));
  }, [id]);

  const handleApply = () => {
    if (alreadyApplied) {
      alert("You've already applied for this job.");
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:5000/api/applications/apply",
        { jobId: job.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Applied Successfully!");
        navigate("/studentmyapplication");
        setAlreadyApplied(true);
      })
      .catch((err) => {
        alert("Failed to apply: " + err.response?.data?.error || err.message);
      });
  };

  const goBack = () => {
    navigate("/studentjobs");
  };

  if (!job) return <div>Loading job details...</div>;

  return (
    <div>
      <Header />
      <div className="job-details-container">
        <Sidebar />
        <nav className="breadcrumb">
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={goBack}
          >
            Browse
          </span>{" "}
          / Job Details
        </nav>

        <h1 className="job-title">{job.title}</h1>
        <p className="posted-by">Posted by {job.company_name}</p>

        <img className="job-banner" src={jobbanner} alt="Job Banner" />

        <section className="job-section">
          <h2>Description</h2>
          <p>{job.description}</p>
        </section>

        <section className="job-section">
          <h2>Job Type</h2>
          <p>
            {job.job_type} | {job.work_schedule}
          </p>
        </section>

        <section className="job-section">
          <h2>Shift Timing</h2>
          <p>{job.shift_timing}</p>
        </section>

        <section className="job-section">
          <h2>Location</h2>
          <p>{job.address}</p>
        </section>

        <section className="job-section">
          <h2>People Required</h2>
          <p>{job.people_required}</p>
        </section>

        <div className="apply-button-wrapper">
          {!alreadyApplied ? (
            <button className="apply-button" onClick={handleApply}>
              Apply Now
            </button>
          ) : (
            <button className="apply-button" disabled>
              Already Applied
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentViewJob;
