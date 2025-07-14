const express = require("express");
const router = express.Router();
const { getUserNotifications, markAllAsRead } = require("../controllers/notificationController");

router.get("/:userId", getUserNotifications);      // GET all notifications for user
router.put("/:userId/mark-read", markAllAsRead);   // Mark all as read

module.exports = router;