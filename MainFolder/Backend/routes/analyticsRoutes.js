const express = require("express");
const router = express.Router();
const {
  getKPI,
  getTrends,
  getPerformance,
  incrementView
} = require("../controllers/analyticsController");

// Define routes
router.get("/kpi/:employerId", getKPI);
router.get("/trends/:employerId", getTrends);
router.get("/performance/:employerId", getPerformance);

module.exports = router;