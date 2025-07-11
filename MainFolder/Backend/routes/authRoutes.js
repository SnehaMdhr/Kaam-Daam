const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
    register,
    login,
    sendResetLink,           // ⬅️ replaced sendOTP
    resetPasswordWithToken,  // ⬅️ replaced verifyOTPAndReset
    updateRole,
    getMe
} = require('../controllers/authController');

// 🔐 Public Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', sendResetLink);              // ✅ New
router.post('/reset-password', resetPasswordWithToken);      // ✅ New

// 🔐 Protected Routes
router.post('/update-role', passport.authenticate('jwt', { session: false }), updateRole);
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);

module.exports = router;
