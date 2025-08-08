const pool = require('../db');

const createJob = async (jobData) => {
  const {
    userId, title, status, deadline, description,
    peopleRequired, address, jobType, workSchedule, shiftTiming
  } = jobData;

  const result = await pool.query(
    `INSERT INTO job_posts 
     (user_id, title, status, deadline, description, people_required, address, job_type, work_schedule, shift_timing)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [userId, title, status, deadline, description, peopleRequired, address, jobType, workSchedule, shiftTiming]
  );

  return result.rows[0];
};

// ✅ Get all jobs created by a specific user
const getJobsByUser = async (userId) => {
  const result = await pool.query(
    `SELECT j.id, 
            j.title, 
            j.status, 
            TO_CHAR(j.created_at, 'YYYY-MM-DD') AS created_at, 
            COUNT(a.id) AS applications
     FROM job_posts j
     LEFT JOIN job_applications a ON a.job_id = j.id
     WHERE j.user_id = $1 
     GROUP BY j.id
     ORDER BY j.created_at DESC;`,
    [userId]
  );
  return result.rows;
};


module.exports = { createJob, getJobsByUser };