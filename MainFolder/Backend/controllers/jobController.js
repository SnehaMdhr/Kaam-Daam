const { createJob } = require('../models/jobModel');

const postJob = async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { postJob };