const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  register,
  login,
  updateRole,
  getMe,
  sendResetLink,
  resetPasswordWithToken
} = require('../controllers/authController');

const { handleGoogleCallback } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Normal routes
router.post('/register', register);
router.post('/login', login);
router.put('/role', protect, updateRole);
router.get('/me', protect, getMe);
router.post('/forgot-password', sendResetLink);
router.post('/reset-password', resetPasswordWithToken);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  handleGoogleCallback // This is where your custom logic happens after authentication
);

module.exports = router;
