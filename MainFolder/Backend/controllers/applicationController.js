const pool = require('../db');

// ✅ Apply to a job
const applyToJob = async (req, res) => {
  const userId = req.user.id; // student user
  const { jobId } = req.body;

  try {
    await pool.query(
      'INSERT INTO job_applications (job_id, user_id) VALUES ($1, $2)',
      [jobId, userId]
    );
    res.status(201).json({ message: 'Applied successfully' });
  } catch (err) {
    console.error('Error applying to job:', err);
    res.status(500).json({ error: 'Failed to apply' });
  }
};

// ✅ Employer sees all applicants to their jobs
const getApplicationsByEmployer = async (req, res) => {
  const employerId = req.user.id; // employer user

  try {
    const result = await pool.query(`
      SELECT a.*, u.username AS applicant_name, u.email, u.phone, j.title AS job_title
      FROM job_applications a
      JOIN users u ON a.user_id = u.id
      JOIN job_posts j ON a.job_id = j.id
      WHERE j.user_id = $1
      ORDER BY a.applied_at DESC
    `, [employerId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch applications", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


const getApplicationsByStudent = async (req, res) => {
  const studentId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT a.*, j.title, j.address, j.id as job_id
      FROM job_applications a
      JOIN job_posts j ON a.job_id = j.id
      WHERE a.user_id = $1
      ORDER BY a.applied_at DESC
    `, [studentId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Failed to fetch student's applications", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};
const checkAlreadyApplied = async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM job_applications WHERE user_id = $1 AND job_id = $2',
      [userId, jobId]
    );

    if (result.rows.length > 0) {
      res.json({ applied: true });
    } else {
      res.json({ applied: false });
    }
  } catch (err) {
    console.error("Check apply status failed", err);
    res.status(500).json({ error: "Error checking application status" });
  }
};


const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    await pool.query(
      'UPDATE job_applications SET status = $1 WHERE id = $2',
      [status, applicationId]
    );
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("Failed to update status", err);
    res.status(500).json({ error: "Could not update application status" });
  }
};

module.exports = { applyToJob, getApplicationsByEmployer,getApplicationsByStudent, checkAlreadyApplied, updateApplicationStatus };