// pages/EditJob.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <div className="edit-job-form">
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="title" value={job.title} onChange={handleChange} />
        </label>
        <label>Description:
          <textarea name="description" value={job.description} onChange={handleChange} />
        </label>
        <label>Address:
          <input type="text" name="address" value={job.address} onChange={handleChange} />
        </label>
        <label>People Required:
          <input type="number" name="people_required" value={job.people_required} onChange={handleChange} />
        </label>
        <label>Work Schedule:
          <input type="text" name="work_schedule" value={job.work_schedule} onChange={handleChange} />
        </label>
        <label>Shift Timing:
          <input type="text" name="shift_timing" value={job.shift_timing} onChange={handleChange} />
        </label>
        <label>Status:
          <input type="text" name="status" value={job.status} onChange={handleChange} />
        </label>
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJob;