const pool = require('../db');

// ✅ Submit review
const addReview = async (req, res) => {
  const employerId = req.user.id;
  const { studentId, jobId, rating, comment } = req.body;

  try {
    // Check if job is marked as "Past"
    const check = await pool.query(`
      SELECT * FROM job_applications
      WHERE user_id = $1 AND job_id = $2 AND status = 'Past'
    `, [studentId, jobId]);

    if (check.rows.length === 0) {
      return res.status(403).json({ message: "You can't review this student yet" });
    }

    const result = await pool.query(`
      INSERT INTO reviews (employer_id, student_id, job_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `, [employerId, studentId, jobId, rating, comment]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Failed to submit review" });
  }
};

// ✅ Get reviews for a student
const getReviewsForStudent = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const result = await pool.query(`
      SELECT r.*, u.username AS employer_name
      FROM reviews r
      JOIN users u ON r.employer_id = u.id
      WHERE r.student_id = $1
      ORDER BY r.created_at DESC
    `, [studentId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to load reviews" });
  }
};

// Controller to get reviews and average rating for a student
const getReviewsAndAverageRating = async (req, res) => {
  const { studentId } = req.params;

  try {
    const reviews = await pool.query(
      'SELECT * FROM reviews WHERE student_id = $1',
      [studentId]
    );

    const avgRatingResult = await pool.query(
      'SELECT AVG(rating) AS average_rating FROM reviews WHERE student_id = $1',
      [studentId]
    );

    let averageRating = parseFloat(avgRatingResult.rows[0].average_rating);
    if (isNaN(averageRating)) averageRating = 0;

    res.json({
      reviews: reviews.rows,
      averageRating,
    });
  } catch (err) {
    console.error("Error fetching reviews", err);
    res.status(500).send("Server error");
  }
};

module.exports = { addReview, getReviewsForStudent, getReviewsAndAverageRating };