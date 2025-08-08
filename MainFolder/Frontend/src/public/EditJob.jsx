import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editjobs.css";
import Header from "../components/headerforemployer";
import Sidebar from "../components/sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    status: "open",
    deadline: "",
    job_type: "remote",
    created_at: "",
    category: "",
    skill_level: "",
    duration: "1 month",
    company_name: "",
    required_skills: "",
  });

  // ✅ Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const rawUser = localStorage.getItem('user');
        const storedUser = rawUser ? JSON.parse(rawUser) : null;
        const token = storedUser?.token;

        const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });

        if (!res.ok) throw new Error("Failed to fetch job");

        const data = await res.json();

        // Format deadline to 'YYYY-MM-DD' for input[type="date"]
        if (data.deadline) {
          const formattedDeadline = new Date(data.deadline).toLocaleDateString('en-CA');
          setJob({ ...data, deadline: formattedDeadline });
        } else {
          setJob(data);
        }
      } catch (error) {
        console.error("Fetch error:", error.message);
        toast.error("Failed to load job details.");
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Handle form field changes
  const handleChange = (e) => {
     console.log("Field Name: ", e.target.name, " Value: ", e.target.value);
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated job
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawUser = localStorage.getItem('user');
    const storedUser = rawUser ? JSON.parse(rawUser) : null;
    const token = storedUser?.token;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(job)
      });

      if (res.ok) {
        toast.success("Job updated successfully!");
        setTimeout(() => navigate("/employerjobposting"), 2000);
      } else {
        toast.error("Failed to update job.");
      }
    } catch (error) {
      console.error("Update error:", error.message);
      toast.error("Something went wrong while updating.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Header />
      <div className="edit-job-container">
        <div className="edit-job-form">
          <Sidebar />
          <h1>Edit Job</h1>
        </div>

        <div className="profile-section">
          <form className="form-update" onSubmit={handleSubmit}>
            <div className="bar"><h3>Job Details</h3></div>

            <label>Title:</label>
            <input type="text" name="title" value={job.title} onChange={handleChange} />

            <label>Description:</label>
            <textarea name="description" value={job.description} onChange={handleChange} />

            <label>People Required:</label>
            <input type="number" name="people_required" value={job.people_required} onChange={handleChange} />

            <div className="bar"><h3>Schedule and Timing</h3></div>

            <label>Work Schedule:</label>
            <select name="workSchedule" value={job.workSchedule} onChange={handleChange}>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
            </select>

            <label>Shift Timing:</label>
            <input type="text" name="shift_timing" value={job.shift_timing} onChange={handleChange} />

            <div className="bar"><h3>Job Status</h3></div>

            <label>Status:</label>
            <select name="status" value={job.status} onChange={handleChange}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            <label>Deadline:</label>
            <input type="date" name="deadline" value={job.deadline} onChange={handleChange} />

            <div className="bar"><h3>Job Meta</h3></div>

            <label>Category:</label>
            <select name="category" value={job.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>

            <label>Skill Level:</label>
            <select name="skill_level" value={job.skill_level} onChange={handleChange}>
              <option value="">Select Skill Level</option>
              <option value="No Experience">No Experience</option>
              <option value="Some Experience">Some Experience</option>
              <option value="Experienced">Experienced</option>
            </select>

            <label>Duration:</label>
            <select name="duration" value={job.duration} onChange={handleChange}>
              <option value="">Select Duration</option>
              <option value="1 week">1 week</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>

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
