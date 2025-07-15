const pool = require("../db");

const getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

const markAllAsRead = async (req, res) => {
  const { userId } = req.params;
  try {
    await pool.query(
      `UPDATE notifications SET is_read = TRUE WHERE user_id = $1`,
      [userId]
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};

// Sending a ping notification
const sendPing = async (req, res) => {
  const { studentId } = req.body; // ID of the student being pinged
  const senderId = req.user.id; // Assuming the sender is the logged-in user

  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, sender_id, message, is_read, created_at, type)
       VALUES ($1, $2, $3, FALSE, NOW(), 'ping')`,
      [studentId, senderId, 'You have been pinged by a recruiter!']
    );
    res.status(201).json({ message: 'Ping sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send ping notification' });
  }
};



module.exports = { getUserNotifications, markAllAsRead, sendPing };