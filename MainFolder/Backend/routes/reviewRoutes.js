const express = require('express');
const router = express.Router();
const { addReview, getReviewsForStudent } = require('../controllers/reviewController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', protect, addReview); // POST /api/reviews
router.get('/student/:studentId', getReviewsForStudent); // GET /api/reviews/student/2

module.exports = router;