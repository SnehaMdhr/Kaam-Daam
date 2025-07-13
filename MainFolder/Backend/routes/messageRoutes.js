const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getHiredEmployers
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

// ✅ More specific route goes first
router.get('/hired-employers/:studentId', protect, getHiredEmployers);

// ✅ Then general route
router.get('/:senderId/:receiverId', protect, getMessages);

router.post('/send', protect, sendMessage);

module.exports = router;
