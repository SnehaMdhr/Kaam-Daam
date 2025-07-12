// Define routes with multer handling file upload
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { updateEmployerProfile, getEmployerProfile } = require('../controllers/authController');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // Set the file name as current timestamp + original file name
  }
});
const upload = multer({ storage });

// Routes for employer profile
router.get('/:id', getEmployerProfile); // Get employer profile by ID
router.put('/:id', upload.single('profile_picture'), updateEmployerProfile); // Handle file upload and profile update

module.exports = router;
