const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { saveJob, getSavedJobs, unsaveJob } = require("../controllers/savedJobsController");

// POST /api/saved-jobs/save
router.post("/save", protect, saveJob);
router.post("/unsave", protect, unsaveJob);

// GET /api/saved-jobs/
router.get("/", protect, getSavedJobs);

module.exports = router;
