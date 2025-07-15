const express = require("express");
const router = express.Router();
const { getUserNotifications, markAllAsRead, sendPing } = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// Add `protect` middleware to ensure the user is authenticated
router.post("/ping", protect, sendPing); // Protect this route with authentication
router.get("/:userId", getUserNotifications);      // GET all notifications for user
router.put("/:userId/mark-read", markAllAsRead);   // Mark all as read

module.exports = router;
