const express = require('express');
const router = express.Router();
const { register, login, updateRole, getMe } = require('../controllers/authController');

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', register);
router.post('/login', login);
router.post('/update-role', passport.authenticate('jwt', {session: false}), updateRole);
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);

module.exports = router;
