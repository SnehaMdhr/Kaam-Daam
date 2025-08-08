import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForEmployer from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import "./jobdetails.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        if (!response.ok) throw new Error("Job not found");

        const data = await response.json();
        setJob(data);

        // Only show the success toast if the job is fetched successfully
        toast.success("Job loaded successfully!");
      } catch (err) {
        console.error("Error loading job details:", err.message);
        toast.error("Failed to load job details");
        setJob(null);
      }
    };

    fetchJob();
  }, [id]); // Dependency array ensures this runs only once when the component is mounted

  const handleDelete = async () => {
    toast.info("Deleting job...");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        toast.success("Job deleted successfully!");
        setTimeout(() => navigate("/employerjobposting"), 1500);
      } else {
        toast.error("Failed to delete job");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting job");
    }
  };

  const handleUpdate = () => {
    navigate(`/editjob/${id}`);
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <HeaderForEmployer />
      <div className="head-title">
        <Sidebar />
        <div className="header-container">
          <h1>Job Details</h1>
        </div>
        <div className="jobname">
          <h2>{job.title}</h2>
        </div>
        <div className="bar">
          <h3>Job Overview</h3>
        </div>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        <p><strong>Views:</strong> {job.views}</p> {/* Added views here */}

        <div className="bar"><h3>Job Details</h3></div>
        <p><strong>Address:</strong> {job.address}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>People Required:</strong> {job.people_required}</p>

        <div className="bar"><h3>Work Schedule</h3></div>
        <p><strong>Work Schedule:</strong> {job.work_schedule}</p>
        <p><strong>Shift Timing:</strong> {job.shift_timing}</p>

        <div className="bar"><h3>Skills and Requirements</h3></div>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Skill Level:</strong> {job.skill_level}</p>
        <p><strong>Duration:</strong> {job.duration}</p>

        <div className="button-group">
          <button className="btn btn-blue" onClick={handleUpdate}>Update</button>
          <button
            className="btn btn-red"
            onClick={() =>
              toast.info("Click again to confirm delete", {
                onClose: () => handleDelete(),
                autoClose: 1500,
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
