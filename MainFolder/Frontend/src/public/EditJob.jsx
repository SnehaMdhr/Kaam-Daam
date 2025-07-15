// pages/EditJob.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editjobs.css"
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebar";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    address: "",
    people_required: "",
    work_schedule: "",
    shift_timing: "",
    status: ""
  });

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(job)
    });

    if (res.ok) {
      alert("Job updated successfully");
      navigate(`/employerjobposting`);
    } else {
      alert("Failed to update job");
    }
  };

  return (
    <div>
      <Header />
      <div className="edit-job-container">
    <div className="edit-job-form">
      <Sidebar/>
      <h1>Edit Job</h1>
      </div>
      <div className="profile-section">
      <form className="form-update" onSubmit={handleSubmit}>
        <div className='bar'>

              <h3>Job Details</h3>
              </div>
        <label>Title:</label>
          <input type="text" name="title" value={job.title} onChange={handleChange} />
        
        <label>Description:</label>
          <textarea name="description" value={job.description} onChange={handleChange} />

          <label>People Required:</label>
          <input type="number" name="people_required" value={job.people_required} onChange={handleChange} />
        
          <div className='bar'>

              <h3>Location</h3>
              </div>
        <label>Address:</label>
          <input type="text" name="address" value={job.address} onChange={handleChange} />

          <div className='bar'>

              <h3>Schedule and Timing</h3>
              </div>
        
        <label>Work Schedule:</label>
          <input type="text" name="work_schedule" value={job.work_schedule} onChange={handleChange} />
        
        <label>Shift Timing:</label>
          <input type="text" name="shift_timing" value={job.shift_timing} onChange={handleChange} />
      

        <div className='bar'>

              <h3>Job Status</h3>
              </div>
        <label>Status:</label>
          <input type="text" name="status" value={job.status} onChange={handleChange} />
        
        <div className="button-wrapper">
                <button type="submit">Update Job</button>
              </div>
      </form>
      </div>
    </div>
    </div>
  );
};

export default EditJob;