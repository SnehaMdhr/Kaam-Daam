const express = require('express');
const router = express.Router();
const {
  postJob,
  getUserJobs,
  getAllJobs,
  getFilteredJobs,
  getJobById,
  updateJobById,
  deleteJobById
} = require('../controllers/jobController');

const { protect } = require('../middleware/authMiddleware');

// ✅ Keep static routes FIRST
router.post('/create', postJob);
router.get('/my-jobs', protect, getUserJobs);
router.get('/all', getAllJobs);
router.get('/filter', getFilteredJobs);  // ✅ make sure this is before /:id

// ✅ Dynamic routes LAST
router.get('/:id', getJobById);
router.put('/:id', protect, updateJobById);
router.delete('/:id', deleteJobById);

module.exports = router;