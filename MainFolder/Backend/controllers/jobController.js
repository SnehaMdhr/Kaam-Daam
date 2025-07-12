const { createJob, getJobsByUser } = require('../models/jobModel');
const pool = require('../db'); 

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

const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM job_posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error getting job:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateJobById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    status,
    posted_date,
    description,
    people_required,
    address,
    job_type,
    work_schedule,
    shift_timing
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE job_posts SET
        title = $1,
        status = $2,
        posted_date = $3,
        description = $4,
        people_required = $5,
        address = $6,
        job_type = $7,
        work_schedule = $8,
        shift_timing = $9
      WHERE id = $10 RETURNING *`,
      [
        title,
        status,
        posted_date,
        description,
        people_required,
        address,
        job_type,
        work_schedule,
        shift_timing,
        id
      ]
    );

    res.json({ message: 'Job updated', job: result.rows[0] });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// DELETE a job
const deleteJobById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM job_posts WHERE id = $1', [id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


// GET all active job posts
const getAllJobs = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT job_posts.*, users.username AS company_name 
      FROM job_posts
      JOIN users ON job_posts.user_id = users.id
      ORDER BY job_posts.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
  console.error("Error fetching jobs:", err); // Show full error stack
  res.status(500).json({ error: err.message || "Server error" }); // Send real error message
}

};

module.exports = { postJob, getUserJobs,getJobById, deleteJobById, updateJobById, getAllJobs};