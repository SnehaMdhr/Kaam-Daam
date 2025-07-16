const express = require('express');
const router = express.Router();
const { applyToJob, getApplicationsByEmployer, getApplicationsByStudent, checkAlreadyApplied, updateApplicationStatus,getNewApplicants } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const { route } = require('./users');


router.post('/apply', protect, applyToJob);
router.get('/employer', protect, getApplicationsByEmployer);
router.get('/student', protect, getApplicationsByStudent);
router.get('/check/:jobId', protect, checkAlreadyApplied);
router.put('/status/:applicationId', protect, updateApplicationStatus);
// In routes/applicationsRoutes.js or similar
router.get('/employer/applicants/:id', protect, getApplicationsByEmployer);
// routes/applicationRoutes.js
router.get('/new-applicants/:employerId', protect, getNewApplicants);


module.exports = router;
