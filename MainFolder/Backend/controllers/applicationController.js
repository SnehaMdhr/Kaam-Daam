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
    // ✅ 1. Update status
    await pool.query(
      `UPDATE job_applications SET status = $1 WHERE id = $2`,
      [status, applicationId]
    );

    // ✅ 2. Get student user_id and job title
    const result = await pool.query(
      `SELECT ja.user_id, jp.title
       FROM job_applications ja
       JOIN job_posts jp ON ja.job_id = jp.id
       WHERE ja.id = $1`,
      [applicationId]
    );

    if (result.rows.length > 0) {
      const { user_id, title } = result.rows[0];

// ✅ 3. Only send notification for specific status values
const notifyStatuses = ["Accepted", "Rejected", "Interview", "Hired"];

if (notifyStatuses.includes(status)) {
  const message = `Your application for "${title}" was updated to "${status}".`;

  await pool.query(
    `INSERT INTO notifications (user_id, message) VALUES ($1, $2)`,
    [user_id, message]
  );
}
    }

    res.json({ message: "Status updated and notification sent." });
  } catch (err) {
    console.error("Failed to update status and notify student", err);
    res.status(500).json({ error: "Could not update application status" });
  }
};
module.exports = { applyToJob, getApplicationsByEmployer,getApplicationsByStudent, checkAlreadyApplied, updateApplicationStatus };