const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Email setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// UPDATE student profile
const updateUserProfile = async (req, res) => {
    const userId = req.params.id;
    const {
        username,
        email,
        phone,
        course,
        institution,
        linkedin,
        portfolio,
        bio
    } = req.body;

        const profile_picture_url = req.file ? req.file.filename : null;

    try {
        const result = await pool.query(
            `UPDATE users SET
                username = $1,
                email = $2,
                phone = $3,
                profile_picture_url = $4,
                course = $5,
                institution = $6,
                linkedin = $7,
                portfolio = $8,
                bio = $9
             WHERE id = $10 RETURNING *`,
            [username, email, phone,profile_picture_url, course, institution, linkedin, portfolio, bio, userId]
        );

        res.status(200).json({ message: 'Profile updated successfully', user: result.rows[0] });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET student profile
const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query(
            `SELECT id, username, email,profile_picture_url, phone, course, institution, linkedin, portfolio, bio 
             FROM users WHERE id = $1`,
            [userId]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found' });

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET current user info
const getMe = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, role FROM users WHERE id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found' });

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// UPDATE user role
const updateRole = async (req, res) => {
    const { role } = req.body;
    const userId = req.user.id;

    if (!role || (role !== 'job_seeker' && role !== 'recruiter'))
        return res.status(400).json({ message: 'Invalid role selected' });

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
        console.error("Error in updateRole:", err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// REGISTER new user
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

// LOGIN
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

// SEND PASSWORD RESET LINK
const sendResetLink = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3',
            [token, expiry, email]
        );

        const resetLink = `http://localhost:5173/resetthing?token=${token}&email=${email}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset Your Password',
            html: `<p>Click the link below to reset your password. It will expire in 1 hour.</p>
                   <a href="${resetLink}">${resetLink}</a>`
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// RESET PASSWORD using Token
const resetPasswordWithToken = async (req, res) => {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword)
        return res.status(400).json({ message: 'All fields are required' });

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: 'User not found' });

        const user = result.rows[0];

        if (user.reset_token !== token)
            return res.status(400).json({ message: 'Invalid or expired token' });

        if (new Date() > new Date(user.reset_token_expiry))
            return res.status(400).json({ message: 'Token expired' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE email = $2',
            [hashedPassword, email]
        );

        res.status(200).json({ message: 'Password reset successful. Please login.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    updateRole,
    getMe,
    sendResetLink,
    resetPasswordWithToken,
    getUserProfile,
    updateUserProfile
};
