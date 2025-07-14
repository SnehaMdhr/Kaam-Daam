const { createJob, getJobsByUser } = require('../models/jobModel');
const pool = require('../db');

// ✅ POST a job
const postJob = async (req, res) => {
  const {
    title,
    status,
    postedDate,
    description,
    peopleRequired,
    address,
    jobType,
    workSchedule,
    shiftTiming,
    category,
    skillLevel,
    duration,
    userId
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO job_posts (
        title, status, posted_date, description, people_required, address, job_type,
        work_schedule, shift_timing, category, skill_level, duration, user_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *`,
      [
        title,
        status,
        postedDate,
        description,
        peopleRequired,
        address,
        jobType,
        workSchedule,
        shiftTiming,
        category,
        skillLevel,
        duration,
        userId
      ]
    );
    res.status(201).json({ message: "Job posted successfully", job: result.rows[0] });
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

// ✅ Get single job by ID
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

// ✅ Update job
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
    shift_timing,
    category,
    skill_level,
    duration
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
        shift_timing = $9,
        category = $10,
        skill_level = $11,
        duration = $12
      WHERE id = $13 RETURNING *`,
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
        category,
        skill_level,
        duration,
        id
      ]
    );

    res.json({ message: 'Job updated', job: result.rows[0] });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// ✅ Delete job
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

// ✅ Get all jobs with company name
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
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

// ✅ Get filtered jobs using query parameters
const getFilteredJobs = async (req, res) => {
  const { category, skill_level, duration } = req.query;

  let query = `
    SELECT job_posts.*, users.username AS company_name 
    FROM job_posts 
    JOIN users ON job_posts.user_id = users.id
    WHERE 1=1
  `;
  const values = [];
  let i = 1;

  if (category) {
    query += ` AND job_posts.category = $${i++}`;
    values.push(category);
  }

  if (skill_level) {
    query += ` AND job_posts.skill_level = $${i++}`;
    values.push(skill_level);
  }

  if (duration) {
    query += ` AND job_posts.duration = $${i++}`;
    values.push(duration);
  }

  query += ` ORDER BY job_posts.created_at DESC`;

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error filtering jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update job
const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    address,
    people_required,
    work_schedule,
    shift_timing,
    status
  } = req.body;

  try {
    const updated = await pool.query(
      `UPDATE job_posts SET title = $1, description = $2, address = $3, people_required = $4,
      work_schedule = $5, shift_timing = $6, status = $7 WHERE id = $8 RETURNING *`,
      [title, description, address, people_required, work_schedule, shift_timing, status, id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postJob,
  getUserJobs,
  getJobById,
  deleteJobById,
  updateJobById,
  getAllJobs,
  getFilteredJobs,
  updateJob
};