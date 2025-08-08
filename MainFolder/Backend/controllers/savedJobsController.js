const pool = require("../db");

// @desc Save a job for the student
const saveJob = async (req, res) => {
  const { jobId } = req.body;
  const studentId = req.user.id;
  console.log("Received jobId:", jobId);  // Check the received jobId
  console.log("Student ID from token:", studentId); 

  try {
    const check = await pool.query(
      "SELECT * FROM saved_jobs WHERE student_id = $1 AND job_id = $2",
      [studentId, jobId]
    );

    if (check.rows.length > 0) {
      console.log('Job already saved by this student');
      return res.status(200).json({ msg: "Job already saved" });  // Change this to 200 to indicate success
    }

    await pool.query(
      "INSERT INTO saved_jobs (student_id, job_id) VALUES ($1, $2)",
      [studentId, jobId]
    );

    res.status(200).json({ msg: "Job saved successfully" });  // Ensure it's a 200 status for success
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).json({ msg: "Server error" });  // Keep 500 for server errors
  }
};



// @desc Get all saved jobs for the student
const getSavedJobs = async (req, res) => {
  const studentId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT jp.* FROM saved_jobs sj
       JOIN job_posts jp ON sj.job_id = jp.id
       WHERE sj.student_id = $1
       ORDER BY sj.saved_at DESC`,
      [studentId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching saved jobs:", err);
    res.status(500).send("Server error");
  }
};

// @desc Unsave a job for the student
const unsaveJob = async (req, res) => {
  const { jobId } = req.body;
  const studentId = req.user.id;

  try {
    // Check if the job is saved
    const check = await pool.query(
      "SELECT * FROM saved_jobs WHERE student_id = $1 AND job_id = $2",
      [studentId, jobId]
    );

    if (check.rows.length === 0) {
      return res.status(400).json({ msg: "Job not found in saved list" });
    }

    // Remove the saved job
    await pool.query("DELETE FROM saved_jobs WHERE student_id = $1 AND job_id = $2", [
      studentId,
      jobId,
    ]);

    res.json({ msg: "Job unsaved successfully" });
  } catch (err) {
    console.error("Error unsaving job:", err);
    res.status(500).send("Server error");
  }
};


module.exports = {
    saveJob,
    getSavedJobs,
    unsaveJob
}
