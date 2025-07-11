const pool = require('../db');

const createJob = async (jobData) => {
  const {
    userId, title, status, postedDate, description,
    peopleRequired, address, jobType, workSchedule, shiftTiming
  } = jobData;

  const result = await pool.query(
    `INSERT INTO job_posts 
     (user_id, title, status, posted_date, description, people_required, address, job_type, work_schedule, shift_timing)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [userId, title, status, postedDate, description, peopleRequired, address, jobType, workSchedule, shiftTiming]
  );

  return result.rows[0];
};

module.exports = { createJob };