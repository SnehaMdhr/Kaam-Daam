import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/headerforstudent";
import Sidebar from "../components/sidebarstudent";
import jobbanner from "../assets/image/jobs.png";
import "./studentviewjobs.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentViewJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch job details
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error("Failed to fetch job details", err));

    // Check if already applied
    axios
      .get(`http://localhost:5000/api/applications/check/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAlreadyApplied(res.data.applied))
      .catch((err) => console.error("Failed to check application status", err));
  }, [id]);

  const handleApply = () => {
    if (alreadyApplied) {
      toast.info("You've already applied for this job.");
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
        toast.success("Applied successfully!");
        setAlreadyApplied(true);
        setTimeout(() => {
          navigate("/studentmyapplication");
        }, 2000);
      })
      .catch((err) => {
        const msg = err.response?.data?.error || err.message;
        toast.error("Failed to apply: " + msg);
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
          <span style={{ cursor: "pointer", color: "#007bff" }} onClick={goBack}>
            Browse
          </span>{" "}
          / Job Details
        </nav>

        <div className="header-container">
          <h1>Job Details</h1>
        </div>

        <div className="content">
          <h1 className="job-title">{job.title}</h1>
          <p className="posted-by">Posted by {job.company_name}</p>

          <img className="job-banner" src={jobbanner} alt="Job Banner" />

          <div className="bar">
            <h3>Job Overview</h3>
          </div>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
          <p>
            <strong>Posted on:</strong>{" "}
            {new Date(job.posted_date).toLocaleDateString()}
          </p>

          <div className="bar">
            <h3>Job Details</h3>
          </div>
          <p>
            <strong>Address:</strong> {job.address}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            <strong>People Required:</strong> {job.people_required}
          </p>

          <div className="bar">
            <h3>Work Schedule</h3>
          </div>
          <p>
            <strong>Work Schedule:</strong> {job.work_schedule}
          </p>
          <p>
            <strong>Shift Timing:</strong> {job.shift_timing}
          </p>

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

      {/* Toast feedback UI */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentViewJob;
