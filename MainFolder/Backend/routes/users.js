const express = require('express');
const router = express.Router();
const pool = require('../db');
const { updateUserProfile, getUserProfile, searchStudents } = require('../controllers/authController');
const multer = require('multer');
const path = require('path');

// 🧠 Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // must match the folder name
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

router.get('/search/students', searchStudents);

// ✅ Routes
router.get('/:id', getUserProfile);
router.put('/:id', upload.single('profile_picture'), updateUserProfile);


module.exports = router;
