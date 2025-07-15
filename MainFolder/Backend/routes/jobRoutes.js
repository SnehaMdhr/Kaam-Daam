const express = require('express');
const router = express.Router();
const {
  postJob,
  getUserJobs,
  getAllJobs,
  getFilteredJobs,
  getJobById,
  updateJobById,
  deleteJobById,
  updateJob,
  incrementView
} = require('../controllers/jobController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Keep static routes FIRST
router.post('/create', postJob);
router.get('/my-jobs', protect, getUserJobs);
router.get('/all', getAllJobs);
router.get('/filter', getFilteredJobs);  // ✅ make sure this is before /:id
// ✅ Get all jobs posted by a specific employer
router.get('/employer/:employerId', async (req, res) => {
  const { employerId } = req.params;
  const pool = require('../db');

  try {
    const jobs = await pool.query(
      'SELECT * FROM job_posts WHERE user_id = $1 ORDER BY posted_date DESC',
      [employerId]
    );
    res.json(jobs.rows);
  } catch (err) {
    console.error('Error fetching employer jobs:', err);
    res.status(500).json({ error: 'Failed to fetch employer jobs' });
  }
});

// ✅ Dynamic routes LAST
router.get('/:id', getJobById);
router.put('/:id', protect, updateJobById);
router.delete('/:id', deleteJobById);
router.put('/:id', protect, updateJob); // ✅ Added update route
router.post("/increment-view/:jobId", incrementView);

module.exports = router;