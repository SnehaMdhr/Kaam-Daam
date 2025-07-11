const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');

router.post('/create', postJob);

module.exports = router;