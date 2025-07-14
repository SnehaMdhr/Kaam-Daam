const pool = require('../db');

// ✅ Send a message
const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, content } = req.body;

  try {
    await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)`,
      [sender_id, receiver_id, content]
    );
    res.status(200).send({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).send({ error: 'Server error while sending message' });
  }
};

// ✅ Get chat between two users
const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE (sender_id = $1 AND receiver_id = $2) 
          OR (sender_id = $2 AND receiver_id = $1)
       ORDER BY timestamp ASC`,
      [senderId, receiverId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).send({ error: 'Server error while fetching messages' });
  }
};

// ✅ Get employers who hired this student
const getHiredEmployers = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const result = await pool.query(
      `SELECT DISTINCT u.id, u.username, u.email
       FROM job_applications ja
       JOIN job_posts jp ON ja.job_id = jp.id
       JOIN users u ON jp.user_id = u.id
       WHERE ja.user_id = $1 AND ja.status = 'Hired'`,
      [studentId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching hired employers:", err.message);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};

const getHiredStudents = async (req, res) => {
  const employerId = req.params.employerId;

  try {
    const result = await pool.query(
      `SELECT DISTINCT u.id, u.username, u.email
       FROM job_applications ja
       JOIN users u ON ja.user_id = u.id
       JOIN job_posts jp ON ja.job_id = jp.id
       WHERE jp.user_id = $1 AND ja.status = 'Hired'`,
      [employerId]
    );

    res.status(200).json(result.rows); // ✅ Array expected by frontend
  } catch (error) {
    console.error("❌ Error in getHiredStudents:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Export properly
module.exports = {
  sendMessage,
  getMessages,
  getHiredEmployers,
  getHiredStudents
};
