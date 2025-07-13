import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./jobdetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Job not found");
        }

        alert("Job Found");
        const data = await response.json();
        setJob(data); // Should set the state with job data
      } catch (err) {
        console.error("Error loading job details:", err.message); // Add this line to see the error
        setJob(null);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Job deleted successfully!");
        navigate("/employerjobposting");
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting job");
    }
  };

  const handleUpdate = () => {
    navigate(`/editjob/${id}`);
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <HeaderForEmployer />
      <div className="head-title">
        <Sidebar />
        <div className='header-container'>
        <h1>Job Details</h1>
      </div>
        <div className="p-8 job-details-content">
          <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
          <div className='bar'>

              <h3>Job Overview</h3>
              </div>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
           <p>
            <strong>Posted on:</strong>{" "}
            {new Date(job.posted_date).toLocaleDateString()}
          </p>
          <div className='bar'>

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
          <div className='bar'>

              <h3>Work Schedule</h3>
              </div>
          <p>
            <strong>Work Schedule:</strong> {job.work_schedule}
          </p>
          <p>
            <strong>Shift Timing:</strong> {job.shift_timing}
          </p>
         

          <div className="button-group">
            <button className="btn btn-blue" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn btn-red" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
