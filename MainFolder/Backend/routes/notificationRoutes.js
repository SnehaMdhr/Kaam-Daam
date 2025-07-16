const express = require("express");
const router = express.Router();
const { getUserNotifications, markAllAsRead, sendPing,getRecentNotifications,getRecentNotificationsForStudent } = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// Add `protect` middleware to ensure the user is authenticated
router.post("/ping", protect, sendPing); // Protect this route with authentication
router.get("/:userId", getUserNotifications);      // GET all notifications for user
router.put("/:userId/mark-read", markAllAsRead);   // Mark all as read
// GET recent notifications
router.get('/recent/:userId', getRecentNotifications);
// In notificationsRoutes.js
router.get("/student/recent/:id", getRecentNotificationsForStudent);



module.exports = router;
