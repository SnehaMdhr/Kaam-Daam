const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config(); // Keep only one instance
require('./passport');
const pool = require('./db'); 
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobRoutes');

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employers', require('./routes/employers'));


app.use(passport.initialize());
app.use(passport.session());

// Normal routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Google routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
        console.log("Google login success, user:", req.user); 

        if (!req.user) {
            return res.status(401).send("Google login failed or no user.");
        }

        const email = req.user.email;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length > 0) {
            const existingUser  = user.rows[0];
            const token = jwt.sign({ id: existingUser .id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            const redirectUrl = existingUser .role ? 
                `http://localhost:5173/${existingUser .role}_dashboard?token=${token}` : 
                `http://localhost:5173/google-redirect?token=${token}`;
            res.redirect(redirectUrl);
        } else {
            const newUser  = await pool.query(
                'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
                [req.user.displayName, req.user.email]
            );

            const token = jwt.sign({ id: newUser .rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.redirect(`http://localhost:5173/google-redirect?token=${token}`);
        }
    }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
