// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// 🔎 GET user profile (only username, email, phone)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT username, email, phone FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching user' });
  }
});

// ✏️ PUT update user profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, phone } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
      [username, email, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found or not updated' });
    }

    res.json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
});

module.exports = router;