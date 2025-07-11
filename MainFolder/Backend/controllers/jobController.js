const { createJob, getJobsByUser } = require('../models/jobModel');

const postJob = async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get jobs for logged-in user
const getUserJobs = async (req, res) => {
  try {
    const jobs = await getJobsByUser(req.user.id);
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

module.exports = { postJob, getUserJobs };