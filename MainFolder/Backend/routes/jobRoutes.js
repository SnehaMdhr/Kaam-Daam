const express = require('express');
const router = express.Router();
const { postJob, getUserJobs, updateJobById } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { getAllJobs } = require('../controllers/jobController');


const {
  getJobById,
  deleteJobById,
} = require('../controllers/jobController');


router.post('/create', postJob);
router.get('/my-jobs', protect, getUserJobs);
router.get('/all', getAllJobs);


// Get single job by ID
router.get('/:id', getJobById);

router.put('/:id', protect, updateJobById);

// Delete job by ID
router.delete('/:id', deleteJobById);

module.exports = router;