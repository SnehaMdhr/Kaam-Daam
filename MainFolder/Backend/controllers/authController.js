const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const updateRole = async (req, res) => {
    console.log("🔐 JWT Payload:", req.user); // This should print your user info

    const { role } = req.body;
    const userId = req.user.id;

    if (!role || (role !== 'job_seeker' && role !== 'recruiter')) {
        return res.status(400).json({ message: 'Invalid role selected' });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET role = $1 WHERE id = $2 RETURNING *',
            [role, userId]
        );

        if (result.rows.length > 0) {
            return res.status(200).json({ success: true, message: 'Role updated successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to update role' });
        }
    } catch (err) {
        console.error("❌ Error in updateRole:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};



const register = async (req, res) => {
    const { username, email, phone, role, password } = req.body;

    if (!username || !email || !phone || !role || !password)
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0)
            return res.status(409).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, email, phone, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email',
            [username, email, phone, role, hashedPassword]
        );

        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0)
            return res.status(401).json({ message: 'Invalid credentials' });

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, updateRole };
