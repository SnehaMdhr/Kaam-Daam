import React, { useState } from 'react';
import './CreateJob.css';
import { useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: '',
    status: 'open',
    postedDate: '',
    description: '',
    peopleRequired: '',
    address: '',
    jobType: 'remote',
    workSchedule: 'fulltime',
    shiftTiming: '',
    category: '',
    skillLevel: '',
    duration: ''
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    const response = await fetch('http://localhost:5000/api/jobs/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...job, userId })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Job posted successfully!');
      navigate('/employerjobposting');
      console.log(data.job);
    } else {
      console.error('Error posting job:', data.error);
      alert('Failed to post job: ' + data.error);
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create a New Job</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <label>Job Title</label>
        <input type="text" name="title" placeholder="Software Developer" value={job.title} onChange={handleChange} required />

        <label>Status</label>
        <select name="status" value={job.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Posted Date</label>
        <input type="date" name="postedDate" value={job.postedDate} onChange={handleChange} required />

        <label>Job Description</label>
        <textarea name="description" placeholder="Describe the role..." value={job.description} onChange={handleChange} required />

        <label>No. of People Required</label>
        <input type="number" name="peopleRequired" placeholder="e.g. 3" value={job.peopleRequired} onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" placeholder="City, State" value={job.address} onChange={handleChange} required />

        <label>Remote or Onsite</label>
        <select name="jobType" value={job.jobType} onChange={handleChange}>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>

        <label>Work Schedule</label>
        <select name="workSchedule" value={job.workSchedule} onChange={handleChange}>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
        </select>

        <label>Shift Timing</label>
        <input type="text" name="shiftTiming" placeholder="e.g. 9 AM - 6 PM" value={job.shiftTiming} onChange={handleChange} required />

        <label>Category</label>
        <select name="category" value={job.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Programming">Programming</option>
          <option value="Data Science">Data Science</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label>Skill Level</label>
        <select name="skillLevel" value={job.skillLevel} onChange={handleChange} required>
          <option value="">Select Skill Level</option>
          <option value="No Experience">No Experience</option>
          <option value="Some Experience">Some Experience</option>
        </select>

        <label>Duration</label>
        <select name="duration" value={job.duration} onChange={handleChange} required>
          <option value="">Select Duration</option>
          <option value="1 week">1 week</option>
          <option value="1 month">1 month</option>
          <option value="3 months">3 months</option>
          <option value="6 months">6 months</option>
        </select>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;