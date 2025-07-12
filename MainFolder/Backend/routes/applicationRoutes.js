const express = require('express');
const router = express.Router();
const { applyToJob, getApplicationsByEmployer, getApplicationsByStudent, checkAlreadyApplied } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { route } = require('./users');

router.post('/apply', protect, applyToJob);
router.get('/employer', protect, getApplicationsByEmployer);
router.get('/student', protect, getApplicationsByStudent);
router.get('/check/:jobId', protect, checkAlreadyApplied);

module.exports = router;
