const express = require('express');
const router = express.Router();
const { postJob, getUserJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', postJob);
router.get('/my-jobs', protect, getUserJobs);

module.exports = router;